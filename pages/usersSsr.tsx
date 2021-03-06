import Link from 'next/link'
import React from 'react'
import type {GetStaticProps} from 'next'
import type {StatusType, UserType} from '../types/apiTypes'

const Static = ({data}: {data: string}) => {
  const [state] = React.useState<{
    info: unknown
    results: Array<UserType>
  }>(() => {
    return JSON.parse(data)
  })

  return (
    <div className="p-4 h-screen">
      <h1>Users </h1>
      <div className="p-4 flex items-center flex-wrap justify-center w-full">
        <div className=" grid grid-cols-4 sm:grid-cols-2 gap-6 grid-flow-row">
          {state.results.map((item, i) => {
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
                  <span>{`${item.name?.first} ${item.name?.last}`}</span>
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

export const getServerSideProps: GetStaticProps = async ctx => {
  const res = await fetch(`https://randomuser.me/api/?results=10&nat=us`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data: JSON.stringify(data),
    },
  }
}

export default Static
