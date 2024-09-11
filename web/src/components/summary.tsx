import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { CheckCircle2, Plus } from 'lucide-react'
import { getSummary } from '../http/get-summary'
import { InOrbitIcon } from './in-orbit-icon'
import { PendingGoals } from './pending-goals'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'

dayjs.locale(ptBR)

export function Summary() {
  const { data: summary } = useQuery({
    queryFn: getSummary,
    queryKey: ['summary'],
    staleTime: 1000 * 60,
  })

  if (!summary) return null

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round(
    (summary.completed * 100) / summary.total
  )

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <InOrbitIcon />
        <span className="flex-1 capitalize">
          {firstDayOfWeek} - {lastDayOfWeek}
        </span>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={summary.completed} max={summary.total}>
          <ProgressIndicator
            style={{
              width: `${completedPercentage}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{summary?.completed}</span> de{' '}
            <span className="text-zinc-100">{summary?.total}</span> metas nessa
            semana
          </span>
          <span>{completedPercentage}%</span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-medium">Sua Semana</h2>

          {Object.entries(summary.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const formattedDate = dayjs(date).format('D[ de ]MMMM')

            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay}</span>{' '}
                  <span className="text-zinc-400 text-xs">
                    ({formattedDate})
                  </span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map(goal => (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500 " />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{' '}
                        <span className="text-zinc-100">
                          {dayjs(goal.completedAt).format('HH:mm').toString()}
                        </span>{' '}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
