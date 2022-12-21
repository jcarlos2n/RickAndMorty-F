
import { useEffect, useState } from 'react';
import axios from "axios";
import { logout, userData } from '../userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';




function Profile() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const dataUser = useSelector(userData);
    const [character, setData] = useState([])

    const getOut = () => {
        dispatch(logout());
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
                            // console.log(resp.data)
                            setData(resp.data.results[0])
                        })
                } catch (err) {
                    console.error(err)
                }

            }
            fetchUser()

        }

    }, [])

    if (character != "") {
        console.log(character)
    }

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={character.image} />
                <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary" onClick={getOut}>Log Out</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Profile;