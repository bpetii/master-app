import React from 'react';
import { useState } from 'react';
import './dashboard.css'

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");


    return (
        <div className='home__container'>
            <h1>{`Welcome ${name}!`} </h1>
            <button className='logout__btn' onClick={() => {}}>Logout</button>
        </div>
    )
}

export default Dashboard;