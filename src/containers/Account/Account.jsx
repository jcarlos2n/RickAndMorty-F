
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userData } from '../User/userSlice';

import Container from 'react-bootstrap/Container';
import "./Account.css"
import axios from 'axios';

function Account() {
    const navigate = useNavigate();
    const dataUser = useSelector(userData);
    let [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (!dataUser?.user) {
            navigate('/');
        }else{
            // console.log(dataUser.user._id)
            async function fetchAccounts(){
                await axios.get(`http://localhost:3001/accounts/getAccounts/${dataUser.user._id}`)
                .then(resp => {
                    console.log(resp.data)
                    setAccounts(resp.data)
                })
            }

            fetchAccounts()
        }
    },[]);

    const AccountList = () => {
        if (accounts.length > 0) {
            return(
                accounts?.map((account, index)=>(
                    <Container key={index}>
                        
                    </Container>
                ))
            )
        }else{
            return(
                <Container>
                    <h1>No tienes cuenta, creese una cuenta</h1>
                </Container>
            )
        }
    }
    return(
        <Container fluid className='accountWall'>
            <h1>Cuenta</h1>
        </Container>

    )
}

export default Account;