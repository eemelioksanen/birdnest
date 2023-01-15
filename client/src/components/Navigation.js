import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    textAlign: 'left',
  }

  return (
    <Navbar bg='dark' expand='lg' variant='dark'>
      <Nav style={{ paddingLeft: 10 }}>
        <Navbar.Collapse id='nav'>
          <Nav.Link
            style={linkStyle}
            href='https://github.com/eemelioksanen/birdnest'
            target='_blank'
            rel='noreferrer'
          >
            view source on GitHub
          </Nav.Link>
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  )
}

export default Navigation
