import { GamePageService } from "@app/services/GamePageService"
import { FC } from "react"
import { Button } from "../Button"
import { CircleStop } from "../Icons"

interface StopBtnProps {}

const StopBtn: FC<StopBtnProps> = () => {
  const handleClick = () => {
    GamePageService.stopGame()
  }

  return (
    <Button onClick={handleClick} icon={CircleStop}>
      Stop
    </Button>
  )
}

export { StopBtn }
