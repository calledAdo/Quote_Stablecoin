import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLanding, Landing } from "@pages";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <main className="dark w-screen h-screen overflow-y-scroll bg-background dark:bg-background-dark">
       <Routes>
        <Route path="/" element={ <Landing/>}/>
        <Route path="/app" element={ <AppLanding/>}/>
      
       </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
