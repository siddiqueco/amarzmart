import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userAction'


const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart



  const logoutHandler = () => [
    dispatch(logout())
  ]
  return (
    <header >
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect className='fixed-top' style={{ marginBottom: '20px' }}>
        <Container>
          <LinkContainer to='/' style={{ fontSize: '1.5rem' }} >
            <Navbar.Brand >Amarshop<i className='fab fa-typo3 header-brand-icon' /></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
                <Nav.Link className='text-sm'>
                  <span className='header-cart-icon'>
                    <i className="fas fa-shopping-cart text-sm"></i>

                  </span>
                  <span className='badge header-cart-icon-value'>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username' className='text-sm'>

                  <LinkContainer to='/account'>
                    <NavDropdown.Item>My Account</NavDropdown.Item>
                  </LinkContainer>
                  {/* need to be edited */}
                  {
                    userInfo && !userInfo.isAdmin &&
                    <LinkContainer to='/account/orders'>
                      <NavDropdown.Item>My order</NavDropdown.Item>
                    </LinkContainer>

                  }

                  {userInfo && userInfo.isAdmin && (
                    <>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </>

                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
{/* 
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin Panel' id='adminmenu'>

                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )} */}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
