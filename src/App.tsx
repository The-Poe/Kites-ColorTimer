import { SafeArea } from "antd-mobile";
import { styled } from "styled-components";
import useVH from "react-viewport-height";
import TimerCard from "./TimerCard";
import { useImmer } from "use-immer";

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
        <TimerCard
          gameState={gameState}
          setGameState={setGameState}
          initDuration={30}
          bgColor="rgb(255,51,51)"
        />
        <TimerCard
          gameState={gameState}
          setGameState={setGameState}
          initDuration={45}
          bgColor="rgb(255,165,0)"
        />
        <TimerCard
          gameState={gameState}
          setGameState={setGameState}
          initDuration={60}
          bgColor="rgb(253,253,40)"
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
