
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../User/userSlice';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Account.css";
import axios from 'axios';
import { accountData } from '../acountSlice';
import LoanCard from "../../../components/LoanCard/LoanCard";

function Account() {
    const dataUser = useSelector(userData)
    const account = useSelector(accountData);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        if (!dataUser?.user) {
            navigate('/');
        } else {
            async function fetchLoans() {
                try {
                    const config = {
                        headers: { "Authorization": `Bearer ${dataUser.token}` }
                    }
                    await axios.get(`http://localhost:3001/loans/getLoans/${account._id}`, config)
                        .then(resp => {
                            setData(resp.data.data)
                        
                        })
                } catch (error) {
                    console.log(error)
                }
            }
            fetchLoans();
        }

    }, [account.balance]);

    const LoanList = () => {
        if (data.length > 0) {
            const loans = data.filter(loan => loan.quantity > 0);
            return (
                loans?.map((loan, index) => (
                    <Container key={index} className="listCard">
                        <LoanCard data={loan} />
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
            <Container fluid className="listContainer">
                <Card className="text-center">
                    <Card.Body className="accountCard">
                        <Card.Title>ID:</Card.Title>
                        <Card.Text>{account._id}</Card.Text>
                        <Card.Text><strong>Saldo: </strong>{account.balance}</Card.Text>
                        <Button variant="primary" className='moneyButton' as={Link} to="/loan" >Pedir prestamo</Button>
                        <Button variant="primary" className='moneyButton' as={Link} to="/cash" >Ingresar/Retirar dinero</Button>
                        <Button variant="primary" className='moneyButton' as={Link} to="/sendmoney" >Enviar dinero</Button>
                    </Card.Body>
                    <Card.Text>Préstamos asociados:</Card.Text>
                    <Container className='loanBox'>
                        <LoanList />
                    </Container>
                </Card>
            </Container>
        </Container>

    )
}

export default Account;