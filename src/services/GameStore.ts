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
    this.patchState({ score: 0, activePage: GamePage.GAME })
  }

  stopGame() {
    this.patchState({ activePage: GamePage.MENU })
  }

  setScore(setter: (value: number) => number) {
    this.patchState({ score: setter(this.getState().score) })
  }
}

const useGameStore = createStoreHook(GameStore)

export { useGameStore, GamePage }
