import { useState } from "react"
import { GamePage, GamePageService } from "./services/GamePageService"
import { useSubscribe } from "./hooks/useSubscibe"
import { GamePage as Game } from "./pages/GamePage"
import { Menu } from "./pages/Menu"

function App() {
  const [gamePage, setGamePage] = useState(GamePage.MENU)

  useSubscribe(GamePageService.state$, ({ activePage }) => {
    setGamePage(activePage)
  })

  return (
    <>
      {gamePage === GamePage.MENU && <Menu />}
      {gamePage === GamePage.GAME && <Game />}
    </>
  )
}

export default App
