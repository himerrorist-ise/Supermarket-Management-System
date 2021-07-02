import React from "react"
import {Link} from "react-router-dom"
import "./Navbar.css"

function Navbar (props) {

    return (
        <div className={"container"}>
            <div>
                <ul>
                    <li>
                        <Link  to="/">RODOSTO SUPERMARKET</Link>
                    </li>
                    <li>
                        <Link  to="/">Home</Link>
                    </li>
                    <li>
                        <Link  to="/About">About</Link>
                    </li>
                    <li>
                        <Link  to="/ContactUs">ContactUs</Link>
                    </li>
                </ul>
        
                <button><Link to="/Login">Login</Link></button>
            </div>
        </div>
    )
}

export default Navbar