import {GetStaticProps} from 'next'
import Link from 'next/link'
import React from 'react'
import client from '../../src/utils/client'
import type {StatusType, UserType} from '../../types/apiTypes'

const Static = ({
  data,
  error,
  status,
}: {
  data: string
  error: Error
  status: StatusType
}) => {
  const [state, setState] = React.useState<{
    info: unknown
    results: Array<UserType>
  }>(() => {
    return JSON.parse(data)
  })
  if (status === 'rejected') {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    )
  }
  console.log(JSON.parse(data), state)
  return (
    <div className="p-4 h-screen">
      <h1>Users </h1>
      <div className="p-4 flex items-center flex-wrap justify-center w-full">
        <div className=" grid grid-cols-4 gap-6 grid-flow-row">
          {state.results.map((item, i) => {
            // if (i > 0 && i < 10)
            return (
              <div
                key={item.email}
                className="bg-gray-800 text-gray-200 gap-2 w-56 h-52 justify-center flex items-center flex-col capitalize rounded-md"
              >
                <div className="flex flex-row w-11/12 justify-evenly gap-4 px-1.5 italic font-semibold text-lg items-center">
                  <img
                    className="rounded-full ring ring-opacity-75 ring-offset ring-indigo-600 ring-offset-indigo-500 "
                    src={item.picture?.thumbnail}
                    alt={`${item.name?.first} ${item.name?.last}`}
                  />
                  <Link
                    href={`/static/${item.login.uuid}`}
                  >{`${item.name?.first} ${item.name?.last}`}</Link>
                </div>
                <div className="flex gap-1">
                  <h3>{item?.dob.age}</h3>-<h3>{item?.gender}</h3>
                </div>
                <h3>{item?.phone}</h3>
                <h3>{item?.registered.age}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  const response = {
    status: 'idle',
    data: null,
    error: null,
  }
  await fetch(`https://randomuser.me/api/?results=10&nat=us`, {})
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
