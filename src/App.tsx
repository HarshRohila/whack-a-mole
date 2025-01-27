import { Hole } from "./components/Hole"
import Config from "./config"

function App() {
  return (
    <main>
      {Array.from({ length: Config.HOLES_COUNT }).map((_, i) => (
        <Hole key={i} />
      ))}
    </main>
  )
}

export default App
