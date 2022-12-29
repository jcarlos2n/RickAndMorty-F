
import React, { useEffect, useState } from "react";
import { loginUser, userData } from "../userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Login.css"

function Login() {

    const [credentials, setCredentials] = useState({email: "", password: ""});

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const loginData = useSelector(userData)

    const updateCredentials = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (loginData?.token !== '') {
            navigate('/login')
        }
    },[])

    const login = (e) => {
        e.preventDefault()

        dispatch(loginUser({
            email: credentials.email,
            password: credentials.password
        }));
        setTimeout(() => {
            navigate('/')
        },1000)
    };


    return (
        <Container className='loginWall'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={updateCredentials} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={updateCredentials} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={login}>
                    Submit
                </Button>
            </Form>
        </Container>

    )
}

export default Login;