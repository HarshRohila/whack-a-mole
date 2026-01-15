import { useState } from "react"
import { GamePage, GamePageService } from "./services/GamePageService"
import { useSubscribe } from "./hooks/useSubscibe"
import { GamePage as Game } from "./pages/GamePage"
import { Menu } from "./pages/Menu"
import { Modal } from "./components/Modal"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { useModalStore } from "./components/Modal/store"

function App() {
  const [gamePage, setGamePage] = useState(GamePage.MENU)

  useSubscribe(GamePageService.state$, ({ activePage }) => {
    setGamePage(activePage)
  })

  return (
    <useModalStore.Context>
      {gamePage === GamePage.MENU && <Menu />}
      {gamePage === GamePage.GAME && <Game />}
      <ModalContainer />
    </useModalStore.Context>
  )
}

function ModalContainer() {
  const modalStore = useModalStore()

  const modalState = modalStore.state

  return modalState && <Modal modalData={modalState.modalData} />
}

export default App
