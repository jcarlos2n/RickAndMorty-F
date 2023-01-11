
import { useEffect, useState } from 'react';
import axios from "axios";
import { logout, userData } from '../userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Profile.css'
import { cleanAccount } from '../../MoneyTrans/acountSlice';
import { addNotice, cleanNotice } from '../noticeSlice';
import { noticeData } from '../noticeSlice';
import { accountData } from '../../MoneyTrans/acountSlice';
import NoticeCard from '../../../components/NoticeCard/NoticeCard';


function Profile() {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const dataUser = useSelector(userData);
    const [character, setData] = useState([])
    const account = useSelector(accountData);
    const [notifications, setNoti] = useState([])

    const getOut = () => {
        dispatch(logout());
        dispatch(cleanAccount());
        dispatch(cleanNotice())
        navigate("/")
    }

    useEffect(() => {

        if (!dataUser?.user) {
            navigate('/');
        } else {
            async function fetchUser() {
                try {
                    await axios.get(`https://rickandmortyapi.com/api/character/?name=${dataUser.user.name}`)
                        .then(resp => {
                            setData(resp.data.results[0])
                        })
                } catch (err) {
                    console.error(err)
                }
            }
            async function fetchNotices() {
                try {
                    await axios.get(`http://localhost:3001/notices/getnotices/${account._id}`)
                        .then(resp => {
                            setNoti(resp.data.data)
                            dispatch(addNotice(resp.data))
                        })
                } catch (err) {
                    console.error(err)
                }
            }
            fetchUser()
            fetchNotices()
        }

    }, [notifications.length]);

    const NotificationsList = () => {
       
        // return(
        //     <NoticeCard />
        // )
        
        if (notifications.length > 0) {
            return (
                <Container className="noticeCard">
                    {
                        notifications?.map((add, index) => (
                            <NoticeCard key={index} data={add} />
                        ))
                    }
                </Container>
            )
        } else {
            return (
                <div></div>
            )
        }
    };

    if (character == "") {
        return (
            <div><h1>No hay datos</h1></div>
        )
    } else {
        return (
            <Container className='profileWall'>
                <Container className='profileData'>
                    <Card className="text-center cardBox">
                        <Card.Img className='imageBox' variant="top" src={character.image} />
                        <Card.Body >
                            <Card.Title>{character.name}</Card.Title>
                            <Container className='cardBody'>
                                <Card.Text className='dataLine'><strong>Sexo: </strong>{character.gender}</Card.Text>
                                <Card.Text className='dataLine'><strong>Origen: </strong>{character.origin.name}</Card.Text>
                                <Card.Text className='dataLine'><strong>Especie: </strong>{character.species}</Card.Text>
                                <Card.Text className='dataLine'><strong>Estado: </strong>{character.status}</Card.Text>
                            </Container>
                            <Button variant="primary" onClick={getOut}>Log Out</Button>

                        </Card.Body>
                    </Card>
                </Container>

                <NotificationsList />
             
            </Container>
        )
    }

}

export default Profile;