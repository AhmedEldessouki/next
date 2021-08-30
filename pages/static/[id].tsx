import {GetStaticProps} from 'next'
import {useRouter} from 'next/dist/client/router'
import React from 'react'

function User({data}) {
  const {query, isFallback} = useRouter()
  console.log(JSON.parse(data), query)
  const [user, setUser] = React.useState(() =>
    JSON.parse(data).results.filter(item => item.login.uuid === query.id),
  )
  if (isFallback) return <span>loading...</span>
  return <div>{JSON.stringify(user)}</div>
}
export async function getStaticPaths() {
  const res = await fetch(`https://randomuser.me/api/?results=10&nat=us`, {})
  const data = await res.json()

  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [
      ...data.results.reduce(
        (acc, user) => [...acc, {params: {id: user.login.uuid}}],
        [],
      ),
    ],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  }
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
export default User
