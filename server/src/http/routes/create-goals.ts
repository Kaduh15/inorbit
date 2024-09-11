import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'
import z from 'zod'
import { createGoal } from '../../functions/create-goal'

export const createGoals: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string().min(1),
          desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
        }),
      },
    },
    async request => {
      const { title, desiredWeeklyFrequency } = request.body

      return createGoal({
        title: title,
        desiredWeeklyFrequency: desiredWeeklyFrequency,
      })
    }
  )
}
