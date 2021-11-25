import { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Nav, Navbar, Container, Button, Row, Col, NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './nav.css'

const TopNav = ({ location }) => {
  const [homebtn, sethomebtn] = useState(true);
  const [gallerybtn, setgallerybtn] = useState(false);
  const [artbtn, setartbtn] = useState(false);
  const [learnbtn, setlearnbtn] = useState(false);

  // const [path, setPath] = useState('/')


  const homebtnselected = () => {
    sethomebtn(true)
    setgallerybtn(false)
    setartbtn(false)
    setlearnbtn(false)
  }
  
  console.log(location.pathname)

  // const updatePath = () => {
  //   setPath(location.pathname)
  // }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" className='py-3 dark-bg navbar' fixed="top">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand onClick={() => { homebtnselected(); }} className='primary-text nav-brand '>Project Noise</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div style={{ width: '100%' }}>
            <Navbar.Collapse id="responsive-navbar-nav">
              
              <Nav className='ms-auto'>
                {location.pathname === '/mint' ?
                  <Button variant='secondary' className='ml-4 mr-2 btn-outline' id='wallet-btn'>Connect Wallet</Button>
                  :
                  location.pathname === '/whitelist-checker' ? <Nav />
                    :
                    <Row>
                      <Col className='dummyNavCol'></Col>
                      <Col >
                        <Nav.Link href='https://twitter.com/Prjctnoise' className='social-media-twitter'><div className='twitter' ></div></Nav.Link>
                      </Col>

                      <Col >
                        <Nav.Link href='https://discord.gg/2AXCqUWX5J' className='social-media-discord'><div className='discord' ></div></Nav.Link>
                      </Col>
                    </Row>
                }
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  )

}

export default withRouter(TopNav)
