import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import Member from "./components/Member";
import Games from "./components/Games";
import Recharges from "./components/Recharges";
import Transactions from "./components/Transactions";
import Collections from "./components/Collections";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/members" element={<Member />} />
                <Route path="/games" element={<Games />} />
                <Route path="/recharges" element={<Recharges />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/collections" element={<Collections />} />
            </Routes>
        </Router>
    );
}

export default App;
