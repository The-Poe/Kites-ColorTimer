import { Modal } from "antd-mobile";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Updater } from "use-immer";
import { IGameState } from "./App";
import dayjs from "./utils/wrapDayjs";
import { useCountdown } from "usehooks-ts";
import { lighten } from "polished";
import flipAudioBase64 from "./sounds/flipAudioBase64";

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
