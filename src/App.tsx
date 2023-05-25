import { SafeArea } from "antd-mobile";
import { useState } from "react";
import { styled } from "styled-components";
import useVH from "react-viewport-height";
import TimerButton from "./TimerButton";
import { useImmer } from "use-immer";

const AppContainer = styled.div`
  height: calc(var(--vh, 1vh) * 100);
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

function App() {
  const [gameState, setGameState] = useImmer<IGameState>({
    gameRunning: false,
    resetTimerSignal: false,
  });
  useVH(); //adjust height for all devices browser
  return (
    <AppContainer>
      <SafeArea position="top" />
      <TimersContainer>
        <TimerButton
          gameState={gameState}
          setGameState={setGameState}
          initDuration={30}
          bgColor="#ff3333"
        />
        <TimerButton
          gameState={gameState}
          setGameState={setGameState}
          initDuration={45}
          bgColor="orange"
        />
        <TimerButton
          gameState={gameState}
          setGameState={setGameState}
          initDuration={60}
          bgColor="#fdfd28"
        />
        <TimerButton
          gameState={gameState}
          setGameState={setGameState}
          initDuration={75}
          bgColor="#49c3fb"
        />
        <TimerButton
          gameState={gameState}
          setGameState={setGameState}
          initDuration={90}
          bgColor="#f25af2"
        />
        <TimerButton
          gameState={gameState}
          setGameState={setGameState}
          initDuration={60}
          bgColor="white"
        />
      </TimersContainer>
      <SafeArea position="bottom" />
    </AppContainer>
  );
}

export default App;
