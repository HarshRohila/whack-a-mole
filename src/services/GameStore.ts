import { Store, createStoreHook } from "context-scoped-state"

enum GamePage {
  MENU = "menu",
  GAME = "game",
}

class GameStore extends Store<{
  activePage: GamePage
  score: number
}> {
  protected getInitialState(): { activePage: GamePage; score: number } {
    return {
      activePage: GamePage.MENU,
      score: 0,
    }
  }

  startGame() {
    this.setState({ ...this.getState(), score: 0, activePage: GamePage.GAME })
  }

  stopGame() {
    this.setState({ ...this.getState(), activePage: GamePage.MENU })
  }

  setScore(setter: (value: number) => number) {
    const state = this.getState()
    this.setState({ ...state, score: setter(state.score) })
  }
}

const useGameStore = createStoreHook(GameStore)

export { useGameStore, GamePage }
