
import { useEffect, useState } from 'react';
import axios from "axios";
import { logout, userData } from '../userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Profile.css'
import { cleanAccount } from '../../MoneyTrans/acountSlice';
import { cleanNotice } from '../noticeSlice';
import Container from 'react-bootstrap/Container';
import { noticeData } from '../noticeSlice';
import NotificationCard from '../../../components/NotificationCard/NotificationCard';


function Profile() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const dataUser = useSelector(userData);
    const [character, setData] = useState([])
    const notice = useSelector(noticeData)

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
            fetchUser()

        }

    }, []);

    const NoticeList = () => {
        if (notice.data.length > 0) {
            return (
                notice?.data.map((noti, index) => (
                    <Container key={index} className="noticeCard">
                        <NotificationCard data={noti} />
                    </Container>
                ))
            )

        } else {
            return (
                <h3>No tienes préstamos asociados</h3>
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
                <Container className='notificationBox'>
                    <NoticeList />
                </Container>

            </Container>

        )
    }

}

export default Profile;