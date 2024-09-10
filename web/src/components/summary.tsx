import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'

export function Summary() {
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <InOrbitIcon />
        <span className="flex-1">5 a 12 de outubro</span>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator
            style={{
              width: '50%',
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">8</span> de{' '}
            <span className="text-zinc-100">15</span> metas nessa semana
          </span>
          <span>50%</span>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-3">
          <OutlineButton>
            <Plus className="size-4" />
            Meditar
          </OutlineButton>
          <OutlineButton>
            <Plus className="size-4" />
            Correr
          </OutlineButton>
          <OutlineButton>
            <Plus className="size-4" />
            Ler
          </OutlineButton>
          <OutlineButton>
            <Plus className="size-4" />
            Me alimentar melhor
          </OutlineButton>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-medium">Sua Semana</h2>

          <div className="flex flex-col gap-4">
            <h3 className="font-medium">
              Domingo{' '}
              <span className="text-zinc-400 text-xs">(10 de outubro)</span>
            </h3>

            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-pink-500 " />
                <span className="text-sm text-zinc-400">
                  Você completou "<span className="text-zinc-100">Meditar</span>
                  " ás <span className="text-zinc-100">10:30h</span>{' '}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-pink-500 " />
                <span className="text-sm text-zinc-400">
                  Você completou "<span className="text-zinc-100">Meditar</span>
                  " ás <span className="text-zinc-100">10:30h</span>{' '}
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-medium">
              Segunda{' '}
              <span className="text-zinc-400 text-xs">(11 de outubro)</span>
            </h3>

            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-pink-500 " />
                <span className="text-sm text-zinc-400">
                  Você completou "<span className="text-zinc-100">Meditar</span>
                  " ás <span className="text-zinc-100">10:30h</span>{' '}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
