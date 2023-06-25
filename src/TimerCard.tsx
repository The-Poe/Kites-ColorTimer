import { Modal } from "antd-mobile";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Updater } from "use-immer";
import { IGameState } from "./App";
import dayjs from "./utils/wrapDayjs";
import { useCountdown } from "usehooks-ts";
import { lighten } from "polished";

const StyledCard = styled.div<{ bgColor: string; progressPct: string }>`
  cursor: pointer;
  width: calc(100% - 24px);
  margin: 2px 4px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
  //click effect
  &:after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 8px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 3px 20px white;
  }
  &:active:after {
    box-shadow: 0 0 0 0 white;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }
  &:active {
    opacity: 0.5; //for click
  }
  position: relative;
  /* overflow: hidden; */
  background-color: ${(props) => lighten(0.3, props.bgColor)};
  .styledCard_progressBar {
    border-radius: 8px;
    position: absolute;
    z-index: 2;
    background-color: ${(props) => lighten(0.1, props.bgColor)};
    width: ${(props) => props.progressPct};
    height: 100%;
    /* transform: scaleY(1.1); */
    transition: all 0.1s ease-in-out;
  }
  .styledCard_timeWrap {
    margin: 0px 16px;
    z-index: 3;
    font-size: 9vh;
  }
`;

interface ITimerCard {
  gameState: IGameState;
  setGameState: Updater<IGameState>;
  initDuration?: number;
  bgColor?: string;
}

const flipAudioBase64 = 'data:audio/mp3;base64,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';

function TimerCard({
  gameState,
  setGameState,
  initDuration = 30,
  bgColor = "white",
}: ITimerCard) {
  const [leftTime, setLeftTime] = useState<number>(initDuration);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: leftTime,
      intervalMs: 1000,
    });
  const prevResetTimerSignal = useRef<boolean>();

  const onClickHandler = () => {
    const audio = new Audio(flipAudioBase64);
    audio.play();
    if (count === initDuration) {
      setGameState((draft) => {
        draft.gameRunning = true;
      });
      startCountdown();
    } else {
      setLeftTime(initDuration - count);
    }
  };

  useLayoutEffect(() => {
    if (count === 0) {
      setGameState((draft) => {
        draft.gameRunning = false;
      });
      Modal.alert({
        bodyStyle: { backgroundColor: "rgba(150,150,150,0.85)", width: "50%" },
        content: "Game Over",
        confirmText: "OK",
        closeOnMaskClick: true,
        onConfirm: () => {
          setGameState((draft) => {
            draft.resetTimerSignal = !gameState.resetTimerSignal;
          });
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    if (gameState.gameRunning === false) {
      stopCountdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.gameRunning]);

  useEffect(() => {
    if (prevResetTimerSignal.current !== gameState.resetTimerSignal) {
      setLeftTime(initDuration);
    }
    prevResetTimerSignal.current = gameState.resetTimerSignal;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.resetTimerSignal]);

  useEffect(() => {
    resetCountdown();
    /**
     * 問題在我改變resetTimerSignal的時候會觸發setLeftTime(initDuration);
     * 但是LeftTime和initDuration一樣的left time不會改動,導致無法resetCountdown.
     * 但如果我在resetTimerSignal時不管LeftTime直接resetCountdown的話, 那LeftTime和initDuration不同的timer馬上reset成不對的時間。所以resetCountdown是要依賴leftTime沒錯。
     * 那看來除了leftTime之外還要依賴一個東西來觸發resetCountdown才行
     */

    if (gameState.gameRunning === true) {
      startCountdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftTime, gameState.resetTimerSignal]);

  const timeFormatted = dayjs
    .duration(count * 1000 ?? initDuration * 1000)
    .format("mm:ss");
  const currentProgessPct = ((count ?? initDuration) / initDuration) * 100;

  return (
    <StyledCard
      bgColor={bgColor}
      progressPct={`${currentProgessPct}%`}
      onClick={onClickHandler}
    >
      <div className="styledCard_progressBar" />
      <div className="styledCard_timeWrap">{timeFormatted}</div>
    </StyledCard>
  );
}

export default TimerCard;
