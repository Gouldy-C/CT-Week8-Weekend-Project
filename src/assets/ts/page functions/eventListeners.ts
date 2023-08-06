import { cartPage, storePage, LoginUser, logoutUser } from "./pageFuncs"
import { products, user } from "./pageFuncs";


export function eventListeners() {
  const cartLink = document.querySelector(".nav__cart");
  cartLink?.addEventListener("click", () => {
    cartPage();
  });

  const storeLink = document.querySelector(".nav__store");
  storeLink?.addEventListener("click", () => {
    storePage();
  });

  const brandLink = document.querySelector(".navbar-brand");
  brandLink?.addEventListener("click", () => {
    storePage();
  });

  const loginLink = document.querySelector(".nav__login");
  loginLink?.addEventListener("click", () => {
    LoginUser();
  });

  const logoutLink = document.querySelector(".nav__logout");
  logoutLink?.addEventListener("click", () => {
    logoutUser();
  });
}

export function handleFormSubmit(e: Event) {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const qty = Number((form.querySelector('#qty') as HTMLInputElement).value)
  const productId = form.getAttribute("data-product-id")
  const doAction = form.getAttribute("data-product-do")
  const product = products.find((item) => item.id === parseInt(productId!));
  if (user){
    if (product && doAction === 'add' ) {
      user.addToCart(product, qty)
      const mes = `Qty: ${qty} of ${product.title} was added to your cart!`
      alert(mes)
    } else if (product && doAction === 'remove') {
      const mes = `Qty: ${qty} of ${product.title} was removed from your cart!`
      alert(mes)
      user.removeFromCart(product, qty)
      cartPage()
    }
  } else{
    alert(`You must be logged to add to cart!`)
  }
}