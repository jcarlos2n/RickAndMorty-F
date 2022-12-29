
import { useEffect, useState } from 'react';
import { accountData } from '../acountSlice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userData } from '../../User/userSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import "./SendMoney.css";
import axios from 'axios';
import UserCard from '../../../components/Usercard/UserCard';


function SendMoney() {
    const dataUser = useSelector(userData);
    const navigate = useNavigate();
    const account = useSelector(accountData);
    const [users, setUsers] = useState([]);
    const friends = users.filter(user => user.name !== dataUser.user.name);

    useEffect(() => {
        if (!dataUser?.user) {
            navigate('/');
        } else {
            async function fetchUsers() {
                try {
                    await axios.get(`http://localhost:3001/users/`)
                        .then(resp => {
                            setUsers(resp.data.data);
                        })
                } catch (error) {
                    console.log(error)
                }
            }
            fetchUsers()
        }
    }, [])

    const [data, setData] = useState({
        quantity: '',
        user_id: ''
    });

    const handleInput = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const UserList = () => {
        if (friends.length > 0) {
            return (
                friends?.map((user, index) => (

                    <Container key={index} className="userTarget">
                        <UserCard data={user} />
                        <Button variant="primary" name='user_id' value={user._id} onClick={handleInput}>Info</Button>
                    </Container>
                ))
            )
        }
    }

    const sendMoney = async (req, res) => {
        try {
            const newSend = await axios.put(`http://localhost:3001/accounts/sendmoney/${account._id}`, {
                quantity: data.quantity,
                user_id: data.user_id
            })
            return console.log("hecho"), setTimeout(() => {
                navigate("/")
            }, 200);
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Container className='sendMoneyWall'>
            Selecciona a que amigo le quieres enviar dinero
            <Container>
                <UserList />
            </Container>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control onChange={handleInput} name="quantity" type="number" placeholder="Introduce cantidad" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={sendMoney}>
                    Envíar
                </Button>
            </Form>

        </Container>
    )

}

export default SendMoney;