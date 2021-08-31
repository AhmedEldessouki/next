import {GetStaticProps} from 'next'
import {useRouter} from 'next/dist/client/router'
import React from 'react'
import {useUser} from '../../context/userContext'
import {UserType} from '../../types/apiTypes'

function User() {
  const {query, isFallback, replace, ...router} = useRouter()
  const {users} = useUser()
  console.log(
    JSON.parse(users).results.filter(
      (item: UserType) => item.login.uuid === query.id,
    ),
  )
  const [user, setUser] = React.useState<UserType>(() => {
    return JSON.parse(users).results.filter(
      (item: UserType) => item.login.uuid === query.id,
    )[0]
  })
  React.useEffect(() => {
    if (users === '') router.push('/static')
    if (!users) {
    }
  }, [users])
  console.log(JSON.parse(users), query, users)
  if (isFallback) return <span>loading...</span>
  return (
    <div>
      <img src={user.picture.large} alt="" />
    </div>
  )
}

export default User
