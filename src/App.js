import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Tender from "./Components/Tender";
import React, {useState } from 'react'


function App() {
  const [checklogin,setCheckLogin] = useState(false)
  return (
    <div>
      <Router>
        <Routes >
          <Route>
            <Route 
              exact 
              path="/" 
              element={<Login setCheckLogin={setCheckLogin}/>}
            />
            <Route
              exact
              path="/admin"
              element={<Admin authorised={checklogin} setCheckLogin={setCheckLogin} />}
            />

            <Route
              exact
              path="/tender"
              element={<Tender authorised={checklogin} setCheckLogin={setCheckLogin}/>}
            />
          </Route>
        </Routes >
      </Router>
    </div>
  );
}

export default App;
