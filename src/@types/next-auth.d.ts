import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { AuthOptions } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string
  }
  
  interface Session {
    user:User
  }

  function NextAuth(req: NextPageContext['req'] | NextApiRequest,res:NextPageContext['res'] | NextApiResponse, options:AuthOptions ):any

}