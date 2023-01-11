import { initTRPC } from '@trpc/server'
import { createHTTPServer } from '@trpc/server/adapters/standalone'
import z from 'zod'

const PORT = 3000
const t = initTRPC.create()

const ZodBrandedID = z.string().brand('branded')
export type BrandedID = z.infer<typeof ZodBrandedID>

const userList = [
  {
    id: '1' as BrandedID,
    name: 'aphex',
  },
]

const router = t.router({
  userById: t.procedure
    .input(
      z.object({
        id: ZodBrandedID,
      })
    )
    .query(({ input }) => {
      const user = userList.find((u) => u.id === input.id)

      return user
    }),
})

export type AppRouter = typeof router

const { listen } = createHTTPServer({
  router,
})

console.log(`🚀 tRPC listening on port ${PORT}`)
listen(PORT)
