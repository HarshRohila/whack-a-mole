import { Store, createStoreHook } from "context-scoped-state"

class HoleStore extends Store<{
  isWhacked: boolean
  showMole: boolean
}> {
  protected getInitialState(): { isWhacked: boolean; showMole: boolean } {
    return { isWhacked: false, showMole: false }
  }

  setShowMole(showMole: boolean) {
    this.patchState({ showMole })
  }

  whackMole() {
    this.patchState({ isWhacked: true, showMole: false })
    setTimeout(() => {
      this.patchState({ isWhacked: false })
    }, 500)
  }
}

const useHoleStore = createStoreHook(HoleStore)

export { useHoleStore }
