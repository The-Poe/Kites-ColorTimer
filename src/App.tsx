import { SafeArea } from "antd-mobile";
import { useState } from "react";
import { styled } from "styled-components";
import TimerCard from "./TimerCard";
import  useVH  from "react-viewport-height";

const AppContainer = styled.div`
   height: calc(var(--vh, 1vh) * 100); 
   padding: env(safe-area-inset-top) env(safe-area-inset-right)
     env(safe-area-inset-bottom) env(safe-area-inset-left);
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
  useVH(); //adjust height for all devices browser
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
