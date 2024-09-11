import { X } from 'lucide-react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group'
import { Button } from './ui/button'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createGoal } from '../http/create-goal'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const createGoalForm = z.object({
  title: z.string().min(1, 'Informe a atividade que você deseja fazer.'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalForm = z.infer<typeof createGoalForm>

export function CreateGoal() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalForm),
      defaultValues: {
        desiredWeeklyFrequency: 3,
      },
    })

  const handleCreateGoal = handleSubmit(async data => {
    try {
      await createGoal(data)

      await queryClient.invalidateQueries({ queryKey: ['summary'] })
      await queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
      reset()

      toast.success('Meta criada com sucesso!')
    } catch (error) {
      toast.error('Ocorreu um erro ao criar a meta')
    }
  })

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar Meta</DialogTitle>
            <DialogClose>
              <X className="size-4 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleCreateGoal}
          className="flex-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-col gap-2">
              <Label>Qual á atividade?</Label>
              <Input
                autoFocus
                placeholder="Praticar exercícios, meditar, ler, etc."
                {...register('title')}
              />
              {formState.errors.title && (
                <span className="text-red-500">
                  {formState.errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantas vezes por semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={`${field.value}`}
                  >
                    <RadioGroupItem value="1">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        1x na semana
                      </span>
                      <span>🥱</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="2">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        2x na semana
                      </span>
                      <span>🙂</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="3">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        3x na semana
                      </span>
                      <span className="text-ls leading-none">😎</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="4">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        4x na semana
                      </span>
                      <span className="text-ls leading-none">😜</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="5">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        5x na semana
                      </span>
                      <span className="text-ls leading-none">🤨</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="6">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        6x na semana
                      </span>
                      <span className="text-ls leading-none">🤯</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="7">
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        Todos os dias da semana
                      </span>
                      <span className="text-ls leading-none">🔥</span>
                    </RadioGroupItem>
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button variant="secondary" type="button" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <Button type="submit" className="flex-1">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
