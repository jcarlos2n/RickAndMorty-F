
import { useEffect, useState } from 'react';
import { accountData } from '../acountSlice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userData } from '../../User/userSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import "./Cash.css"
import axios from 'axios';


function Cash() {
    const dataUser = useSelector(userData);
    const navigate = useNavigate();
    const account = useSelector(accountData);

    useEffect(() => {
        if (!dataUser?.user) {
            navigate('/');
        }
    }, [])
  
   

    return (
        
      <h5>Web en construcción</h5>
    )
}

export default Cash;