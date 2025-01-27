import { GamePageService } from "@app/services/GamePageService"
import React, { FC } from "react"

interface StopBtnProps {}

const StopBtn: FC<StopBtnProps> = () => {
  const handleClick = () => {
    GamePageService.stopGame()
  }

  return <button onClick={handleClick}>Stop</button>
}

export { StopBtn }
