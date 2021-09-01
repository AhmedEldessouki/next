import type {NextApiRequest, NextApiResponse} from 'next'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const response = {
    status: 'idle',
    data: null,
    error: null,
  }
  await fetch(`https://randomuser.me/api/?results=10&nat=us`, {})
    .then(async res => {
      response.status = 'resolved'
      const data = await res.json()
      response.data = data
    })
    .catch((err: Error) => {
      response.status = 'rejected'
      response.error = err
    })
  if (response.status) {
    res.status(200).json({...response.data})
  } else {
    res.status(400).json({...response.error})
  }
}
