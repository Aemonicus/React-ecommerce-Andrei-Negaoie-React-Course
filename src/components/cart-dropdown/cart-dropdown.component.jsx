import "./cart-dropdown.styles.scss"
import Button from "../button/button.component"
import React from 'react'

export default function CartDropDown() {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">

        <Button >CHECKOUT</Button>
      </div>
    </div>
  )
}
