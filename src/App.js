import Home from "./routes/home/home.component";
import { Navigation } from "./routes/navigation/navigation.component";

import { Routes, Route } from "react-router-dom"
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";



const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* index veut dire que "/" servira d url pour la route, donc c'est comme si on disait que home avait comme path="/" */}
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        {/* /shop */}
        <Route path="auth" element={<Authentication />} />
        {/* /auth */}
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
