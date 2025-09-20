import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Gaming Club Dashboard 🎮</h1>
            <p>Select a section to manage:</p>
            <div style={{ marginTop: "20px" }}>
                <Link to="/members"><button>Manage Members</button></Link>
                <br /><br />
                <Link to="/games"><button>Manage Games</button></Link>
                <br /><br />
                <Link to="/recharges"><button>Manage Recharges</button></Link>
                <br /><br />
                <Link to="/transactions"><button>Manage Transactions</button></Link>
                <br /><br />
                <Link to="/collections"><button>View Collections</button></Link>
            </div>
        </div>
    );
}

export default Dashboard;
