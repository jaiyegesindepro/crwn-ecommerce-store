import React from 'react'
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './contexts/user.context';
import { ProductProvider } from './contexts/products.context';
import { CartProvider } from './contexts/cart.context';
import './index.scss'

import {createRoot} from 'react-dom/client';


const rootElement = document.getElementById('root');const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
