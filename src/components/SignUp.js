import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';

const SignUp=()=>{
         const[name,setName]= useState("");
         const[password, setPassword] = useState("");
         const[email,setEmail] = useState("");
         const navigate = useNavigate();

         useEffect(()=>{
             const auth = localStorage.getItem('user');
             if(auth)
             {
                 navigate('/')
             }
         })

         const collectData= async()=>{
             console.log(name,password,email);
             let result = await fetch('http://localhost:7000/register',{
                 method: 'post',
                 body: JSON.stringify({name,email,password}),
                 headers:{
                     'Content-Type':'application/json'
                 },

            });

            result = await result.json()
            console.log(result);
            //if(result){
                localStorage.setItem("user", JSON.stringify(result));

                navigate('/')
            //}
   
         }

    return(
        <div className="register">
            <h3>Sign-Up Page</h3>
            <input className = "InputBox" type="text" 
            value={name} onChange={(e)=>setName(e.target.value)} placeholder ="Enter Name"/>

            <input className = "InputBox"  type ="email" 
            value ={email} onChange={(e)=>setEmail(e.target.value)}placeholder = "Enter Email"/>

            <input className = "InputBox"  type ="password"
             value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Pasword"/>
           <button onClick={collectData} className="appButton" type ="button">Sign Up</button>
        </div>

    )
}

export default SignUp;