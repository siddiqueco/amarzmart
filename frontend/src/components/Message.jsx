import React from 'react'
import {Alert} from 'react-bootstrap'

const Message = ({variant, style,children}) => {
    // const color= variant ==='success' ? '' 
    return (
        <Alert variant={variant} style={style && style}>
            {children}
        </Alert>
    )
}
Message.defaultProps={
    variant: 'info'
}

export default Message
