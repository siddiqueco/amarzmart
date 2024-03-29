import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userAction'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPassShow, setIsPassShow] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loadig, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(login(email, password))

    }
    const togglePass = () => {
        setIsPassShow(!isPassShow)
    }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loadig && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password Address</Form.Label>
                    <Form.Control
                        type={`${isPassShow? 'text': 'password'}`}
                        placeholder='Enter password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></Form.Control>
                    <i className={`fas ${isPassShow ? 'fa-eye-slash' : 'fa-eye'}`}
                        style={{ position: 'absolute', top: '170px', right: '22px' }}
                        onClick={togglePass}
                    ></i>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Login
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?
                    <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}
                        className="text-info"
                    >
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen
