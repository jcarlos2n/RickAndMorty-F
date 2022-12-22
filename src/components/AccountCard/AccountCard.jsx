
import Container from 'react-bootstrap/Container';
import "./AccountCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AccountCard = props => {
    console.log("soy props", props)
    return (
        <Container>
            <Card style={{ width: '18rem' }} className='cardBox'>
                <Card.Body>
                    <Card.Title>Cuenta</Card.Title>
                    <Card.Text>{props.data._id}</Card.Text>
                    <Card.Text><strong>Saldo: </strong>{props.data.balance}</Card.Text>
                    {/* <Card.Text>{props.data._id}</Card.Text> */}
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AccountCard