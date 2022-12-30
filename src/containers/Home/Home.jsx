
import Container from 'react-bootstrap/Container';
import './Home.css'


function Home() {
    return(
        <Container className='homeWall'>
            <Container className='accountOnline'>
                <h3>Cuenta Online Sin Comisiones</h3>
            </Container>
            <Container className='sinBox'>
                <Container>
                    <h1>SIN</h1>
                </Container>
                <Container>
                    <h4>Comisiones<br></br>Condiciones<br></br>Deplazamientos<br></br>Papeleos</h4>
                </Container>
            </Container>
        </Container>
    )
}

export default Home;