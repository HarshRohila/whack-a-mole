import { GamePageService } from "@app/services/GamePageService"
import { FC } from "react"
import { Button } from "../Button"
import { CircleStop } from "../Icons"
import { useStreamState } from "@app/utils/rx-state-utils"
import { useModalStore } from "../Modal/store"

interface StopBtnProps {}

const StopBtn: FC<StopBtnProps> = () => {
  const score = useStreamState(GamePageService.score$, 0)

  const modalStore = useModalStore()

  const handleClick = () => {
    GamePageService.gameOver()
    modalStore.showGameOverModal(score)
  }

  return (
    <Button onClick={handleClick} icon={CircleStop}>
      Stop
    </Button>
  )
}

export { StopBtn }
