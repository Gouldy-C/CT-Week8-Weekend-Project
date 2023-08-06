import User from "../classes/User"

export type validUser = User|undefined


export type validProduct = {
  category?: string
  description: string
  id: number
  image: string
  price: number
  rating?: {rate: number, count: number}
  title: string
}

export type cartProduct = {
  description: string
  id: number
  image: string
  price: number
  title: string
  qty: number
}