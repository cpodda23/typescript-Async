import data from './data.json';

const p = {};

data.forEach((cart) => {
  cart.products.forEach((product) => {
    p[product.productId] ??= 0;
    p[product.productId] += product.quantity;
  });
});

const arrP = Object.entries(p)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3);

console.log(`TOP 3: ${arrP.map(([k, v]) => k)}`);
