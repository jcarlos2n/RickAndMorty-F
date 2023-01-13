
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './NoticeCard.css';

const NoticeCard = props => {

    const viewNot = async (req, res) => {
        try {

            const view = await axios.put(`http://localhost:3001/notices/noticeview/${props.data._id}`)
            return console.log(view);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className='noticeCard'>
            <Card className='noticeBody'>
                <Card.Body >
                    <Card.Text><strong>Concepto: </strong><br></br>{props.data.concept}</Card.Text>
                    <Card.Text><strong>Fecha: </strong><br></br>{props.data.date}</Card.Text>
                    <Card.Text><strong>Cantidad: </strong><br></br>{props.data.quantity}</Card.Text>
                    <Button variant="primary" onClick={viewNot}>Marcar como leído</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default NoticeCard