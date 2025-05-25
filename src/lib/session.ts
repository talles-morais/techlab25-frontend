import { jwtVerify } from "jose"

const encodedKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error('Failed to verify session', error)
  }
}