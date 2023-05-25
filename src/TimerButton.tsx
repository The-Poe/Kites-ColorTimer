import { Button, Modal } from "antd-mobile";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Updater } from "use-immer";
import { IGameState } from "./App";
import dayjs from "./utils/wrapDayjs";
import { useCountdown } from 'usehooks-ts'

const StyledButton = styled(Button)<{ bgColor: string }>`
  --background-color: ${(props) => props.bgColor};
  --border-color: ${(props) => props.bgColor};
  width: calc(100% - 16px);
  margin: 2px 4px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
`;
const StyledTime = styled.div`
  font-size: 9vh;
`;
interface ITimerButton {
  gameState: IGameState;
  setGameState: Updater<IGameState>;
  initDuration?: number;
  bgColor?: string;
}

function TimerButton({
  gameState,
  setGameState,
  initDuration = 30,
  bgColor = "white",
}: ITimerButton) {
  const [leftTime, setLeftTime] = useState<number>(initDuration);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
  useCountdown({
    countStart: leftTime,
    intervalMs: 1000,
  })
  const prevResetTimerSignal = useRef<boolean>();

  const onClickHandler = () => {
    if (count===initDuration) {
      setGameState((draft) => {
        draft.gameRunning = true;
      });
      startCountdown();
    } else {
      setLeftTime(initDuration - count);
    }
  };

  useLayoutEffect(()=>{
    if (count === 0 ){
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

  },[count])

  useEffect(()=>{
    if(gameState.gameRunning===false){
      stopCountdown();
    }
  },[gameState.gameRunning])

  useEffect(() => {
    if (prevResetTimerSignal.current!==gameState.resetTimerSignal){
      setLeftTime(initDuration);
    }
    prevResetTimerSignal.current = gameState.resetTimerSignal;
  }, [gameState.resetTimerSignal]);

  useEffect(()=>{
    resetCountdown(); 
    /**
     * 問題在我改變resetTimerSignal的時候會觸發setLeftTime(initDuration);
     * 但是LeftTime和initDuration一樣的left time不會改動,導致無法resetCountdown.
     * 但如果我在resetTimerSignal時不管LeftTime直接resetCountdown的話, 那LeftTime和initDuration不同的timer馬上reset成不對的時間。所以resetCountdown是要依賴leftTime沒錯。
     * 那看來除了leftTime之外還要依賴一個東西來觸發resetCountdown才行
     */
    
    if(gameState.gameRunning===true){
      startCountdown();
    } 
  },[leftTime,gameState.resetTimerSignal])

  const timeFormatted = dayjs.duration((count*1000) ?? initDuration*1000).format("mm:ss");

  return (
    <StyledButton bgColor={bgColor} onClick={onClickHandler}>
      <StyledTime>{timeFormatted}</StyledTime>
    </StyledButton>
  );
}

export default TimerButton;
