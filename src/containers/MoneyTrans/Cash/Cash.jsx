
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
    status: true,
    form: false,
    op: "",
    text: ""
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
    if (e.target.value == "cashout") {
      setUp({
        ...update,
        status: false,
        form: true,
        [e.target.name]: e.target.value,
        text: "retirar"
      })
    } else if (e.target.value == "depositmoney") {
      setUp({
        ...update,
        status: false,
        form: true,
        [e.target.name]: e.target.value,
        text: "ingresar"
      })
    }
   
  };

  const moneyOp = async (req, res) => {
    try {
      const newOp = await axios.put(`http://localhost:3001/accounts/${update.op}/${data.id}`, {
        quantity: data.quantity
      })
      return console.log(newOp), setTimeout(() => {
        navigate("/")
      }, 2000);
    } catch (error) {
      console.log(error)
    }

  }
  // const date = new Date()
  // if (update.status == false) {
  //   console.log(date)
  // }

  if (update.status == true) {
    return (
      <Container>
        <h5>¿Que operacion desea realizar?</h5>

        <Button variant="primary" name="op" value="cashout" onClick={showUp}>Retirar</Button>
        <Button variant="primary" name="op" value="depositmoney" onClick={showUp}>Ingresar</Button>

      </Container>
    )

  } else if (update.status == false) {
    return(
      <Container>
           <Form onSubmit={moneyOp}>
             <Form.Group className="mb-3">
               <Form.Label>¿Que cantidad desea {update.text}?</Form.Label>
               <Form.Control onChange={handleInput} name="quantity" type="number" min="1" placeholder="Introduce cantidad" />
             </Form.Group>

             <Button variant="primary" type="submit">
               Realizar operación
             </Button>
           </Form>
         </Container>
    )
  }
}

export default Cash;