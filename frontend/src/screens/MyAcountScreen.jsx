import React from 'react'
import { Row, Col, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from '../components/MyAccountComp/MyDashboard'
import MyProfile from '../components/MyAccountComp/MyProfile'
import MyOrders from '../components/MyAccountComp/MyOrders'
import Title from '../components/TitleComp/Title'

const MyCoountScreen = ({ location, match }) => {

   const pathName = location.pathname

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   return (
      <section className='user-account mt-4 mb-3'>
         <Container>
            <div className="user-account-title">
               <Row>
                  <Col>
                     <Title text='My Account' className='page-heading' />
                  </Col>
               </Row>
            </div>
            <div className="user-account-content">
               <Row>
                  <Col md={3} >
                     <div className='user-account-content-sidebar'>
                        <Navbar className='justify-content-center'>
                           <Nav className="flex-column text-center">
                              {
                                 !userInfo.isAdmin &&
                                 <LinkContainer to="/account" exact as='div' activeClassName='bg-warning text-light shadow'>
                                    <Nav.Link><i className="fas fa-vector-square"></i>  DASHBOARD</Nav.Link>
                                 </LinkContainer>
                              }

                              <LinkContainer to="/account/profile" activeClassName='bg-warning text-white shadow'>
                                 <Nav.Link ><i className="far fa-user"></i>  My Profile</Nav.Link>
                              </LinkContainer>

                              {
                                 !userInfo.isAdmin &&
                                 <LinkContainer to="/account/orders" activeClassName='bg-warning text-white shadow'>
                                    <Nav.Link ><i className="far fa-file-alt"></i> Orders History</Nav.Link>
                                 </LinkContainer>
                              }
                           </Nav>
                        </Navbar>
                     </div>
                  </Col>
                  {
                     pathName === '/account' ? <Route path="/account" render={() => <Dashboard />} /> :
                        pathName === '/account/profile' ? <Route path="/account/profile" render={() => <MyProfile />} /> :
                           pathName === '/account/orders' ? <Route path="/account/orders" render={() => <MyOrders />} /> :
                              ''
                  }
                  {/* <Route path={'/account'} render={() => <Dashboard />} />
                  <Route path={`${match.path}/profile`} render={() => <MyProfile />} />
                  <Route path={`${match.path}/orders`} component={MyOrders} /> */}
               </Row>
            </div>
         </Container>
      </section>
   )
}

export default MyCoountScreen
