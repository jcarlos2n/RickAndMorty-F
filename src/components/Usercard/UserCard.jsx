import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './UserCard.css'

const UserCard = props => {

    return (
        <Container className='userCard'>
            <Card className='userCardBody'>
                <Card.Body >
                    <Card.Title>Nombre:</Card.Title>
                    <Card.Text>{props.data.name}</Card.Text>                   
                </Card.Body>
            </Card>
        </Container>
    )
}

export default UserCard