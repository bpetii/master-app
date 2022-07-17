import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './dashboard.css'

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");

    const getProfile = async () => {
        try {
            const res = await fetch("http://localhost:4000/dashboard", {
                method: "GET",
                credentials: "include",
                headers: {
                  token: localStorage.getItem("token")
                },
            })
            const parsedRes = await res.json();
            setName(parsedRes.username)
        } catch (error) {
            console.error(error);
        }
    }
    
    const logout = () => {
        try {
            localStorage.removeItem("token");
            setName("")
            setAuth(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getProfile();
    })

    return (
        <div className='home__container'>
            <h1>{`Welcome ${name}!`} </h1>
            <button className='logout__btn' onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;