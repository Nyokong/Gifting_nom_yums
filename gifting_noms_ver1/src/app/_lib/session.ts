import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/dist/server/api-utils';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(process.env.SECRET);

// creating a cookie
const cookie = {
  name: 'session',
  options: { httponly: true, secure: true, sameSite: 'lax', path: '/'},
  duration: 24 * 60 * 60 * 1000,
}

export async function encrypt(payload: JWTPayload | undefined) {
  return new SignJWT(payload).setProtectedHeader({alg: 'HS256'}).setIssuedAt().setExpirationTime('1day').sign(key)
}

export async function decrypt(session: string | Uint8Array){
  try{
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })

    return payload;
  }catch (error){
    return null;
  }
}

export async function createSession(userId: any){
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({userId, expires});

  if(session){
    console.log('cookie has been created')
  }

  // cookies().set(cookie.name, session, {...cookie.options, expires })
  // redirect('/dashboard');
}

// export async function verifySession(){
//   const cookie = (await cookies()).get(cookie.name)?.value;
//   const session = await decrypt(cookie);

//   if(!session?.userId){
//     redirect('/login');
//   }

//   return {userId: session.userId }
// }