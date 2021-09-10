import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userAction'
import randomPassword from '../utils/generatePassword'
// import nodemailer from 'nodemailer'
// import toogglerPassword from '../components/tooglerPassword'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isPassDhow, setIsPassDhow] = useState(false)
  const [suggstPass, setSuggestPass] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
    setSuggestPass('')

  }, [history, userInfo, redirect], suggstPass)



  const generatePassword = () => {
    if (!suggstPass)
      setSuggestPass(randomPassword)
      console.log(suggstPass)
  }

  const togglePass = () => {
    setIsPassDhow(!isPassDhow)
  }


  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {



      dispatch(register(name, email, password))
    }
  }











  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter full name here'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={isPassDhow ? 'text' : 'password'}
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <div className='d-flex' style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Form.Label >
              Confirm Password
            </Form.Label>
            <span onClick={togglePass} style={{ cursor: 'pointer' }}>
              <i className={`fas fa-eye${isPassDhow ? '-slash' : ''}`}></i>
            </span>
          </div>

          <Form.Control
            type={isPassDhow ? 'text' : 'password'}
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' style={{ display: 'block' }}>
          Sign up
        </Button>

      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-info'>
            Login
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <span
            className='primary text-warning'
            role='button'
            onClick={generatePassword}
          >
            Generate password
          </span>
        </Col>
        <Col><b>{suggstPass}</b></Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen