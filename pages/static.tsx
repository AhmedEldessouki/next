import {GetStaticProps} from 'next'
import client from '../src/utils/client'
import type {StatusType, UserPage} from '../types/apiTypes'

const Static = ({
  data,
  error,
  status,
}: {
  data: UserPage
  error: Error
  status: StatusType
}) => {
  return <div>{JSON.stringify({data, error, status})}</div>
}

export const getStaticProps: GetStaticProps = async ctx => {
  const response = {
    status: 'idle',
    data: null,
    error: null,
  }
  await fetch(`https://randomuser.me/api/?results=1000`, {})
    .then(async res => {
      const data = await res.json()
      response.data = data
    })
    .catch((err: Error) => {
      response.status = 'rejected'
      response.error = err
    })
  return {
    props: {
      data: JSON.stringify(response.data),
      error: JSON.stringify(response.error),
      status: response.status,
    },
  }
}

export default Static
