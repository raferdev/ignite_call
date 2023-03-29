import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  const uniqueUsername = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (uniqueUsername) {
    return res.status(400).json({
      message: 'Username already exist.',
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  const MAXAGE_COOKIE = 60 * 60 * 24 * 7 // 7 days on seconds
  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: MAXAGE_COOKIE,
    path: '/',
  })

  return res.status(201).json(user)
}
