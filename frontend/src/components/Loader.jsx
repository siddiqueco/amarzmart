import React from 'react'
import {Spinner} from 'react-bootstrap'
const Loader = () => {
    return (
        
        <Spinner animation="border" role="status" style={{display:"block" , margin:"auto" ,width:"7rem", height:'7rem'}}>
        <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default Loader
