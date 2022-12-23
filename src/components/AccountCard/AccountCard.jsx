
import Container from 'react-bootstrap/Container';
import "./AccountCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import axios from 'axios';


const AccountCard = props => {
    // console.log("soy props", props);

    const[data, setData] = useState({});

    useEffect(() => {
        async function fetchLoans(){
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
    },[])

    const LoanList = () => {
        if (data.length > 0) {
            // console.log("aqui si", data)
            return(
                <h1>HAy</h1>
            )
        }else{
            // console.log("aqui no", data)
            return(
                <h1>no hay</h1>
            )
        }
    }

    return (
        <Container>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Cuenta:</Card.Title>
                    <Card.Text>{props.data._id}</Card.Text>
                    <Card.Text><strong>Saldo: </strong>{props.data.balance}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Container>
                    <LoanList/>
                </Container>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
        </Container>
    )
}

export default AccountCard