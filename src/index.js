import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import { Provider } from 'react-redux';
import { CartProvider } from './context/cart.context';
import { CategoryProvider } from './context/category.context';
import './index.scss';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CategoryProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoryProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

