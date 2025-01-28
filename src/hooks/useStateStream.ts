import { createState } from "@rx-state-utils/react"
import { useEffect, useState } from "react"

function useStateStream<T>(state: ReturnType<typeof createState<T>>) {
  const [_state, setState] = useState<T>(state.get())

  useEffect(() => {
    const subscription = state.asObservable().subscribe(setState)
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return _state
}

type ReadOnlyState<T> = Omit<ReturnType<typeof createState<T>>, "update">

function readOnlyState<T>(
  state: ReturnType<typeof createState<T>>
): ReadOnlyState<T> {
  return {
    get: () => state.get(),
    asObservable: () => state.asObservable(),
  }
}

function createStateHook<T>(state: ReturnType<typeof createState<T>>) {
  return function useStateHook() {
    return useStateStream<T>(state)
  }
}

export { useStateStream, readOnlyState, createStateHook }
