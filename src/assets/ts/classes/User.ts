import { getRandId } from "../utils/utilFuncs"
import { validProduct, cartProduct } from "../utils/types"


export default class User {
  public readonly id: string = getRandId()
  
  public get password(): string {
    return this._password
  }
  public set password(value: string) {
    this._password = value
  }
  public get cart(): cartProduct[] {
    return this._cart
  }
  public set cart(value: cartProduct[]) {
    this._cart = value
  }
  public get age(): string {
    return this._email
  }
  public set age(value: string) {
    this._email = value
  }
  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    this._name = value
  }
  
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _cart: cartProduct[] = []){
      this._name = _name,
      this._email = _email,
      this._password = _password,
      this._cart = _cart
    }
  
  addToCart(product: validProduct, qty:number): void{
    for (const i of this.cart){
      if (i.id === product.id){
        i.qty += qty
        return
      } 
    }
    const item: cartProduct = {
      description: product.description,
      id: product.id,
      image: product.image,
      price: product.price,
      title: product.title,
      qty: qty
    }
    this.cart.push(item)
  }
  
  removeFromCart(product: validProduct, qty:number): void{
    for (const i in this.cart){
      if (this.cart[i].id === product.id){
        if (this.cart[i].qty <= qty){
          delete this.cart[i]
        } else {
          this.cart[i].qty -= qty
        }
      }
    }
  }
  
  cartTotal(): number{
    let res = 0
    for (const item of this.cart) {
      res += item.price
    }
    return res
  }
  
  printCart(): void{
    for (const item of this.cart) {
      console.log(item.title);
    }
  }
}
