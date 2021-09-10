import React from 'react'
import logoImg from '../../assests/img/logo.png'

const logo = ({style}) => {
   return (
      <span style={style && {style}}>
         <img src={logoImg} alt="" style={{ width: '200px' }} />
         <i className='fab fa-typo3 header-brand-icon' />
      </span>
   )
}

export default logo
