import React, { useState, useEffect } from "react"
import "./Product.css"

function Product(){
    const [products, setProducts] = useState([])

    useEffect( () => {
        fetch("https://localhost:44355/api/product")
            .then(res => res.json())
            .then((productsArray) => {
                const newProductsArray = productsArray.map((product) => {
                    return product
                })
                setProducts(newProductsArray)
            })
    },[])

    const [newProduct, setNewProduct] = useState({
        productID : "",
        productName : "",
        productQuantity : "",
        productPrice : "",
        productCategory : ""
    })

    const handleChange = (event) => {
        const {name, value, type} = event.target
        if (type === "checkbox"){
            if (newProduct.productName === name){
                setNewProduct({
                    productID : "",
                    productName : "",
                    productQuantity : "",
                    productPrice : "",
                    productCategory : ""
                })
            }
            else{
                const temp = products.filter(product => {
                    return product.productID.toString() === value
                })
                setNewProduct(temp[0])
            }
        }
        else{
            setNewProduct({...newProduct, [name] : value})
        }
    }

    const handleClick = (event) => {
        const {name} = event.target
        if(name === "add"){
            fetch("https://localhost:44355/api/product", {
                method: "POST",
                body: JSON.stringify(
                    newProduct
                )
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

            window.location.reload()
        }
        else if (name === "edit"){
            fetch("https://localhost:44355/api/product", {
                method: "PUT",
                body: JSON.stringify(
                    newProduct
                )
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

            window.location.reload()
        }
        else{
            fetch("https://localhost:44355/api/product/"+ newProduct.productID,{
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
                <h2>Product List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Quantity</th>
                            <th>Product Price</th>
                            <th>Product Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>{
                                return (
                                    <tr key={product.productID}>
                                        <td><input type="checkbox" name={product.productName} value={product.productID} onChange={handleChange}/></td>
                                        <td>{product.productID}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.productQuantity}</td>
                                        <td>{product.productPrice}</td>
                                        <td>{product.productCategory}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>

            <div className={"secondContainer"}>
                <div>
                    <input type="text" name="productID" value={newProduct.productID} placeholder="Product ID" onChange={handleChange} />
                    <input type="text" name="productName" value={newProduct.productName} placeholder="Product Name" onChange={handleChange} />
                    <input type="text" name="productQuantity" value={newProduct.productQuantity} placeholder="Product Quantity" onChange={handleChange} />
                    <input type="text" name="productPrice" value={newProduct.productPrice} placeholder="Product Price" onChange={handleChange} />
                    <input type="text" name="productCategory" value={newProduct.productCategory} placeholder="Product Category" onChange={handleChange} />
                </div>

                <button className={"button"} name="add" onClick={handleClick}>Add</button>
                <button className={"button"} name="edit" onClick={handleClick}>Edit</button>
                <button className={"button"} name="delete" onClick={handleClick}>Delete</button>
            </div>
            <div className={"clear"}></div>

        </div>
    )
}

export default Product