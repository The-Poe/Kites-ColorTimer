import { SafeArea } from "antd-mobile";
import { useState } from "react";
import { styled } from "styled-components";
import TimerCard from "./TimerCard";

const AppContainer = styled.div`
  height: 88vh;
`;
const CardsContainer = styled.div`
  background: #7e7e7e7f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  padding: 0 4px;
`;

function App() {
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  return (
    <AppContainer>
      <SafeArea position="top" />
      <CardsContainer>
        <TimerCard
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          duration={30}
          bgColor="#ff3333"
        />
        <TimerCard
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          duration={45}
          bgColor="orange"
        />
        <TimerCard
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          duration={60}
          bgColor="#fdfd28"
        />
        <TimerCard
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          duration={75}
          bgColor="#49c3fb"
        />
        <TimerCard
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          duration={90}
          bgColor="#f25af2"
        />
        <TimerCard
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          duration={60}
          bgColor="white"
        />
      </CardsContainer>
      <SafeArea position="bottom" />
    </AppContainer>
  );
}

export default App;
