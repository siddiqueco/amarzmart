import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, deliverOrder, payOrder } from '../actions/orderAction'
import { ORDER_DELIVER_RESET } from '../constants/orderConstant'
import { ORDER_PAY_RESET } from '../constants/orderConstant'
import { formatDate } from '../utils/formatDate'
import { toast } from 'react-toastify';

const OrderScreen = ({ match, history }) => {

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderId = match.params.id

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay


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
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }


        if (!order || successDeliver || successPay || order._id !== orderId) {

            dispatch({ type: ORDER_PAY_RESET })

            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            }
        } else {
            setSdkReady(true)
        }

    }, [dispatch, orderId, order, successPay, successDeliver])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {

        if (order.paymentMethod === 'PayPal') {
            if (order.isPaid) {
                dispatch(deliverOrder(order))
            } else {
                toast.info('Customer needs to pay!', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            dispatch(deliverOrder(order))
        }
        // console.log(order)
    }

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <>
                <h1>Order ID: {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush' >
                            <ListGroup.Item className='shadow mb-2 rounded'>
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
                                    <Message style={{ background: '#38b449' }}>Delivered On  <strong>{formatDate(order.deliveredAt)}</strong></Message>
                                ) : (
                                    <Message variant='danger'>Not delivered</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item className='shadow mb-2 rounded'>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                                {order.isPaid ? (
                                    <Message style={{ background: '#38b449'}} className='shadow-sm'>Paid on <strong>{formatDate(order.paidAt)}</strong></Message>
                                ) : (
                                    <Message variant='danger'>Not Paid</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? (
                                    <Message>Order is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index} className='shadow-sm mb-2 rounded'>
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
                        <Card className='shadow mb-2 rounded'>
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

                                {!order.isPaid && !userInfo.isAdmin && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {/* {!sdkReady ? (
                                            <Loader />
                                        ) : (
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )} */}

                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />

                                    </ListGroup.Item>
                                )}

                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler} style={{ fontSize: '16px' }}>
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