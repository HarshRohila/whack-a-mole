import React, { FC, useEffect, useState } from "react"
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
  const [moleIndex, setMoleIndex] = useState<number | undefined>()

  useEffect(() => {
    const interval = setInterval(() => {
      const randIndex = generateRandomNumber(0, Config.HOLES_COUNT - 1)

      setMoleIndex(randIndex)
    }, Config.MOLE_INTERVAL_IN_MS)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <HolesContainer>
        {Array.from({ length: Config.HOLES_COUNT }).map((_, i) => (
          <li key={i}>
            <Hole showMole={moleIndex === i} />
          </li>
        ))}
      </HolesContainer>
      <div className="controls">
        <StopBtn />
      </div>
    </>
  )
}

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export { GamePage }
