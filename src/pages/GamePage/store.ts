import Config from "@app/config"
import { Store, createStoreHook } from "context-scoped-state"

class GamePageStore extends Store<{
  moleIndex: number | undefined
  intervalDuration: number
  elapsedTime: number
  timeLeft: number
}> {
  protected getInitialState() {
    return {
      moleIndex: undefined,
      intervalDuration: Config.MOLE_INTERVAL_IN_MS,
      elapsedTime: 0,
      timeLeft: Config.GAME_DURATION_IN_SEC,
    }
  }

  showMoleAtNewIndex(currentMoleIndex: number | undefined) {
    const randIndex = generateUniqueMoleIndex(currentMoleIndex)
    this.patchState({ moleIndex: randIndex })
  }

  reduceIntervalDuration() {
    this.patchState((state) => ({
      intervalDuration: Math.max(
        state.intervalDuration - 200,
        Config.MIN_MOLE_LIFE_IN_MS
      ),
    }))
  }

  incrementElapsedTime() {
    this.patchState((state) => ({ elapsedTime: state.elapsedTime + 1 }))
  }

  decrementTimeLeft() {
    this.patchState((state) => ({ timeLeft: state.timeLeft - 1 }))
  }
}

function generateUniqueMoleIndex(moleIndex: number | undefined) {
  let randIndex = generateRandomNumber(0, Config.HOLES_COUNT - 1)
  while (randIndex === moleIndex) {
    randIndex = generateRandomNumber(0, Config.HOLES_COUNT - 1)
  }

  return randIndex
}

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const useGamePageStore = createStoreHook(GamePageStore)

export { useGamePageStore }
