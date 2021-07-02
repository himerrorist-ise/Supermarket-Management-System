import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import "./Login.css"

function Login (props) {
    const [user, setUser] = useState({
        userName: "",
        userPassword: "",
        role: ""
    })

    const [fetchResult, setFetchResult] = useState(0)

    useEffect(()=>{
        if (user.userName !== "" && user.userPassword !== "" && user.role !== ""){
            fetch("https://localhost:44355/api/login?role="+user.role + "&user="+user.userName + "&password="+user.userPassword)
            .then(res => res.json())
            .then(result => {
                setFetchResult(result)
            })
        }
    },[user])

    const handleManagerClick = () => {
        props.func(1)
        props.funcManager(1)
        props.funcSeller(0)
    }

    const handleSellerClick = () => {
        props.func(1)
        props.funcManager(0)
        props.funcSeller(1, user.userName)
    }

    const handleChange = (event) => {
        setUser({...user, [event.target.name]:event.target.value})
    }

    return (
        <div className={"logincontainer"}>
            <p>User Name <span style={{marginLeft: "1rem"}}><input type="text" name="userName" value={user.userName} onChange={handleChange} /></span></p>
            <p>Password <span style={{marginLeft: "1.5rem"}}><input type="password" name="userPassword" value={user.userPassword} onChange={handleChange} /></span></p>
            <select value={user.role} name="role" onChange={handleChange}>
                <option value="">Select Any Role</option>
                <option value="manager">Manager</option>
                <option value="seller">Seller</option>
            </select>

            {fetchResult === 1 ? (user.role === "manager" ?
                <button className="loginButton" onClick={handleManagerClick}><Link to="/Manager">Login</Link></button> :
                <button className="loginButton" onClick={handleSellerClick}><Link to="/Selling">Login</Link></button>
            ) :
                <p>Please enter valid information!</p>}

            <button className="loginButton"><Link to="/">Cancel</Link></button>
        </div>
    )
}

export default Login;