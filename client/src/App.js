import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login/login";
import Dashboard from "./components/pages/Dashboard/dashboard";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
