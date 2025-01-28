import { useState } from "react"
import { GamePage, GamePageService } from "./services/GamePageService"
import { useSubscribe } from "./hooks/useSubscibe"
import { GamePage as Game } from "./pages/GamePage"
import { Menu } from "./pages/Menu"
import { Modal, ModalController } from "./components/Modal"

function App() {
  const [gamePage, setGamePage] = useState(GamePage.MENU)

  useSubscribe(GamePageService.state$, ({ activePage }) => {
    setGamePage(activePage)
  })

  const modalState = ModalController.useState()

  return (
    <>
      {gamePage === GamePage.MENU && <Menu />}
      {gamePage === GamePage.GAME && <Game />}
      {modalState && <Modal modalData={modalState} />}
    </>
  )
}

export default App
