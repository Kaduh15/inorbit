export async function createGoalCompletion(goalId: string) {
  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  const res = await fetch(`http://localhost:3333/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })

  return res.json()
}
