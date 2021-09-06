import React from 'react'
import {Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {
    // const color= variant ==='success' ? '' 
    return (
        <Alert variant={variant} >
            {children}
        </Alert>
    )
}
Message.defaultProps={
    variant: 'info'
}

export default Message
