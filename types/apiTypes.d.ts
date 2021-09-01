type UserLocation = {
  street: {
    number: number
    name: string
    city: string
    state: string
    country: string
    postcode: number
  }
  coordinates: {latitude: string; longitude: string}
  timezone: {offset: string; description: string}
}

type UserLogIn = {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

type UserType = {
  gender: string
  name: {title: string; first: string; last: string}
  location: UserLocation
  email: string
  login: UserLogIn
  dob: {date: string; age: number}
  registered: {date: string; age: number}
  phone: string
  cell: string
  id: {name: string; value: unknown}
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

type StatusType = 'idle' | 'pending' | 'resolved' | 'rejected'

export {UserType, UserLogIn, StatusType}
