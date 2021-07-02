import React, { useState, useEffect } from "react"
import "../SellerManager.css"
import "./Manager.css"

function Manager () {

    const [managers, setManagers] = useState([])

    useEffect( () => {
        fetch("https://localhost:44355/api/manager")
            .then(res => res.json())
            .then((managersArray) => {
                const newArray = managersArray.map((manager) => {
                    return manager
                })
                setManagers(newArray)
            })
    },[])

    const [newManager, setNewManager] = useState({
        managerID : "",
        managerName : "",
        managerAge : "",
        managerPhone : "",
        managerAddress : "",
        managerPassword : "",
    })

    const handleChange = (event) => {
        const {name, value, type} = event.target
        if (type === "checkbox"){
            if (newManager.managerName === name){
                setNewManager({
                    managerID : "",
                    managerName : "",
                    managerAge : "",
                    managerPhone : "",
                    managerAddress : "",
                    managerPassword : ""
                })
            }
            else{
                const temp = managers.filter((manager) => {
                    return manager.managerID.toString() === value
                })
                setNewManager(temp[0])
            }
        }
        else{
            setNewManager({...newManager, [name] : value})
        }
    }

    const handleClick = (event) => {
        const {name} = event.target
        if(name === "add"){
            fetch("https://localhost:44355/api/manager", {
                method: "POST",
                body: JSON.stringify(
                    newManager
                )
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

            window.location.reload()
        }
        else if (name === "edit"){
            fetch("https://localhost:44355/api/manager", {
                method: "PUT",
                body: JSON.stringify(
                    newManager
                )
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

            window.location.reload()
        }
        else{
            fetch("https://localhost:44355/api/manager/"+ newManager.managerID,{
                method:"DELETE"
            })
                .then(res=>res.json())
                .then(json=>console.log(json))
        
            window.location.reload()
        }
    }

    return (
        <div className={"bodyContainer"}>
            <div className={"firstContainer"}>
                <h2>Manager List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Manager ID</th>
                            <th>Manager Name</th>
                            <th>Manager Age</th>
                            <th>Manager Phone</th>
                            <th>Manager Address</th>
                            <th>Manager Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager)=>{
                                return (
                                    <tr key={manager.managerID}>
                                        <td><input type="checkbox" name={manager.managerName} value={manager.managerID} onChange={handleChange}/></td>
                                        <td>{manager.managerID}</td>
                                        <td>{manager.managerName}</td>
                                        <td>{manager.managerAge}</td>
                                        <td>{manager.managerPhone}</td>
                                        <td>{manager.managerAddress}</td>
                                        <td>{manager.managerPassword}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>

            <div className={"secondContainer"}>
                <div>
                    <input type="text" name="managerID" value={newManager.managerID} placeholder="Manager ID" onChange={handleChange} />
                    <input type="text" name="managerName" value={newManager.managerName} placeholder="Manager Name" onChange={handleChange} />
                    <input type="text" name="managerAge" value={newManager.managerAge} placeholder="Manager Age" onChange={handleChange} />
                    <input type="text" name="managerPhone" value={newManager.managerPhone} placeholder="Manager Phone" onChange={handleChange} />
                    <input type="text" name="managerAddress" value={newManager.managerAddress} placeholder="Manager Address" onChange={handleChange} />
                    <input type="text" name="managerPassword" value={newManager.managerPassword} placeholder="Manager Password" onChange={handleChange} />
                </div>
                <button className={"managerbutton"} name="add" onClick={handleClick}>Add</button>
                <button className={"managerbutton"} name="edit" onClick={handleClick}>Edit</button>
                <button className={"managerbutton"} name="delete" onClick={handleClick}>Delete</button>
            </div>
            <div style={{clear:"both"}}></div>

        </div>
    )
}

export default Manager