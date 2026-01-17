import { GamePage as Game } from "./pages/GamePage"
import { Menu } from "./pages/Menu"
import { Modal } from "./components/Modal"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { useModalStore } from "./components/Modal/store"
import { GamePage, useGameStore } from "./services/GameStore"
import { useGamePageStore } from "./pages/GamePage/store"

function App() {
  return (
    <useGameStore.Context>
      <useModalStore.Context>
        <GamePages />
        <ModalContainer />
      </useModalStore.Context>
    </useGameStore.Context>
  )
}

function GamePages() {
  const gameStore = useGameStore()
  const gamePage = gameStore.state.activePage
  return (
    <>
      {gamePage === GamePage.MENU && <Menu />}
      {gamePage === GamePage.GAME && (
        <useGamePageStore.Context>
          <Game />
        </useGamePageStore.Context>
      )}
    </>
  )
}

function ModalContainer() {
  const modalStore = useModalStore()

  const modalState = modalStore.state

  return modalState && <Modal modalData={modalState.modalData} />
}

export default App
