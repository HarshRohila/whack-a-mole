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
    this.setActive(GamePage.GAME)
  },
  stopGame() {
    this.setActive(GamePage.MENU)
  },
  gameOver({ score }: { score: number }) {
    this.stopGame()
    console.log(`Game Over! Your score is ${score}`)
  },
  setScore(setter: (value: number) => number) {
    score.next(setter(score.value))
  },
  score$,
  state$,
}

export { GamePage, GamePageService }
