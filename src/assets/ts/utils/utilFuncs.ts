import { v4 as uuidv4 } from 'uuid'


export async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  if (res.ok) {
    const data = await res.json()
    return data
  }
  console.log('bad response');
}

export function getRandId(): string {
  return uuidv4()
}

export function titleCase(str:string):string {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}
