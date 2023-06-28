import { SafeArea } from "antd-mobile";
import { styled } from "styled-components";
import useVH from "react-viewport-height";
import TimerCard from "./TimerCard";
import { useImmer } from "use-immer";
import { useEffect, useState } from "react";
import BGM1Base64 from "./sounds/BGM1Base64";
import BGM2Base64 from "./sounds/BGM2Base64";

const AppContainer = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
`;
const TimersContainer = styled.div`
  background: #7e7e7e7f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  padding: 0 4px;
`;

export interface IGameState {
  gameRunning: boolean;
  resetTimerSignal: boolean;
}
const audioBGM2 = new Audio(BGM2Base64);
audioBGM2.loop=true;
const audioBGM1 = new Audio(BGM1Base64);
audioBGM1.loop=true;

function App() {
  const [gameState, setGameState] = useImmer<IGameState>({
    gameRunning: false,
    resetTimerSignal: false,
  });
  useVH(); //adjust height for all devices browser
  const [audioBGM,setAudioBGM] =useState(Math.random()>0.5 ?audioBGM1:audioBGM2)

  useEffect(()=>{
    if (gameState.gameRunning){
      audioBGM.play();
    } else  if (gameState.gameRunning === false){
      audioBGM.pause();
      audioBGM.currentTime = 0;
      setAudioBGM(audioBGM===audioBGM1?audioBGM2:audioBGM1)
    }
  },[gameState.gameRunning])
  return (
    <AppContainer>
      <SafeArea position="top" />
      <TimersContainer>
        <TimerCard
          gameState={gameState}
          setGameState={setGameState}
          initDuration={30}
          bgColor="#ff0000"
        />
        <TimerCard
          gameState={gameState}
          setGameState={setGameState}
          initDuration={45}
          bgColor="#ff8c00"
        />
        <TimerCard
          gameState={gameState}
          setGameState={setGameState}
          initDuration={60}
          bgColor="#c0c000"
        />
        <TimerCard
          gameState={gameState}
          setGameState={setGameState}
          initDuration={75}
          bgColor="rgb(73,195,251)"
        />
        <TimerCard
          gameState={gameState}
          setGameState={setGameState}
          initDuration={90}
          bgColor="rgb(242,90,242)"
        />
        <TimerCard
          gameState={gameState}
          setGameState={setGameState}
          initDuration={60}
          bgColor="rgb(210,210,210)"
        />
      </TimersContainer>
      <SafeArea position="bottom" />
    </AppContainer>
  );
}

export default App;
