import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    textAlign: 'left',
  }

  const navStyle = {
    paddingLeft: 10,
  }

  return (
    <Navbar bg='dark' expand='lg' variant='dark'>
      <Nav style={navStyle}>
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
