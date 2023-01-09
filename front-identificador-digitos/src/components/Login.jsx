import Form from "./Form";
import Header from "./Header"
import "./css/Login.css"
import React from 'react';


export default function Login() {
    return(
        <>            
            <Header />
            <div className = "container-log">
                <Form />
            </div>
        </>
    );
}