import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../actions/userAction'
import { listMyOrders } from '../../actions/orderAction'
import Title from '../TitleComp/Title'
import Order from './Order'
import Loader from '../Loader'
import './MyOrders.css'
import { Link } from 'react-router-dom'
import { Row, Form,Badge } from 'react-bootstrap'

const MyProfile = ({ match }) => {

   const [orderFilter, setOrderFilter] = useState('all')

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin


   const userDetails = useSelector((state) => state.userDetails)
   const { loading, error, user } = userDetails

   const orderListMy = useSelector((state) => state.orderListMy)
   const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


   const orderPay = useSelector((state) => state.orderPay)
   const { loading: loadingPay, success: successPay } = orderPay



   useEffect(() => {

      if (!userInfo) {
         //  history.push('/login')
      } else {
         if (!user.name) {
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders(orderFilter))
         }
         dispatch(listMyOrders(orderFilter))
      }
   }, [dispatch, userInfo, user, successPay, orderFilter])

   const handleSelect = (e) => {
      setOrderFilter(e.target.value)
   }
   return (
      <div className="col-md-9 ">
         <Title text='Order History' className="small-title" />
         <div className='d-flex justify-content-between'>
            <>
               <h5>Total Order: <Badge className='btn-primary'>{orders && orders.length}</Badge></h5>
               <select
                  value={orderFilter}
                  onChange={handleSelect}
                  className='form-select rounded btn-primary py-2'
               >
                  <option value="all">All</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
               </select>
            </>
         </div>

         <div className="user-account-content-tab p-0 ">
            <div class="row mt-2">
               <div class="col-lg-12">
                  {
                     loadingOrders ? <Loader /> :

                        (orders.map(order => (
                           <Link to={`/orders/${order._id}`}>
                              <Order key={order._id} order={order} />
                           </Link>

                        )))
                  }
               </div>
            </div>

         </div>
      </div>
   )
}
{/* <h2 style={{ textAlign: "center", marginTop: "20px" }} className='text-warning'>No orders found</h2>: */ }
export default MyProfile
