import { BehaviorSubject, Observable } from "@app/libs/rx"
import { useEffect, useState } from "react"

function createState<T>(initialValue: T): [BehaviorSubject<T>, Observable<T>] {
  const state = new BehaviorSubject(initialValue)
  return [state, state.asObservable()]
}

function useStreamState<T>(stream$: Observable<T>, initialValue: T) {
  const [state, setState] = useState<T>(initialValue)

  useEffect(() => {
    const subscription = stream$.subscribe(setState)
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}

export { createState, useStreamState }
