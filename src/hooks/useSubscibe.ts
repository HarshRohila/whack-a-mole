import { useEffect } from "react"
import { Observable } from "rxjs"

function useSubscribe<T>(stream$: Observable<T>, callback: (value: T) => void) {
  useEffect(() => {
    stream$.subscribe(callback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export { useSubscribe }
