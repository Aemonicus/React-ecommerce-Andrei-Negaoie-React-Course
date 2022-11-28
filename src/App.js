import Home from "./routes/home/home.component";
import { Navigation } from "./routes/navigation/navigation.component";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action"
import { useDispatch } from "react-redux";


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* index veut dire que "/" servira d url pour la route, donc c'est comme si on disait que home avait comme path="/" */}
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        {/* la wild card * indique "regarde dans le component Shop les éléments à afficher dans les routes enfant", il va trouver "index" qui sera le composant rendu par défaut pour le composant Shop */}
        {/* /shop */}
        <Route path="auth" element={<Authentication />} />
        {/* /auth */}
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
