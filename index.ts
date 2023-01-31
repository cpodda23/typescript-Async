import { apiClient } from './api-client';
import './top-three';

let loading = false;

// Resource: carts?limit=3
const fetchCarts = async () => {
  const response = await fetch('https://fakestoreapi.com/carts?limit=2');
  return response.json();
};

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

// Resource: products/{id}
const fetchProduct = async (id: string) => {
  //if (Math.random() > 0.8) throw new Error('Network error');
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  return response.json();
};

// Resource: users/{id}
const fetchUser = async (id: string) => {
  const response = await fetch(`https://fakestoreapi.com/users/${id}`);
  return response.json();
};

// 1. Recuperare i carrelli (carts)
const main = async () => {
  getFinalCarts();
};

// 2. Ricostruire il carrello recuperando 'userId' e 'productId' per ogni carrello
const getFinalCarts = async () => {
  const carts = await fetchCarts();

  const finalCarts = await Promise.all(
    carts.map(async (cart: any) => {
      return {
        ...cart,
        user: await fetchUser(cart.userId),
        products: await Promise.all(
          cart.products.map(async (product: any) => {
            return {
              ...product,
              productId: await fetchProduct(product.productId),
            };
          })
        ),
      };
    })
  );

  console.log(finalCarts);
};

// 3. Gestire correttamente il loading

// 4. Gestire correttamente gli errori visualizzando un alert

// 5. Creare un array con top 3 prodotti più comprati

//main();
