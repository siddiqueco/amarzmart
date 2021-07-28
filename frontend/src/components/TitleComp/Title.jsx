import React from 'react'
import PropTypes from 'prop-types';
import classes from './Title.module.css'

const Title = ({ text, textColor, icon, iconColor }) => {
   return (
      <>
         <h2 className={`${classes.titleText} text-center-sm mt-2`} style={{ color: textColor? textColor:'#3e3f3a' }}>
            {text} {icon && <span style={iconColor && { color: iconColor }}>{icon}</span>}
         </h2>
      </>
   )
}


Title.propTypes = {
   text: PropTypes.string.isRequired,
   textColor: PropTypes.string,
   icon: PropTypes.any,
   icon: PropTypes.string
};

export default Title
