import User from "../classes/User";
import { titleCase } from "../utils/utilFuncs"
import { eventListeners } from "./eventListeners"
import { validUser } from "../utils/types";


export function navbarReset(user: validUser): void {
  const navbar = <HTMLElement>document.querySelector(".navbar-nav")
  if (user) {
    navbar.innerHTML = `<li class="nav-item">
      <button class="nav-link nav__store text-light fs-5">Store</button>
    </li>
    <li class="nav-item">
      <button class="nav-link nav__cart text-light fs-5">Cart</button>
    </li>
    <li class="nav-item">
      <button class="nav-link nav__logout text-light fs-5">Logout</button>
    </li>
    <li class="nav-item">
      <p class="nav-link text-light text-light fs-5 m-0">${titleCase(user.name)}</p>
    </li>`;
  } else {
    navbar.innerHTML = `<li class="nav-item">
      <button class="nav-link nav__store text-light fs-5">Store</button>
    </li>
    <li class="nav-item">
      <button class="nav-link nav__login text-light fs-5">Login</button>
    </li>`;
  }
  eventListeners();
}