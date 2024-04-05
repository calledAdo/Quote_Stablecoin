import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLanding, Landing } from "@pages";


function App() {
  // const [count, setCount] = useState(0)
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <main className="w-screen h-screen overflow-y-scroll scroll-smooth bg-background">
       <Routes>
        <Route path="/" element={ <Landing/>}/>
        <Route path="/app" element={ <AppLanding/>}/>
      
       </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
