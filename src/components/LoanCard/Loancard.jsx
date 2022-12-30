import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './LoanCard.css'



const LoanCard = props => {
    
    const payQuote = async (req, res) => {
        try {
            const quote = await axios.put(`http://localhost:3001/loans/payQuote/${props.data._id}`)
            return console.log(quote.data);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container className='loanCard'>
            <Card>
                <Card.Body className='loanBody'>
                    <Card.Title>Préstamo:</Card.Title>
                    <Card.Text>{props.data._id}</Card.Text>
                    <Card.Text><strong>Cantidad: </strong>{props.data.quantity}</Card.Text>
                    <Card.Text><strong>Meses: </strong>{props.data.months}</Card.Text>
                    <Card.Text><strong>Cuota: </strong>{props.data.quota}</Card.Text>
                    <Button variant="primary" onClick={payQuote}>Pagar cuota</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default LoanCard