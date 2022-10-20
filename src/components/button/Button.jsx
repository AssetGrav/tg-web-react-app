import React from 'react'
import '../button/Button.css'

function Button(props) {
  return (
    <button {...props} className={'button ' + props.className} />
  )
}


export default Button

