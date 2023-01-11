import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import fetch from 'node-fetch'
import type { AppRouter, BrandedID } from './server'
const globalAny = global as any
globalAny.fetch = fetch

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
})

// This should error, branded string required
const user = await trpc.userById.query({
  id: '1',
})

// This should work, branded string required
// const user = await trpc.userById.query({
//   id: '1' as BrandedID,
// })

console.log(user)
