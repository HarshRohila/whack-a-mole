import { FC, useEffect, useState } from "react"
import { Hole } from "@app/components/Hole"
import { css, styled } from "@app/libs/style"
import Config from "@app/config"
import { StopBtn } from "@app/components/StopBtn"
import { desktopCss } from "@app/utils/desktop-css"
import { useModalStore } from "@app/components/Modal/store"
import { useGameStore } from "@app/services/GameStore"

const HolesContainer = styled.ul`
  display: flex;

  max-width: 788px;
  ${desktopCss(css`
    max-width: 1500px;
  `)}

  margin: auto;
  list-style-type: none;
  padding: 0;
  flex-wrap: wrap;
  gap: 20px;
  column-gap: 50px;
  justify-content: center;
`

interface GamePageProps {}

const Dashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px 0;
  font-size: 1.2rem;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

const GamePage: FC<GamePageProps> = () => {
  const [moleIndex, setMoleIndex] = useState<number | undefined>()
  const [intervalDuration, setIntervalDuration] = useState(
    Config.MOLE_INTERVAL_IN_MS
  )
  const [elapsedTime, setElapsedTime] = useState(0)

  // generate random mole index every interval
  useEffect(() => {
    const interval = setInterval(() => {
      const randIndex = generateUniqueMoleIndex(moleIndex)
      setMoleIndex(randIndex)
    }, intervalDuration)

    return () => {
      clearInterval(interval)
    }
  }, [moleIndex])

  // effect to keep track of seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // effect to decrease interval duration every few seconds
  useEffect(() => {
    if (
      elapsedTime > 0 &&
      elapsedTime % Config.UPDATE_DIFFICULTY_INTERVAL_IN_SECS === 0
    ) {
      setIntervalDuration((prevDuration) =>
        Math.max(prevDuration - 200, Config.MIN_MOLE_LIFE_IN_MS)
      )
    }
  }, [elapsedTime])

  return (
    <Container>
      <Dashboard>
        <Score />
        <TimeLeft />
      </Dashboard>
      <HolesContainer>
        {Array.from({ length: Config.HOLES_COUNT }).map((_, i) => (
          <li key={i}>
            <Hole showMole={moleIndex === i} />
          </li>
        ))}
      </HolesContainer>
      <Controls>
        <StopBtn />
      </Controls>
    </Container>
  )
}

function generateUniqueMoleIndex(moleIndex: number | undefined) {
  let randIndex = generateRandomNumber(0, Config.HOLES_COUNT - 1)
  while (randIndex === moleIndex) {
    randIndex = generateRandomNumber(0, Config.HOLES_COUNT - 1)
  }

  return randIndex
}

function Score() {
  const gameStore = useGameStore()
  const score = gameStore.state.score

  return <div>Score: {score}</div>
}

function TimeLeft() {
  const [time, setTime] = useState(Config.GAME_DURATION_IN_SEC)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const modalStore = useModalStore()
  const gameStore = useGameStore()

  useEffect(() => {
    if (time === 0) {
      gameStore.stopGame()
      modalStore.showGameOverModal(gameStore.state.score)
    }
  }, [time])

  return <div>Time Left: {time}</div>
}

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export { GamePage }
