import { useQuery } from '@tanstack/react-query'

import { CreateGoal } from './components/create-goal'
import { EmptyGoal } from './components/empty-goal'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'
import { getSummary } from './http/get-summary'

export function App() {
  const { data: summary } = useQuery({
    queryFn: getSummary,
    queryKey: ['summary'],
    staleTime: 1000 * 60,
  })

  return (
    <Dialog>
      {(!summary || summary.total <= 0) && <EmptyGoal />}
      {summary && summary?.total > 0 && <Summary />}
      <CreateGoal />
    </Dialog>
  )
}
