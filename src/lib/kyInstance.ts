import ky from 'ky';

export let kyInstance = ky.create({ prefixUrl: 'http://localhost:5000/', headers: { 'Content-Type': 'application/json' }, credentials: 'include' })

export const pushTokenToHeader = (token: string) => {
  kyInstance = kyInstance.extend({
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
