
import { noticeData } from "../../containers/User/noticeSlice";
import './Notification.css'
import { useEffect, useState } from "react";
import { accountData } from '../../containers/MoneyTrans/acountSlice';
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../containers/User/userSlice";
import axios from 'axios';
import { addNotice } from "../../containers/User/noticeSlice";
import bell from "../../assets/bell.png"
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";


const Notification = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const account = useSelector(accountData);
    const notice = useSelector(noticeData);
    const dataUser = useSelector(userData);

    useEffect(() => {

        async function fetchNotices() {
            try {
                const config = {
                    headers: { "Authorization": `Bearer ${dataUser.token}` }
                }
                await axios.get(`http://localhost:3001/notices/getnotices/${account._id}`, config)
                    .then(resp => {
                        dispatch(addNotice(resp.data))
                    })
            } catch (error) {
                console.log(error)
            }
        }
        fetchNotices()

    })

    if (notice.success == true) {
        if (notice.data.length > 0) {
            return (
                <Container className="noticeWall" onClick={() => {navigate('./profile')}}>
    
                    <img src={bell} alt="notification" className="image" />
                    <p className="noticeNumber">+{notice.data.length}</p>
    
                </Container>
            )
        }

    } else {
        <Container></Container>
    }
}

export default Notification;