
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userData } from '../../User/userSlice';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Account.css"
import axios from 'axios';
import { accountData } from '../acountSlice';
import LoanCard from "../../../components/LoanCard/LoanCard";

function Account() {
    const dataUser = useSelector(userData)
    const account = useSelector(accountData);
    const [data, setData] = useState({});
    const [accountInfo, setInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!dataUser?.user) {
            navigate('/');
        } else {
            async function fetchAccount(){
                try {
                    axios.get(`http://localhost:3001/accounts/getaccount/${account._id}`)
                    .then(resp => {
                        setInfo(resp.data.data)
                    })
                } catch (error) {
                    
                }
            }
            
            async function fetchLoans() {
                try {
                    
                    axios.get(`http://localhost:3001/loans/getLoans/${account._id}`)
                        .then(resp => {
                            setData(resp.data.data)
                        })
                } catch (error) {
                    console.log(error)
                }
            }
            fetchAccount();
            fetchLoans();
            
        }
    }, []);

    const LoanList = () => {
        if (data.length > 0) {
            return (

                data?.map((loan, index) => (

                    <Container key={index} className="listCard">
                        <LoanCard data={loan} className='loanBox' />
                    </Container>
                ))

            )

        } else {
            return (
                <h3>No tienes préstamos asociados</h3>
            )
        }
    };

    return (
        <Container fluid className='accountWall'>
            <h1>Cuenta/s</h1>

            <Container fluid className="listContainer">
                <Card className="text-center">
                    <Card.Body className="accountCard">
                        <Card.Title>Cuenta:</Card.Title>
                        <Card.Text>{account._id}</Card.Text>
                        <Card.Text><strong>Saldo: </strong>{accountInfo.balance}</Card.Text>
                        <Button variant="primary" className='moneyButton' as={Link} to="/loan" >Pedir prestamo</Button>
                        <Button variant="primary" className='moneyButton' >Ingresar dinero</Button>
                        <Button variant="primary" className='moneyButton' >Retirar dinero</Button>
                        <Button variant="primary" className='moneyButton' as={Link} to="/sendmoney" >Enviar dinero</Button>

                    </Card.Body>
                    <Container className='loanBox'>
                        <LoanList />
                    </Container>
                </Card>
            </Container>



        </Container>

    )
}

export default Account;