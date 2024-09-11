import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-completion-goal'
import { toast } from 'sonner'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data: pendingGoals } = useQuery({
    queryFn: getPendingGoals,
    queryKey: ['pending-goals'],
    staleTime: 1000 * 60,
  })

  if (!pendingGoals) return null

  async function handleCompleteGoal(goal: string) {
    try {
      await createGoalCompletion(goal)

      await queryClient.invalidateQueries({ queryKey: ['summary'] })
      await queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

      toast.success('Meta completada com sucesso!')
    } catch (error) {
      console.log('🚀 ~ handleCompleteGoal ~ error:', error)
      toast.error('Ocorreu um erro ao completar a meta')
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
