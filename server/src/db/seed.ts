import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      {
        title: 'Ler um livro',
        desiredWeeklyFrequency: 3,
      },
      {
        title: 'Fazer exercícios',
        desiredWeeklyFrequency: 4,
      },
      {
        title: 'Estudar 1 hora por dia',
        desiredWeeklyFrequency: 5,
      },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: result[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
  ])
}

seed().finally(() => client.end())
