import { FC } from "react"
import { Button } from "../Button"
import { CircleStop } from "../Icons"
import { useModalStore } from "../Modal/store"
import { useGameStore } from "@app/services/GameStore"

interface StopBtnProps {}

const StopBtn: FC<StopBtnProps> = () => {
  const modalStore = useModalStore()
  const gameStore = useGameStore()

  const handleClick = () => {
    gameStore.stopGame()
    modalStore.showGameOverModal(gameStore.state.score)
  }

  return (
    <Button onClick={handleClick} icon={CircleStop}>
      Stop
    </Button>
  )
}

export { StopBtn }
