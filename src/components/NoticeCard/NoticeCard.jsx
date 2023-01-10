
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import axios from 'axios';
import './NoticeCard.css';
// import { addAccount } from "../../containers/MoneyTrans/acountSlice";
// import { useDispatch } from 'react-redux';
// import { useState } from 'react';

const NoticeCard = props => {
    // console.log(props)
    //  const dispatch = useDispatch();

    // const viewNotice = async (req, res) => {
    //         console.log("entro")
    //     // try {

    //     //     const view = await axios.put(`http://localhost:3001/notices/noticeview/${props.data._id}`)
    //     //     return console.log(view);
    //     // } catch (error) {
    //     //     console.log(error)
    //     // }
    // }

    const viewNotice = () => {
        console.log("entro")
    }


    return (
        <Container>
            <Card>
                <Card.Body >
                    <Card.Title>Notificación:</Card.Title>
                    <Card.Text><strong>Cuenta: </strong>{props.data._id}</Card.Text>
                    <Card.Text><strong>Concepto: </strong>{props.data.concept}</Card.Text>
                    <Card.Text><strong>Fecha: </strong>{props.data.date}</Card.Text>
                    <Card.Text><strong>Cantidad: </strong>{props.data.quantity}</Card.Text>
                    <Button variant="primary" onClick={viewNotice}>Visto</Button>
                </Card.Body>
            </Card>
        </Container>


    )
}

export default NoticeCard