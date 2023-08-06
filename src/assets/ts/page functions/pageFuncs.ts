import User from "../classes/User";
import { validUser, validProduct } from "../utils/types";
import { getProducts } from "../utils/utilFuncs"
import { navbarReset } from "./navBarFunc"
import { handleFormSubmit } from "./eventListeners";



export let user: validUser;
export const products:validProduct[] = await getProducts()


const header = <HTMLElement>document.querySelector(".content-header");
const mainBody = <HTMLElement>document.querySelector(".main-content");



export function LoginUser() {
  if (user) {
    storePage();
  } else {
    header.innerHTML = 'Login Page'
    if (mainBody) {
      mainBody.innerHTML = `<form class="login__form w-50">
        <div class="mb-3">
          <label for="login__name" class="form-label">Name</label>
          <input type="text" class="form-control" id="login__name">
        </div>
        <div class="mb-3">
          <label for="login__email" class="form-label">Email</label>
          <input type="email" class="form-control" id="login__email">
        </div>
        <div class="mb-3">
          <label for="login__password" class="form-label">Password</label>
          <input type="password" class="form-control" id="login__password">
        </div>
        <button type="submit" class="btn btn-success">Login</button>
      </form>`;
      const loginForm = document.querySelector(".login__form");
      loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = (
          <HTMLInputElement>document.querySelector("#login__name")
        ).value;
        const email = (
          <HTMLInputElement>document.querySelector("#login__email")
        ).value;
        const password = (
          <HTMLInputElement>document.querySelector("#login__password")
        ).value;
        user = new User(name, email, password);
        storePage();
      });
    } else {
      console.log("no .main__content element found");
    }
  }
}

export function storePage() {
  header.innerHTML = 'Top Products'
  mainBody.innerHTML = ''
  products.forEach((product) => {
    const card = `
    <div class="product-card card my-3" data-bs-theme="dark" style="width: 23rem;">
      <div class='p-2 rounded-2 bg-white card-img d-flex justify-content-center align-items-center'>
        <img src="${product.image}" title="${product.description}" class="card-img-top" alt="${product.title}">
      </div>
      <div class="card-body d-flex justify-content-between flex-column">
        <h5 class="card-title">${product.title}</h5>
        <div class='d-flex justify-content-between align-items-center'>
          <p class='fs-2 m-0'>$${product.price.toFixed(2)}</p>
          <form class='d-flex cartForm' data-product-id=${product.id} data-product-do="add">
            <input type="number" class='form-control m-1 p-1' id="qty" name="qty" min="1" max="20" value='1'>
            <input type="submit" value="Add to Cart" class="btn btn-success"/>
          </form>
        </div>
      </div>
    </div>
    `
    mainBody.insertAdjacentHTML("beforeend", card);
  })
  const CartForms = document.querySelectorAll<HTMLFormElement>(".cartForm");
    CartForms.forEach((form) => {
      form.addEventListener("submit", handleFormSubmit);
    });
  navbarReset(user);
}

export function cartPage() {
  header.innerHTML = 'Your Cart'
  mainBody.innerHTML = ''
  if (user){
    user.cart.forEach((product) => {
      const card = `
      <div class="product-card card my-3" data-bs-theme="dark" style="width: 23rem;">
        <div class='p-2 rounded-2 bg-white card-img d-flex justify-content-center align-items-center'>
          <img src="${product.image}" title="${product.description}" class="card-img-top" alt="${product.title}">
        </div>
        <div class="card-body d-flex justify-content-between flex-column">
          <h5 class="card-title">${product.title}</h5>
          <p class='fs-4 m-0 text-end'>Qty in cart: ${product.qty}</p>
          <div class='d-flex justify-content-between align-items-center'>
            <p class='fs-2 m-0'>$${product.price.toFixed(2)}</p>
            
            <form class='d-flex cartForm' data-product-id=${product.id} data-product-do="remove">
              <input type="number" class='form-control m-1 p-1' id="qty" name="qty" min="1" max="20" value='${product.qty}'>
              <input type="submit" value="remove" class="btn btn-danger"/>
            </form>
          </div>
        </div>
      </div>
      `
      mainBody.insertAdjacentHTML("beforeend", card);
    })
  }
  const CartForms = document.querySelectorAll<HTMLFormElement>(".cartForm");
    CartForms.forEach((form) => {
      form.addEventListener("submit", handleFormSubmit);
    });
  navbarReset(user);
}

export function logoutUser() {
  user = undefined;
  storePage();
}

