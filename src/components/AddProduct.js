import React, { useState } from "react";

const AddProduct =()=>{
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[category, setCategory] = useState('');
    const[company, setCompany]= useState('');
    const[error, setError] = useState('');

    const AddProduct = async ()=>{
        console.log(!name);
        if(!name || !price || !category || !company)
        {
            setError(true)
            return false;
        }
       
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await  fetch('http://localhost:7000/add-product',{
            method: 'post',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json'

            }
        });
        result = await result.json();
        console.log(result)
    }




    return(
        <div className ="product">
            <h1>Add Product</h1>
            <input type= "text" placeholder ="Enter Product Name" className = "InputBox"
            value={name} onChange={(e)=>{setName(e.target.value)}}/>
            {error && !name && <span className ='invalid-input'>Enter valid name</span>}

            <input type= "text" placeholder ="Enter Product Price" className = "InputBox"
            value= {price} onChange={(e)=>{setPrice(e.target.value)}}/>
            {error && !price && <span className ='invalid-input'>Enter valid price</span>}

            <input type= "text" placeholder ="Enter Product Category" className = "InputBox"
            value= {category} onChange={(e)=>{setCategory(e.target.value)}}/>
            {error && !category && <span className ='invalid-input'>Enter valid category</span>}

            <input type= "text" placeholder ="Enter Company Name" className = "InputBox"
            value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            {error && !company && <span className ='invalid-input'>Enter valid company</span>}

            <button onClick={AddProduct} className="appButton">Add Product</button>
        </div>

    )
}

export default AddProduct;