import React, { useState, useEffect } from "react"
import "./Category.css" 

function Category (){
    const [categories, setCategories] = useState([])

    useEffect( () => {
        fetch("https://localhost:44355/api/category")
            .then((res)=>res.json())
            .then((categoryArray)=>{
                const newArray = categoryArray.map((category)=>{
                    return category
                })
                setCategories(newArray)
            })
    },[])

    const [newCategory, setNewCategory] = useState({
        categoryID: "",
        categoryName: "",
        categoryDescription: ""
    })

    const handleChange = (event) => {
        const {name, value, type} = event.target
        if (type === "checkbox"){
            if (newCategory.categoryName === name){
                setNewCategory({
                    categoryID: "",
                    categoryName: "",
                    categoryDescription: ""
                })
            }
            else{
                const temp = categories.filter((category)=>{
                    return category.categoryID.toString() === value
                })
                setNewCategory(temp[0])
            }
        }
        else{
            setNewCategory({...newCategory, [name]:value})
        }
    }

    const handleClick = (event) => {
        const {name} = event.target
        if(name === "add"){
            fetch("https://localhost:44355/api/category", {
                method: "POST",
                body: JSON.stringify(
                    newCategory
                )
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

            window.location.reload()
        }
        else if (name === "edit"){
            fetch("https://localhost:44355/api/category", {
                method: "PUT",
                body: JSON.stringify(
                    newCategory
                )
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

            window.location.reload()
        }
        else{
            fetch("https://localhost:44355/api/category/"+ newCategory.categoryID,{
                method:"DELETE"
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

            window.location.reload()
        }
    }

    return(
        <div className={"bodyContainer"}>
            <div className={"leftContainer"}>
                <h2>Category List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Category ID</th>
                            <th>Category Name</th>
                            <th>Category Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category)=>{
                            return(
                                <tr key={category.categoryID}>
                                    <td><input type="checkbox" name={category.categoryName} value={category.categoryID} onChange={handleChange} /></td>
                                    <td>{category.categoryID}</td>
                                    <td>{category.categoryName}</td>
                                    <td>{category.categoryDescription}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className={"rightContainer"}>
                <div>
                    <input type="text" name="categoryID" value={newCategory.categoryID} placeholder="Category ID" onChange={handleChange} />
                    <input type="text" name="categoryName" value={newCategory.categoryName} placeholder="Category Name" onChange={handleChange} />
                    <input type="text" name="categoryDescription" value={newCategory.categoryDescription} placeholder="Category Description" onChange={handleChange} />
                </div>

                <button className={"categorybutton"} name="add" onClick={handleClick}>Add</button>
                <button className={"categorybutton"} name="edit" onClick={handleClick}>Edit</button>
                <button className={"categorybutton"} name="delete" onClick={handleClick}>Delete</button>
                
            </div>
            <div style={{clear:"both"}}></div>
        </div>
    )
}

export default Category