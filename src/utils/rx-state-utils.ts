import { BehaviorSubject, Observable } from "@app/libs/rx"

function createState<T>(initialValue: T): [BehaviorSubject<T>, Observable<T>] {
  const state = new BehaviorSubject(initialValue)
  return [state, state.asObservable()]
}

export { createState }
