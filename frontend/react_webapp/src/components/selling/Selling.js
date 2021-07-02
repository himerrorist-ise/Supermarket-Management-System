import React, { useState, useEffect } from "react"
import "./Selling.css"

function Selling(props){
    const getDate = () => {
        let newDate = new Date()
        let date = newDate.getDate()
        let month = newDate.getMonth() + 1
        let year = newDate.getFullYear()

        return month.toString() + "/" + date.toString() + "/" + year.toString()
    }

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [bills, setBills] = useState([])
    const [billID, setBillID] = useState("")
    const [selectedBill, setSelectedBill] = useState("")
    const [orders, setOrders] = useState([])
    const [currentOrder, setCurrentOrder] = useState({
        orderID: "",
        productName: "",
        productPrice: "",
        Quantity: "",
        amount: ""
    })
    const [selectedProduct, setSelectedProduct] = useState({
        productID : "",
        productName : "",
        productQuantity : "",
        productPrice : "",
        productCategory : ""
    })

    useEffect(()=>{
        fetch("https://localhost:44355/api/product")
            .then(res=> res.json())
            .then((array) => {
                const newArray = array.map(product => {
                    return product
                })
                setProducts(newArray)
            })

        fetch("https://localhost:44355/api/category")
            .then(res=> res.json())
            .then((array) => {
                const newArray = array.map(category => {
                    return category
                })
                setCategories(newArray)
            })

        fetch("https://localhost:44355/api/bill")
            .then(res=> res.json())
            .then((array) => {
                const newArray = array.map(element => {
                    return element
                })
                setBills(newArray)
            })
    },[])

    const handleSelectChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    const handleChange = (event) => {
        const {name, type, value} = event.target
        if(type === "checkbox"){
            if(name === "bill"){
                if (selectedBill === value){
                    setSelectedBill("")
                }
                else{
                    setSelectedBill(value)
                }
            }
            else{
                if(name === selectedProduct.productName){
                    setSelectedProduct({
                        productID : "",
                        productName : "",
                        productQuantity : "",
                        productPrice : "",
                        productCategory : ""
                    })
                }
                else{
                    const product = products.filter(element=>{
                        return element.productID.toString() === value
                    })
                    setSelectedProduct(product[0])
                    setCurrentOrder({...currentOrder, productName:product[0].productName, productPrice:product[0].productPrice.toString()})
                }
            }
        }
        else{
            if(name === "billID"){
                setBillID(value)
            }
            else{
                if(parseInt(currentOrder.Quantity) > 0){
                    let quantity = parseInt(currentOrder.Quantity)
                    let total = parseInt(currentOrder.productPrice) * quantity
                    setCurrentOrder({...currentOrder, amount:total.toString(), [name]:value})
                }
                else{
                    setCurrentOrder({...currentOrder, [name]:value})
                }
            }
        }
    }

    const handleClick = (event) => {
        const {name} = event.target
        if(name === "addOrder"){
            if(currentOrder.orderID !== "" && currentOrder.productName !== "" && currentOrder.Quantity !== "" && currentOrder.amount !== ""){
                const temp = orders
                temp.push(currentOrder)
                setOrders(temp)
                setCurrentOrder({...currentOrder, orderID:"", Quantity:""})
            }
            else{
                alert("Missing Information")
            }
        }
        else if(name === "addBill"){
            if (orders.length > 0){
                if(billID === ""){
                    alert("Please enter Bill ID!")
                }
                else{
                    var total = 0
                    for (let index = 0, n = orders.length; index < n; index++) {
                        const element = orders[index];
                        total = total + parseInt(element.amount)
                    }
                    const bill = {
                        billID : billID,
                        sellerName : props.sellerName,
                        billDate : getDate(),
                        totalAmount : total.toString()
                    }
                    fetch("https://localhost:44355/api/bill",{
                        method: "POST",
                        body: JSON.stringify(
                            bill
                        )
                    }).then(res => res.json()).then(json=>console.log(json))

                    window.location.reload()
                }
            }
        }
        else{
            if(selectedBill === ""){
                alert("Please select a bill to delete!")
            }
            else{
                fetch("https://localhost:44355/api/bill/"+selectedBill, {
                    method:"DELETE"
                }).then(res=>res.json()).then(json=>console.log(json))
                
                window.location.reload()
            }
        }
    }

    return(
        <div className={"bodyContainer"}>
            <h2>Seller: {props.sellerName}</h2>
            <h3>Date: {getDate()}</h3>

            <div>
                <div className={"productList"}>
                    <select className={"selection"} value={selectedCategory} name="selectedCategory" onChange={handleSelectChange}>
                        <option value="" key={""}>Selecet Category To Filter</option>
                        {categories.map(category => {
                            return (
                                <option value={category.categoryName} key={category.categoryID}>{category.categoryName}</option>
                            )
                        })}
                    </select>

                    <h4>Products</h4>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCategory === "" ?
                                products.map(product=>{
                                    return (
                                        <tr key={product.productID}>
                                            <td><input type="checkbox" name={product.productName} value={product.productID} onChange={handleChange}/> </td>
                                            <td>{product.productName}</td>
                                            <td>{product.productPrice}</td>
                                            <td>{product.productQuantity}</td>
                                        </tr>
                                    )}) :
                                products.filter(product=>{
                                    return product.productCategory.toString() === selectedCategory
                                }).map(product=>{
                                    return (
                                        <tr key={product.productID}>
                                            <td><input type="checkbox" name={product.productName} value={product.productID} onChange={handleChange} /></td>
                                            <td>{product.productName}</td>
                                            <td>{product.productPrice}</td>
                                            <td>{product.productQuantity}</td>
                                        </tr>
                                    )
                                })    
                            }
                        </tbody>
                    </table>
                </div>

                <div className={"inputTexts"}>
                    <h4>Please Fill the Blanks to Add Order</h4>

                    <input type="text" name="billID" value={billID} placeholder="Bill ID" onChange={handleChange} />
                    <input type="text" name="orderID" value={currentOrder.orderID} placeholder="Order ID" onChange={handleChange} />
                    <input type="text" name="productName" value={selectedProduct.productName} placeholder={selectedProduct.productName !== "" ? selectedProduct.productName : "Product Name"} />
                    <input type="text" name="productPrice" value={selectedProduct.productPrice} placeholder={selectedProduct.productPrice !== "" ? selectedProduct.productPrice : "Product Price"} />
                    <input type="text" name="Quantity" value={currentOrder.Quantity} placeholder="Quantity" onChange={handleChange} />

                    <button className={"sellingbutton"} name="addOrder" onClick={handleClick}>Add Order</button>
                </div>
            </div>

            <div>
                <div className={"orderList"}>
                    <h4>Current Orders</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order=>{
                                return (
                                    <tr key={order.orderID}>
                                        <td>{order.orderID}</td>
                                        <td>{order.productName}</td>
                                        <td>{order.Quantity}</td>
                                        <td>{order.amount}</td>
                                    </tr>
                                )})}
                        </tbody>
                    </table>

                    {orders.length > 0 ? <button className={"sellingbutton"} name="addBill" onClick={handleClick}>Add Bill</button> : <h5>Currently there is no order</h5>}
                </div>

                <div className={"billList"}>
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>ID</th>
                                <th>Seller</th>
                                <th>Date</th>
                                <th>TotalAmount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map(bill=>{
                                return (
                                    <tr key={bill.billID}>
                                        <td><input type="checkbox" name="bill" value={bill.billID} onChange={handleChange} /></td>
                                        <td>{bill.billID}</td>
                                        <td>{bill.sellerName}</td>
                                        <td>{bill.billDate}</td>
                                        <td>{bill.totalAmount}</td>
                                    </tr>
                                )})}
                        </tbody>
                    </table>

                    {bills.length > 0 ? <button className={"sellingbutton"} name="Deleteill" onClick={handleClick}>Delete Bill</button> :
                        <h5>Currently there is no bill</h5>}
                </div>
            </div>
        </div>
    )
}

export default Selling