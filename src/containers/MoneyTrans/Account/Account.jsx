
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../User/userSlice';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Account.css"
import { accountData } from '../acountSlice';

function Account() {
    
    const account = useSelector(accountData);
    
    console.log(account._id)

    // useEffect(() => {
    //     if (!dataUser?.user) {
    //         navigate('/');
    //     }
    // },[]);

    // const AccountList = () => {
    //     if (accounts.length > 0) {
    //         return(
    //             accounts?.map((account, index)=>(
    //                 <div key={index}>
    //                     <AccountCard data={account}/>
    //                 </div>
    //             ))
    //         )
    //     }else{
    //         return(
    //             <Container>
    //                 <h1>No tienes cuenta, creese una cuenta</h1>
    //             </Container>
    //         )
    //     }
    // }
    return(
        <Container fluid className='accountWall'>
            <h1>Cuenta/s</h1>

            <Container fluid className="listContainer">
            <Card className="text-center">
                <Card.Body className="accountCard">
                    <Card.Title>Cuenta:</Card.Title>
                    <Card.Text>{account._id}</Card.Text>
                    <Card.Text><strong>Saldo: </strong>{account.balance}</Card.Text>
                    <Button variant="primary" className='moneyButton' as={Link} to="/loan" >Pedir prestamo</Button>
                    <Button variant="primary" className='moneyButton' >Ingresar dinero</Button>
                    <Button variant="primary" className='moneyButton' >Retirar dinero</Button>
                    <Button variant="primary" className='moneyButton' >Enviar dinero</Button> 

                </Card.Body>
            </Card>
            </Container>
                
        
            
        </Container>

    )
}

export default Account;