import {GetStaticProps} from 'next'
import React from 'react'
import client from '../src/utils/client'
import type {StatusType, UserType} from '../types/apiTypes'

const Static = ({
  data,
  error,
  status,
}: {
  data: Array<UserType>
  error: Error
  status: StatusType
}) => {
  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Users </h1>
      {data.map(item => (
        <div key={item.email}>
          <div className="min">
            <img
              src={item.picture.thumbnail}
              alt={`${item.name.first} ${item.name.last}`}
            />
            <h2>{item}</h2>
          </div>
        </div>
      ))}
    </div>
  )
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
      response.data = data.results
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
