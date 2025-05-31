import { DataProvider } from "./context/DataContext"
import Notification from "./components/Notification"
import RouterApp from "./Routes"

function App() {
  return (
    <DataProvider>
      <RouterApp/>
      <Notification/>
    </DataProvider>
  )
}

export default App
