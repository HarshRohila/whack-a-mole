import { styled } from "@app/libs/style"
import { GamePageService } from "@app/services/GamePageService"
import React, { FC } from "react"
import dirt from "@app/assets/mole-hill.png"
import mole from "@app/assets/mole-head.png"
interface HoleProps {
  showMole: boolean
}

const StyledHole = styled.div<{ $showMole: boolean }>`
  width: 120px;
  height: 150px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  overflow: hidden;
  .mole {
    width: 59%;
    overflow: hidden;

    position: relative;
    top: 17px;
    left: -4px;
    img {
      width: 100%;
      // apppy transition based on transform
      transition: transform 0.1s;
      transform: ${(props) =>
        props.$showMole ? "translateY(0)" : "translateY(50px)"};
    }
  }
  .dirt {
    position: relative;
    width: 100%;
  }
`

const Hole: FC<HoleProps> = (props) => {
  const handleClick = () => {
    if (props.showMole) {
      GamePageService.setScore((prev) => prev + 1)
    }
  }

  return (
    <StyledHole onClick={handleClick} $showMole={props.showMole}>
      <div className="mole">
        <img src={mole} alt="mole" />
      </div>
      <img src={dirt} className="dirt" alt="dirt" />
    </StyledHole>
  )
}

export { Hole }
