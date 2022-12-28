
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import axios from 'axios';
import LoanCard from '../LoanCard/Loancard';
import './AccountCard.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton';

import ButtonGroup from 'react-bootstrap/ButtonGroup';






const AccountCard = props => {
    // console.log("soy props", props);

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
            // console.log("aqui si", data.length)
            if (data.length > 0) {
                return (

                    data?.map((loan, index) => (
                        // <Container key={index} className="listCard">
                        //     <LoanCard data={loan} className='loanBox' />
                        // </Container>
                        <Dropdown.Item key={index} className="listCard">
                            <LoanCard data={loan} className='loanBox' />
                        </Dropdown.Item>
                    ))

                )
            }

        } else {
            // console.log("aqui no", data)
            return (
                <h1>no hay</h1>
            )
        }
    }

    return (
        <Container className="accountCard">
            <Card className="text-center accountCard">
                <Card.Body>
                    <Card.Title>Cuenta:</Card.Title>
                    <Card.Text>{props.data._id}</Card.Text>
                    <Card.Text><strong>Saldo: </strong>{props.data.balance}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                {/* <Container className='loanBox'>
                    <LoanList />
                </Container> */}
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Container className='loanBox'>
                            <LoanList />
                        </Container>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
        </Container>
    )
}

export default AccountCard