import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userAction'
import { toast } from 'react-toastify'
import Title from '../components/TitleComp/Title'





const UserListScreen = ({ history }) => {
  const [admins, setAdmins] = useState([])
  const [customer, setCustomer] = useState([])
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete







  useEffect(() => {

    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
      if (userList.length !== 0) {
        const admins = users.filter(user => user.isAdmin == true)
        const customer = users.filter(user => user.isAdmin !== true)
        setAdmins(admins)
        setCustomer(customer)
      }
    } else {
      history.push('/login')
    }

  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }

  }

  return (
    <>
      <h1 className='m-3'>Admins And Usesr List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        users.map(user => (

          <Row md={12} xl={9} className='shadow-sm mb-3 rounded product-center ' style={{ background: '#fff', cursor: 'pointer' }}>
            <LinkContainer to={`/admin/user/${user._id}/edit`}>
              <Col style={{ fontWeight: 700 }}>
                <p>{user._id}</p>
              </Col>
            </LinkContainer>
            <Col >
              <p>{user.name}</p>
            </Col>
            <Col>
              <p>{user.isAdmin ? 'ADMIN' : 'USER'}</p>
            </Col>
            <Col>
              <p>{user.email}</p>
            </Col>
            <Col>
              <Button
                variant='danger'
                className='btn-sm'
                onClick={() => deleteHandler(user._id)}
                style={{ marginLeft: '10px' }}
              >
                <i className='fas fa-trash'></i>
              </Button>
            </Col>
          </Row>

        ))
      )}
    </>
  )
}

export default UserListScreen









{/* {
            users && <Table  bordered hover responsive className='table-sm' >
              <thead>
                <tr className='text-center'>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th >ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className={`${user.isAdmin && 'table-info'}`}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className='text-center'>
                      {user.isAdmin ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td className='text-center'>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='primary' className='btn-sm'>
                          <i class="fas fa-user-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                        style={{ marginLeft: '10px' }}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          } */}