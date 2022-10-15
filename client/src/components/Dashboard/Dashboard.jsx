import React from 'react';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../store/slices/userSlice';
import './dashboard.css'

const Dashboard = () => {
    const userState = useSelector(state => state.user);
    const {user} = userState;
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logounHandler = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className='home__container'>
            <h1>{`Welcome ${user.name} as ${user.issecretary? 'Secretary' : 'Patient'}`} </h1>
            <button className='logout__btn' onClick={logounHandler}>Logout</button>
        </div>
    )
}

export default Dashboard;