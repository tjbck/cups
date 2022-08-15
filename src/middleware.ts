import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// import {v4 as uuidv4} from 'uuid'

export function middleware(request: NextRequest) {
  // Setting cookies on the response
  const response = NextResponse.next()

  // Getting cookies from the request
  // const allCookies = request.cookies.entries()
  // console.log(allCookies)

  // Getting cookies from the request
  // const cookie = request.cookies.get('id')
  // console.log(cookie) // => 'fast'

  // if(!cookie) {
  //   response.cookies.set('id', uuidv4(), { httpOnly: true })
  // }
  
  return response
}