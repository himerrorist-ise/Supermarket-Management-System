import React from 'react'
import { Link } from "react-router-dom"
import "./SellingNavbar.css"

function SellingNavbar (props) {
    const handleLogout = () => {
        props.func(0)
        props.funcManager(0)
        props.funcSeller(0, "")
    }

    return (
        <div className={"container"}>
            <ul>
                <li>
                    <Link to="/Selling">Rodosto Supermarket</Link>
                </li>
            </ul>

            <button onClick={handleLogout}>
                <Link to="/Login">Logout</Link>
            </button>
        </div>
    )
}

export default SellingNavbar