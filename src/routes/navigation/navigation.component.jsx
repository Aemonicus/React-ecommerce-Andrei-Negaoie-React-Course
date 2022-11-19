import {Outlet, Link} from "react-router-dom"
import "./navigation.styles.scss"

// Permet de transformer un élément comme un svg en component React
import {ReactComponent as CrownLogo} from "../../assets/crown.svg"

export const Navigation = () => {
  return (
    <>
      <nav className="navigation">
       <Link className="logo-container" to="/"><CrownLogo className="logo"/></Link>
        <ul className="nav-links-container">
        <li><Link className="nav-link" to="/shop">SHOP</Link></li>
        <li><Link className="nav-link" to="/auth">SIGN IN</Link></li>
        </ul>
      </nav>
      {/* Outlet va afficher toutes les routes enfant si il y en a dans le composant du router, présent dans ce projet dans App.js, on s'en sert ici pour inclure toutes les pages sous la navbar */}
      <Outlet />
    </>
  )
}