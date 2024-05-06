
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import './App.css'
import GetBlocks from './components/getBlocks/GetBlocks'
import GetOneBlock from "./components/getOneBlock/GetOneBlock";
import SendTxn from "./components/sendTxn/SendTxn";

function App() {

  return (

    <div className="app">

      <BrowserRouter>
        
        <div className="nav-app">

          <div className="container-nav">

            <NavLink to="/">Get Blockchain</NavLink>
            <NavLink to="/getOneBlock">Get One Block</NavLink>
            <NavLink to="/sendTxn">Send Transaction</NavLink>
            
          </div>
          
            
        </div>

        <div className="content-app">

          <Routes>

            <Route path="/" element={<GetBlocks />} />
            <Route path="/getOneBlock" element={<GetOneBlock />} />
            <Route path="/sendTxn" element={<SendTxn />} />

          </Routes>

        </div>
        
      </BrowserRouter>

    </div>

  )
}

export default App
