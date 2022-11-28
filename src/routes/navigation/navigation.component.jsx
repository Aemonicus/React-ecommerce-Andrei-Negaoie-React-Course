import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

// Permet de transformer un élément comme un svg en component React
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import {
  NavigationContainer,
  NavLinks,
  SingleNavLink,
  NavLink,
  LogoContainer,
} from "./navigation.styles";
import { signOutStart } from "../../store/user/user.action";

export const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const signOutUser = () => dispatch(signOutStart());

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <SingleNavLink>
            <NavLink to="/shop">SHOP</NavLink>
          </SingleNavLink>
          <SingleNavLink>
            {currentUser ? (
              <NavLink as="span" onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to="/auth">SIGN IN</NavLink>
            )}
          </SingleNavLink>
          <SingleNavLink>
            <CartIcon className="nav-link" />
          </SingleNavLink>
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      {/* Outlet va afficher toutes les routes enfant si il y en a dans le composant du router, présent dans ce projet dans App.js, on s'en sert ici pour inclure toutes les pages sous la navbar */}
      <Outlet />
    </>
  );
};
