
import { useEffect, useState } from 'react';
import { accountData } from '../acountSlice';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../User/userSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import "./SendMoney.css";
import axios from 'axios';
import UserCard from '../../../components/Usercard/UserCard';
import { addAccount } from '../acountSlice';


function SendMoney() {
    const dataUser = useSelector(userData);
    const navigate = useNavigate();
    const account = useSelector(accountData);
    const [users, setUsers] = useState([]);
    const friends = users.filter(user => user.name !== dataUser.user.name);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataUser?.user) {
            navigate('/');
        } else {
            async function fetchUsers() {
                try {
                    const config = {
                        headers: { "Authorization": `Bearer ${dataUser.token}` }
                    }
                    await axios.get(`http://localhost:3001/users/`, config)
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

    const friend = users.filter(user => user._id == data.user_id);
    const friendName = friend[0];

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
                        <Button variant="primary" name='user_id' value={user._id} onClick={handleInput}>Seleccionar</Button>
                    </Container>
                ))
            )
        }
    }

    const sendMoney = async (req, res) => {
        try {
            const config = {
                headers: { "Authorization": `Bearer ${dataUser.token}` }
            }
            const newSend = await axios.put(`http://localhost:3001/accounts/sendmoney/${account._id}`, {
                quantity: data.quantity,
                user_id: data.user_id
            }, config)
            return console.log(newSend), dispatch(addAccount(newSend.data.account)), setTimeout(() => {
                navigate("/account")
            }, 400);
        } catch (error) {
            console.log(error)
        }

    }

    if (friend == '') {
       
        return (
            <Container className='sendMoneyWall'>
                Selecciona a que amigo le quieres enviar dinero
                <Container className='userList'>
                    <UserList />
                </Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control onChange={handleInput} name="quantity" type="number" placeholder="Introduce cantidad" />
                    </Form.Group>

                    <Button variant="primary" onClick={sendMoney}>
                        Envíar
                    </Button>
                </Form>

            </Container>
        )

    } else {
        return (
            <Container className='sendMoneyWall'>
                Selecciona a que amigo le quieres enviar dinero
                <Container className='userList'>
                    <UserList />
                </Container>
                <h4>El dinero se enviara a {friendName.name}</h4>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control onChange={handleInput} name="quantity" type="number" placeholder="Introduce cantidad" />
                    </Form.Group>

                    <Button variant="primary" onClick={sendMoney}>
                        Envíar
                    </Button>
                </Form>

            </Container>
        )
    }



}

export default SendMoney;