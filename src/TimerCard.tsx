import { useCountDown } from "ahooks";
import { Card, Modal } from "antd-mobile";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import dayjs from "./utils/wrapDayjs";

const StyledCard = styled(Card)<{ bgColor: string }>`
  width: calc(100% - 32px);
  margin: 2px 4px;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  display:flex;
  align-items:center;
  justify-content:flex-start;
`;
const StyledTime = styled.div`
  font-size: 9vh;
`;
interface ITimerCard {
  gameRunning: boolean;
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>;
  duration?: number;
  bgColor?: string;
}

function TimerCard({
  gameRunning,
  setGameRunning,
  duration = 30,
  bgColor = "white",
}: ITimerCard) {
  const durationInMilliseconds = duration * 1000;
  const [leftTime, setLeftTime] = useState<number>();
  const [countdown] = useCountDown({
    leftTime: leftTime,
    onEnd: () => {
      setGameRunning(false);
      Modal.alert({
        bodyStyle:{backgroundColor:'rgba(150,150,150,0.85)',width: '50%'},
        content: 'Game Over',
        confirmText:'OK',
        closeOnMaskClick: true,
      })
    },
  });

  const timeFormatted = dayjs
    .duration(countdown || durationInMilliseconds)
    .format("mm:ss");

  useEffect(() => {
    if (gameRunning === false) {
      setLeftTime(undefined);
    }
  }, [gameRunning]);

  const onClickHandler = ()=>{
    if(!leftTime){
      setGameRunning(true);
      setLeftTime(durationInMilliseconds);
    } else {
      setLeftTime(durationInMilliseconds - countdown)
    }
  }
  return (
    <StyledCard
      bgColor={bgColor}
      onClick={onClickHandler}
    >
      <StyledTime>{timeFormatted}</StyledTime>
    </StyledCard>
  );
}

export default TimerCard;
