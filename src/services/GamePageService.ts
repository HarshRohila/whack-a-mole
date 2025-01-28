import { ModalController } from "@app/components/Modal"
import { createState } from "@app/utils/rx-state-utils"

enum GamePage {
  MENU = "menu",
  GAME = "game",
}

const [state, state$] = createState({
  activePage: GamePage.MENU,
})

const [score, score$] = createState(0)

const GamePageService = {
  setActive(page: GamePage) {
    state.next({ ...state.value, activePage: page })
  },
  startGame() {
    this.setScore(() => 0)
    this.setActive(GamePage.GAME)
  },
  stopGame() {
    this.setActive(GamePage.MENU)
  },
  gameOver() {
    this.stopGame()
    ModalController.showModal({
      message: `Game Over! Your score is ${score.value}`,
    })
  },
  setScore(setter: (value: number) => number) {
    score.next(setter(score.value))
  },
  score$,
  state$,
}

export { GamePage, GamePageService }
