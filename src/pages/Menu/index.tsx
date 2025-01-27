import { styled } from "@app/libs/style"
import { GamePageService } from "@app/services/GamePageService"
import React, { FC } from "react"
import { GamePage } from "@app/services/GamePageService"

interface MenuProps {}

const StyledMenu = styled.ul`
  height: 100%;
  width: 100%;
`

const Menu: FC<MenuProps> = () => {
  return (
    <StyledMenu>
      <li>
        <StartBtn />
      </li>
    </StyledMenu>
  )
}

function StartBtn() {
  const handleClick = () => {
    GamePageService.startGame()
  }

  return <button onClick={handleClick}>Start Game</button>
}

export { Menu }
