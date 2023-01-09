import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './NotificationCard.css';
import { addAccount } from "../../containers/MoneyTrans/acountSlice";
import { useDispatch } from 'react-redux';





const NotificationCard = props => {
    // console.log(props)
    //  const dispatch = useDispatch();

    // const payQuote = async (req, res) => {
    //     try {
    //         const quote = await axios.put(`http://localhost:3001/loans/payQuote/${props.data._id}`)
    //         return console.log(quote.data), dispatch(addAccount(quote.data.account));
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    return (
        <Container className='noticeCard'>
            <Card>
                <Card.Body className='noticeBody'>
                    <Card.Title>Notificación:</Card.Title>
                    <Card.Text><strong>Cuenta: </strong>{props.data._id}</Card.Text>
                    <Card.Text><strong>Concepto: </strong>{props.data.concept}</Card.Text>
                    <Card.Text><strong>Fecha: </strong>{props.data.date}</Card.Text>
                    <Card.Text><strong>Cantidad: </strong>{props.data.quantity}</Card.Text>
                    {/* <Button variant="primary" onClick={payQuote}>Pagar cuota</Button> */}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default NotificationCard