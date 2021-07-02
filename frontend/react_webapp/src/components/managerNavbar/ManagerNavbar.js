import React from 'react'
import { Link } from "react-router-dom"
import "./ManagerNavbar.css"

function ManagerNavbar (props) {
    const handleLogout = () => {
        props.func(0)
        props.funcManager(0)
        props.funcSeller(0)
    }

    return (
        <div className={"container"}>
            <ul>
                <li>
                    <Link to="/Product">Products</Link>
                </li>
                <li>
                    <Link to="/Category">Categories</Link>
                </li>
                <li>
                    <Link to="/Seller">Sellers</Link>
                </li>
                <li>
                    <Link to="/Manager">Managers</Link>
                </li>
            </ul>

            <button onClick={handleLogout}>
                <Link to="/Login">Logout</Link>
            </button>
        </div>
    )
}

export default ManagerNavbar