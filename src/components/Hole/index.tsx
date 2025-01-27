import { styled } from "@app/libs/style"
import React, { FC } from "react"

interface HoleProps {
  showMole: boolean
}

const StyledHole = styled.div<HoleProps>`
  width: 150px;
  height: 180px;
  border: 1px solid black;
  background-color: ${(props) => (props.showMole ? "brown" : "green")};
`

const Hole: FC<HoleProps> = (props) => {
  return <StyledHole showMole={props.showMole}>Hole</StyledHole>
}

export { Hole }
