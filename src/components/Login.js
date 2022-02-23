import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Login=()=>{
    const[email, setEmail]= useState("");
    const[password, setPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    },[])

    const handleLogin = async()=>{
        console.log("email, password", email, password);

        let result = await fetch('http://localhost:7000/login',{
            method: 'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'

            }

        });
        result = await result.json();
        console.log(result)
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/")
            
            }else{
                alert("please enter correct details")
        }
    }
    
    return(
        <div className='login'>
            <input type = "text" className='InputBox' placeholder="Enter Email"
            onChange={(e)=>setEmail(e.target.value)} value={email}/>
            
            <input type ="password" className='InputBox' placeholder="Enter password"
            onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={handleLogin} className = "appButton" type="button">Login</button>
        </div>
    )
}

export default Login;