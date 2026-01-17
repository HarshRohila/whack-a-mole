import { FC, useEffect } from "react"
import { Hole } from "@app/components/Hole"
import { css, styled } from "@app/libs/style"
import Config from "@app/config"
import { StopBtn } from "@app/components/StopBtn"
import { desktopCss } from "@app/utils/desktop-css"
import { useModalStore } from "@app/components/Modal/store"
import { useGameStore } from "@app/services/GameStore"
import { useHoleStore } from "@app/components/Hole/store"
import { useGamePageStore } from "./store"

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
  const gamePageStore = useGamePageStore()

  const { moleIndex, intervalDuration, elapsedTime } = gamePageStore.state

  // generate random mole index every interval
  useEffect(() => {
    const interval = setInterval(() => {
      gamePageStore.showMoleAtNewIndex(moleIndex)
    }, intervalDuration)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moleIndex])

  // effect to keep track of seconds
  useEffect(() => {
    const timer = setInterval(() => {
      gamePageStore.incrementElapsedTime()
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [gamePageStore])

  // effect to decrease interval duration every few seconds
  useEffect(() => {
    if (
      elapsedTime > 0 &&
      elapsedTime % Config.UPDATE_DIFFICULTY_INTERVAL_IN_SECS === 0
    ) {
      gamePageStore.reduceIntervalDuration()
    }
  }, [elapsedTime, gamePageStore])

  return (
    <Container>
      <Dashboard>
        <Score />
        <TimeLeft />
      </Dashboard>
      <HolesContainer>
        {Array.from({ length: Config.HOLES_COUNT }).map((_, i) => (
          <li key={i}>
            <useHoleStore.Context>
              <Hole showMole={moleIndex === i} />
            </useHoleStore.Context>
          </li>
        ))}
      </HolesContainer>
      <Controls>
        <StopBtn />
      </Controls>
    </Container>
  )
}

function Score() {
  const gameStore = useGameStore()
  const score = gameStore.state.score

  return <div>Score: {score}</div>
}

function TimeLeft() {
  const gamePageStore = useGamePageStore()
  const { timeLeft } = gamePageStore.state

  useEffect(() => {
    const interval = setInterval(() => {
      gamePageStore.decrementTimeLeft()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [gamePageStore])

  const modalStore = useModalStore()
  const gameStore = useGameStore()

  useEffect(() => {
    if (timeLeft === 0) {
      gameStore.stopGame()
      modalStore.showGameOverModal(gameStore.state.score)
    }
  }, [gameStore, modalStore, timeLeft])

  return <div>Time Left: {timeLeft}</div>
}

export { GamePage }
