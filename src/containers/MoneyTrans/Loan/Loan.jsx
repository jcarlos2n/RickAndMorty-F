
import { useEffect, useState } from 'react';
import { accountData } from '../acountSlice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userData } from '../../User/userSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import "./Loan.css"
import axios from 'axios';


function Loan() {

    const navigate = useNavigate();
    const account = useSelector(accountData);
  
    const [loan, setLoan] = useState({
        quantity: '',
        months: '',
        account_id: account._id
    });

    const handleInput = (event) => {
        setLoan({
            ...loan,
            [event.target.name]: event.target.value
        })
    }

    const createLoan = async (req, res) => {
        try {
            const newLoan = await axios.post("http://localhost:3001/loans/createLoan",{
            quantity: loan.quantity,
            months: loan.months,
            account_id: loan.account_id
        });
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <Container>
            <Form onSubmit={createLoan}>
                <Form.Group className="mb-3">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control onChange={handleInput} name="quantity" type="number" placeholder="Introduce cantidad deseada" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mensualidades</Form.Label>
                    <Form.Control onChange={handleInput} name="months" type="number" placeholder="Mensualidades" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Envíar
                </Button>
            </Form>
        </Container>
    )
}

export default Loan;