
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

const Notification = () => {

    const dispatch = useDispatch();
    const account = useSelector(accountData);
    const notice = useSelector(noticeData);
    const dataUser = useSelector(userData);

    useEffect(() => {

        async function fetchNotices() {
            try {
                await axios.get(`http://localhost:3001/notices/getnotices/${account._id}`)
                    .then(resp => {
                        dispatch(addNotice(resp.data))
                    })
            } catch (error) {
                console.log(error)
            }
        }
        fetchNotices()

    }, [notice.data])

    if (notice.data.length > 0) {
        return (
            <Container className="noticeWall">

                <img src={bell} alt="notification" className="image" />
                <p className="noticeNumber">+{notice.data.length}</p>

            </Container>
        )

    } else {
        <Container></Container>

    }
}

export default Notification;