
import { useEffect, useState } from 'react';
import { accountData } from '../acountSlice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userData } from '../../User/userSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import "./Cash.css"
import axios from 'axios';


function Cash() {
  const dataUser = useSelector(userData);
  const navigate = useNavigate();
  const account = useSelector(accountData);

  useEffect(() => {
    if (!dataUser?.user) {
      navigate('/');
    }
  }, [])

  const [update, setUp] = useState({
    details: false,
    op: ""
  });

  const [data, setData] = useState({
    quantity: '',
    id: account._id
  });

  const handleInput = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  };

  const showUp = (e) => {
    setUp({
      ...update,
      details: true,
      [e.target.name]: e.target.value
    })
  };

  // const moneyOp = async (req, res) => {
  //   try {
  //     const newSend = await axios.put(`http://localhost:3001/accounts/${update.op}/${data.id}`, {
  //       quantity: data.quantity
  //     })
  //     return console.log(newSend), setTimeout(() => {
  //       navigate("/")
  //     }, 200);
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  const OperationForm = (e) => {
   
    if (update.op === "cashout") {
      return (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>¿Que cantidad desea retirar?</Form.Label>
            <Form.Control onChange={handleInput}  name="quantity" type="number" placeholder="Introduce cantidad" />
          </Form.Group>

          <Button variant="primary" type="submit">
          Realizar operación
          </Button>
        </Form>
      )
    } else if (update.op === "depositmoney") {
      return (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>¿Que cantidad desea ingresar?</Form.Label>
            <Form.Control onChange={handleInput}  name="quantity" type="number" min="1" max={account.balance} placeholder="Introduce cantidad" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Realizar operación
          </Button>
        </Form>
      )
    }
  }

  if (data.quantity != '') {
    console.log(data)
  }

  return (

    <Container>
      <h5>¿Que operacion desea realizar?</h5>

      <Button variant="primary" name="op" value="cashout" onClick={showUp}>Retirar</Button>
      <Button variant="primary" name="op" value="depositmoney" onClick={showUp}>Ingresar</Button>

      <OperationForm />

    </Container>
  )
}

export default Cash;