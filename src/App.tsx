import { useState } from "react"
import { GamePage, GamePageService } from "./services/GamePageService"
import { useSubscribe } from "./hooks/useSubscibe"
import { GamePage as Game } from "./pages/GamePage"
import { Menu } from "./pages/Menu"
import { Modal, ModalController } from "./components/Modal"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { useStateStream } from "./hooks/useStateStream"

function App() {
  const [gamePage, setGamePage] = useState(GamePage.MENU)

  useSubscribe(GamePageService.state$, ({ activePage }) => {
    setGamePage(activePage)
  })

  const modalState = useStateStream(ModalController.state)

  return (
    <>
      {gamePage === GamePage.MENU && <Menu />}
      {gamePage === GamePage.GAME && <Game />}
      {modalState && <Modal modalData={modalState.modalData} />}
    </>
  )
}

export default App
