type PendingGoalsResponse = {
  id: string
  title: string
  completionCount: number
  desiredWeeklyFrequency: number
}

export async function getPendingGoals(): Promise<PendingGoalsResponse[]> {
  const res = await fetch('http://localhost:3333/pending-goals')
  const data = await res.json()

  return data
}
