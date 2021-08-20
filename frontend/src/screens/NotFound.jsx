import React from 'react'
import { Link } from 'react-router-dom'
import img404 from '../assests/img/404.jpg'


const NotFound = ({img}) => {
   return (
      <>
         <div class="col-lg-12">
            <div class="error-section ptb-50">
               <div class="error-section-head"><h1>404</h1></div>
               <div class="error-section-subhead"><h4>PAGE NOT FOUND</h4></div>
               <div class="error-section-details">
                  <p>
                     Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarity unavailable.
                  </p>
               </div>
               <div class="error-section-button">
                  <Link to='/'>
                     <button className="button btn-primary">Back to home page</button>
                  </Link>
               </div>
            </div>
         </div>
      </>
   )
}






export default NotFound
