import { styled } from "@app/libs/style"
import React, { FC } from "react"

interface HoleProps {}

const StyledHole = styled.div`
  width: 150px;
  height: 180px;
  border: 1px solid black;
`

const Hole: FC<HoleProps> = () => {
  return <StyledHole>Hole</StyledHole>
}

export { Hole }
