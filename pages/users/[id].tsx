import {useRouter} from 'next/router'
import Link from 'next/link'
import React from 'react'
import {useUser} from '../../context/userContext'
import {UserType} from '../../types/apiTypes'
// import {GetStaticProps} from 'next'

function User() {
  const {query, isFallback} = useRouter()
  const {users, dispatch} = useUser()
  const [user, setUser] = React.useState<UserType>(() => {
    if (!users) return null
    return JSON.parse(users).results.filter(
      (item: UserType) => item.login.uuid === query.id,
    )[0]
  })

  React.useEffect(() => {
    if (!window) return
    // return () => {
    //   setUser(null)
    // }
  }, [users])

  if (isFallback) return <span>loading...</span>
  if (!user)
    return (
      <div className="flex flex-col">
        <Link href="/users">Back</Link>
        <span>Something went wrong!</span>
      </div>
    )
  return (
    <div className="px-9 py-5 bg-indigo-900 flex gap-5 flex-col justify-center items-center text-gray-200">
      <Link href="/users">Back</Link>
      <div className="text-center text-blue-300">
        <img
          className="border-8 border-blue-300 border-opacity-70 rounded-md"
          src={user.picture.large}
          alt={`${user.name.title}.${user.name.first} ${user.name.last}`}
        />
        <span>{user.login.username}</span>
      </div>
      <span>
        {user.name.title} {user.name.first} {user.name.last}
      </span>
      <span>{user.gender}</span>
      <span>{user.cell}</span>
      <span>{user.email}</span>
      <span>
        {user.location.street.number} {user.location.street.name}
      </span>
      {/* <div className="p-8">
        {JSON.stringify(user.location.street)
          .split('')
          .map(item => (item === ',' ? item + '/n' : item))}
      </div> */}
    </div>
  )
}
// ? This can't be used because users are fetched randomly and the API doesn't support user fetch
// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch('http://localhost:3000/api/users')
//   const users = await res.json()

//   // Get the paths we want to pre-render based on users
//   const paths = users.results.map((user: UserType) => ({
//     params: {id: user.login.uuid},
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return {paths, fallback: true}
// }

// export const getStaticProps: GetStaticProps = async ctx => {
//   const response = {
//     status: 'idle',
//     data: null,
//     error: null,
//   }

//   await fetch(`http://localhost:3000/api/users`)
//     .then(async res => {
//       const data = await res.json()
//       response.data = data
//     })
//     .catch((err: Error) => {
//       response.status = 'rejected'
//       response.error = err
//     })
//   return {
//     props: {
//       data: JSON.stringify(response.data),
//       error: JSON.stringify(response.error),
//       status: response.status,
//     },
//   }
// }
export default User
