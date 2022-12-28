
import { useEffect, useState } from 'react';
import axios from "axios";
import { logout, userData } from '../userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Profile.css'
import { cleanAccount } from '../../MoneyTrans/acountSlice';




function Profile() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const dataUser = useSelector(userData);
    const [character, setData] = useState([])

    const getOut = () => {
        dispatch(logout());
        dispatch(cleanAccount());
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

    }, [])

    if (character == "") {
        return(
            <div><h1>No hay datos</h1></div>
        )
    }else{
        return (
       
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={character.image} />
                    <Card.Body>
                        <Card.Title>{character.name}</Card.Title>
                        <Card.Text><strong>Sexo: </strong>{character.gender}</Card.Text>
                        <Card.Text><strong>Origen: </strong>{character.origin.name}</Card.Text>
                        <Card.Text><strong>Especie: </strong>{character.species}</Card.Text>
                        <Card.Text><strong>Estado: </strong>{character.status}</Card.Text>
                        <Button variant="primary" onClick={getOut}>Log Out</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
   
}

export default Profile;