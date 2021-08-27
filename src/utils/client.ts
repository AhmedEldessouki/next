import type {AppResponse} from '../../types/apiTypes'

async function client<T>(path: string): Promise<AppResponse<T>> {
  const response: AppResponse<T> = {
    status: 'idle',
    data: null,
    error: null,
  }
  await fetch(`https://dummyapi.io/data/api${path}`, {
    headers: {'app-id': `61290853ccfd5643742d42fe`},
  })
    .then(async res => {
      const data = await res.json()
      response.data = data as T
      response.status = 'resolved'
    })
    .catch((err: Error) => {
      response.status = 'rejected'
      response.error = err
    })
  return response
}

export default client
