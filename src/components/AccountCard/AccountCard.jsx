
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import axios from 'axios';
import LoanCard from '../LoanCard/LoanCard';
import './AccountCard.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addAccount } from '../../containers/MoneyTrans/acountSlice';

const AccountCard = props => {

    const dispatch = useDispatch();
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchLoans() {
            try {
                axios.get(`http://localhost:3001/loans/getLoans/${props.data._id}`)
                    .then(resp => {
                        setData(resp.data.data)
                        // console.log(resp.data)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        fetchLoans()
        
    }, [])

    const LoanList = () => {
        if (data.length > 0) {
                return (

                    data?.map((loan, index) => (
                        
                        <Dropdown.Item key={index} className="listCard">
                            <LoanCard data={loan} className='loanBox' />
                        </Dropdown.Item>
                    ))

                )

        } else {
          
            return (
                <h3>No tienes préstamos asociados</h3>
            )
        }
    };

    return (
        <Container>
            <Card className="text-center">
                <Card.Body className="accountCard">
                    <Card.Title>Cuenta:</Card.Title>
                    <Card.Text>{props.data._id}</Card.Text>
                    <Card.Text><strong>Saldo: </strong>{props.data.balance}</Card.Text>
                    <Button variant="primary" className='moneyButton' as={Link} to="/loan" >Pedir prestamo</Button>
                    <Button variant="primary" className='moneyButton' >Ingresar dinero</Button>
                    <Button variant="primary" className='moneyButton' >Retirar dinero</Button>
                    <Button variant="primary" className='moneyButton' >Enviar dinero</Button>

                </Card.Body>
                        <h4>Préstamos asociados</h4>

                        <Container className='loanBox'>
                            <LoanList />
                        </Container>
            </Card>
        </Container>
    )
}

export default AccountCard