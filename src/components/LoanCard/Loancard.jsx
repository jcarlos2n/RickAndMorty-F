import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import axios from 'axios';
import './LoanCard.css'


const LoanCard = props => {
    // console.log("soy props de loan", props);

    // const[data, setData] = useState({});

    // useEffect(() => {
    //     async function fetchLoans(){
    //         try {
    //             axios.get(`http://localhost:3001/loans/getLoans/${props.data._id}`)
    //             .then(resp => {
    //                 setData(resp.data.data)
    //                 // console.log(resp.data)
    //             })
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchLoans()
    // },[])

    // const LoanList = () => {
    //     if (data.length > 0) {
    //         console.log("aqui si", data)
    //         return(
    //             <h1>HAy</h1>
    //         )
    //     }else{
    //         // console.log("aqui no", data)
    //         return(
    //             <h1>no hay</h1>
    //         )
    //     }
    // }

    return (
        <Container className='loanCard'>
            <Card style={{ width: '19rem' }}>
                <Card.Body>
                    <Card.Title>Préstamo:</Card.Title>
                    <Card.Text>{props.data._id}</Card.Text>
                    <Card.Text><strong>Cantidad: </strong>{props.data.quantity}</Card.Text>
                    {/* <Card.Text><strong>Saldo: </strong>{props.data.balance}</Card.Text>
                    <Card.Text><strong>Saldo: </strong>{props.data.balance}</Card.Text> */}
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
        </Container>
    )
}

export default LoanCard