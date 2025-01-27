import React, { FC } from "react"
import { Hole } from "@app/components/Hole"
import { styled } from "@app/libs/style"
import Config from "@app/config"
import { StopBtn } from "@app/components/StopBtn"

const HolesContainer = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`

interface GamePageProps {}

const GamePage: FC<GamePageProps> = () => {
  return (
    <>
      <HolesContainer>
        {Array.from({ length: Config.HOLES_COUNT }).map((_, i) => (
          <li key={i}>
            <Hole />
          </li>
        ))}
      </HolesContainer>
      <div className="controls">
        <StopBtn />
      </div>
    </>
  )
}

export { GamePage }
