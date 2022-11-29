import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import { Spinner } from './components/spinner/spinner.component';
import { checkUserSession } from './store/user/user.action';

import { GlobalStyle } from './global.styles';

// lazy avec suspense nous permet de mettre en place de l'import dynamique. Ce qui veut dire importer uniquement les éléments du Home component quand on est sur la page Home, etc..

const Navigation = lazy(() =>
  import('./routes/navigation/navigation.component')
);
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() =>
  import('./routes/authentication/authentication.component')
);


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
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
    </Suspense>
  )
}

export default App;
