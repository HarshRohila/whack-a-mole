import { styled } from "@app/libs/style"
import { GamePageService } from "@app/services/GamePageService"
import React, { FC } from "react"

interface HoleProps {
  showMole: boolean
}

const StyledHole = styled.div<{ $showMole: boolean }>`
  width: 150px;
  height: 180px;
  border: 1px solid black;
  background-color: ${(props) => (props.$showMole ? "brown" : "green")};
`

const Hole: FC<HoleProps> = (props) => {
  const handleClick = () => {
    if (props.showMole) {
      GamePageService.setScore((prev) => prev + 1)
    }
  }

  return (
    <StyledHole onClick={handleClick} $showMole={props.showMole}>
      Hole
    </StyledHole>
  )
}

export { Hole }
