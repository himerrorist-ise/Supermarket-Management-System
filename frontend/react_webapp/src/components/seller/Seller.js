import React, { useState, useEffect } from "react"
import "../SellerManager.css"
import "./Seller.css"

function Seller(){
    const [sellers, setSellers] = useState([])

    useEffect( () => {
        fetch("https://localhost:44355/api/seller")
            .then(res => res.json())
            .then((sellersArray) => {
                const newArray = sellersArray.map((seller) => {
                    return seller
                })
                setSellers(newArray)
            })
    },[])

    const [newSeller, setNewSeller] = useState({
        sellerID : "",
        sellerName : "",
        sellerAge : "",
        sellerPhone : "",
        sellerPassword : ""
    })

    const handleChange = (event) => {
        const {name, value, type} = event.target
        if (type === "checkbox"){
            if (newSeller.sellerName === name){
                setNewSeller({
                    sellerID : "",
                    sellerName : "",
                    sellerAge : "",
                    sellerPhone : "",
                    sellerPassword : ""
                })
            }
            else{
                const temp = sellers.filter((seller) => {
                    return seller.sellerID.toString() === value
                })
                setNewSeller(temp[0])
            }
        }
        else{
            setNewSeller({...newSeller, [name] : value})
        }
    }

    const handleClick = (event) => {
        const {name} = event.target
        if(name === "add"){
            fetch("https://localhost:44355/api/seller", {
                method: "POST",
                body: JSON.stringify(
                    newSeller
                )
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

            window.location.reload()
        }
        else if (name === "edit"){
            fetch("https://localhost:44355/api/seller", {
                method: "PUT",
                body: JSON.stringify(
                    newSeller
                )
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

            window.location.reload()
        }
        else{
            fetch("https://localhost:44355/api/seller/"+ newSeller.sellerID,{
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
                <h2>Seller List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Seller ID</th>
                            <th>Seller Name</th>
                            <th>Seller Age</th>
                            <th>Seller Phone</th>
                            <th>Seller Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller)=>{
                                return (
                                    <tr key={seller.sellerID}>
                                        <td><input type="checkbox" name={seller.sellerName} value={seller.sellerID} onChange={handleChange}/></td>
                                        <td>{seller.sellerID}</td>
                                        <td>{seller.sellerName}</td>
                                        <td>{seller.sellerAge}</td>
                                        <td>{seller.sellerPhone}</td>
                                        <td>{seller.sellerPassword}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>

            <div className={"secondContainer"}>
                <div>
                    <input type="text" name="sellerID" value={newSeller.sellerID} placeholder="Seller ID" onChange={handleChange} />
                    <input type="text" name="sellerName" value={newSeller.sellerName} placeholder="Seller Name" onChange={handleChange} />
                    <input type="text" name="sellerAge" value={newSeller.sellerAge} placeholder="Seller Age" onChange={handleChange} />
                    <input type="text" name="sellerPhone" value={newSeller.sellerPhone} placeholder="Seller Phone" onChange={handleChange} />
                    <input type="text" name="sellerPassword" value={newSeller.sellerPassword} placeholder="Seller Password" onChange={handleChange} />
                </div>
                <button className={"sellerbutton"} name="add" onClick={handleClick}>Add</button>
                <button className={"sellerbutton"} name="edit" onClick={handleClick}>Edit</button>
                <button className={"sellerbutton"} name="delete" onClick={handleClick}>Delete</button>
            </div>
            <div style={{clear:"both"}}></div>

        </div>
    )
}

export default Seller