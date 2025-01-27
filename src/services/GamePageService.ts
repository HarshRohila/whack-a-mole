import { createState } from "@app/utils/rx-state-utils"

enum GamePage {
  MENU = "menu",
  GAME = "game",
}

const [state, state$] = createState({
  activePage: GamePage.MENU,
})

const GamePageService = {
  setActive(page: GamePage) {
    state.next({ ...state.value, activePage: page })
  },
  startGame() {
    this.setActive(GamePage.GAME)
  },
  stopGame() {
    this.setActive(GamePage.MENU)
  },
  state$,
}

export { GamePage, GamePageService }
