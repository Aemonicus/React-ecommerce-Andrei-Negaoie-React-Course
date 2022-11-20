import {Outlet, Link} from "react-router-dom"
import { useContext } from "react"

import { signOutUser } from "../../utils/firebase/firebase.utils"
import { UserContext } from "../../context/user.context"
import { CartContext } from "../../context/cart.context"
import "./navigation.styles.scss"

// Permet de transformer un élément comme un svg en component React
import {ReactComponent as CrownLogo} from "../../assets/crown.svg"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component"

export const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)

  return (
    <>
      <nav className="navigation">
        <Link className="logo-container" to="/"><CrownLogo className="logo"/></Link>
        <ul className="nav-links-container">
        <li><Link className="nav-link" to="/shop">SHOP</Link></li>
        <li>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
          ) : (
          <Link className="nav-link" to="/auth">SIGN IN</Link>
          )}
          </li>
          <li><CartIcon className="nav-link" /></li>
        </ul>
        {isCartOpen && <CartDropDown />}
      </nav>
      {/* Outlet va afficher toutes les routes enfant si il y en a dans le composant du router, présent dans ce projet dans App.js, on s'en sert ici pour inclure toutes les pages sous la navbar */}
      <Outlet />
    </>
  )
}