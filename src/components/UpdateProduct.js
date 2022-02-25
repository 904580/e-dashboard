import React, { useEffect, useState } from "react";
import {useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        getProductDetails();
    }, [])


    const getProductDetails = async () => {
        console.log(params)
        let result = await fetch(`http://localhost:7000/product/${params.id}`);
        result = await result.json();
        //console.log(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

    }




    const UpdateProduct = async () => {
        console.log(name, price, category, company)
        let result = await fetch(`http://localhost:7000/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json"
            }
        });

        result = await result.json();
        console.log(result)
        navigate('/')


    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter Product Name" className="InputBox"
                value={name} onChange={(e) => { setName(e.target.value) }} />


            <input type="text" placeholder="Enter Product Price" className="InputBox"
                value={price} onChange={(e) => { setPrice(e.target.value) }} />


            <input type="text" placeholder="Enter Product Category" className="InputBox"
                value={category} onChange={(e) => { setCategory(e.target.value) }} />


            <input type="text" placeholder="Enter Company Name" className="InputBox"
                value={company} onChange={(e) => { setCompany(e.target.value) }} />


            <button onClick={UpdateProduct} className="appButton">Update Product</button>
        </div>

    )
}

export default UpdateProduct;