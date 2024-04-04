import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Landing } from "@pages";


function App() {
  // const [count, setCount] = useState(0)
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <main className="w-screen h-screen">
       <Routes>
        <Route path="/" element={ <Landing/>}/>
      
       </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
