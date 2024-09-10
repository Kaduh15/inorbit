import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createGoals } from './routes/create-goals'
import { getPendingGoals } from './routes/get-pending-goals'
import { createCompletion } from './routes/create-completion'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoals)
app.register(getPendingGoals)
app.register(createCompletion)
app.register(getWeekSummaryRoute)

app
  .listen({
    port: 3333,
  })
  .then(address => {
    console.log(`Server listening on ${address}`)
  })
