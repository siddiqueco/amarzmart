import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails , deliverOrder} from '../actions/orderAction'
import {ORDER_DELIVER_RESET} from '../constants/orderConstant'



const OrderScreen = ({ match,  history }) => {

    const dispatch = useDispatch()

    const orderId = match.params.id

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}= userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver, success:successDeliver}= orderDeliver

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
  
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        
        if(!order || successDeliver){
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch,orderId,order,successDeliver])


    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <>
                <h1>Order ID: {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong>{order.user.email}
                                </p>
                                
                                <p>
                                    <strong>Address:</strong>
                                    {order.shippingAddress.address},
                                    {order.shippingAddress.city}{' '}
                                    {order.shippingAddress.postalCode},
                                    {' '}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <Message variant='success'>Delivered On {order.deliveredAt}</Message>
                                ):(
                                    <Message variant='danger'>Not delivered</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? (
                                    <Message>Order is empty</Message>
                                ) : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fluid
                                                                rounded
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x <span className='tk'>৳</span>{item.price} = <span className='tk'>৳</span>{item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col><span className='tk'>৳</span> {order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col><span className='tk'>৳</span> {order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col><span className='tk'>৳</span> {order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col><span className='tk'>৳</span> {order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                                    <ListGroup.Item> 
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                            Mark as Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                                
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
    )
}

export default OrderScreen