import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@/lib/utils'
import { deleteFromS3 } from '@/lib/s3'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = getCookie(req)
    const { id, name } = req.body

    const { status } = await deleteFromS3(name, 'mesa-store')

    if (status) {
      const { data } = await axios.delete(
        process.env.NEXT_PUBLIC_BASE_URL + '/upload/' + id,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: session,
          },
        }
      )

      if (data && data.status) {
        res.status(200).json({
          status: true,
        })
      }
    } else {
      throw new Error('Failed delete file from S3 bucket')
    }
  } catch (err: any) {
    res.status(500).send('Something went wrong!')
  }
}
