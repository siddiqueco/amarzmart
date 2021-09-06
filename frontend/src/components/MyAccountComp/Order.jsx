import React from 'react'
import { Link } from 'react-router-dom'
import './Order.css'


const Order = ({ order }) => {
   const paidStatus = order.isPaid ? 'Paid' : 'Unpaid'

   const status = order.isDeliverd ? 'Delivered' : 'Processing'
   const paidClass = order.isPaid ? 'btn-paid' : 'btn-danger'


   return (
      <div className="order my-pd-rw bor-re shad hb-ef">
         <div className="my-ord my-w40">
            <div className="my-pd-ono">
               <Link to="/account/orders" className='orderId'>#{order._id}</Link>
               <br />
               <span className="">{order.createdAt.substring(0, 10)}</span>
            </div>
         </div>

         <div className="my-pd-pr my-w20">
            <div className="">
               <Link href="/account/orders" classNameName='text-warning'>
                  &#2547;{order.totalPrice}
               </Link>
            </div>
         </div>

         <div className="my-pd-sts my-w30 text-right">
            <div className="btn-group btn-group-sm my-button" role="group" aria-label="Basic example">
               <button type="button" className="btn btn-info">{status}</button>
               <button type="button" className={`btn ${paidClass}`}>{paidStatus}</button>
            </div>
         </div>

         {/* <div className="my-w10 text-center my-pd-inv">
            <a className="ml-2 btn btn-soft-warning btn-icon btn-circle btn-sm" href="https://www.sirajganjshop.com/invoice/551788" title="Download Invoice">
               <i className="las la-download"></i>
            </a>
         </div> */}
      </div>
   )
}

export default Order
