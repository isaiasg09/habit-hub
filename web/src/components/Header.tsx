import { Plus, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import logoImage from "../assets/logo-blue.png";
import { NewHabitForm } from "./NewHabitForm";

export function Header() {
  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logoImage} alt='habits' width={148} height={71} />

      <Dialog.Root>
        <Dialog.Trigger
          type='button'
          className='border border-blue-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 transition-all hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-darkbg'
        >
          <Plus size={20} className='text-blue-500' />
          novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/70 fixed inset-0' />
          <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>
            <Dialog.Close className='absolute right-6 top-6 text-zinc-400 transition-all rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-green-500 focus:ring-2 focus:ring-offset-zinc-900'>
              <X size={24} aria-label='Close' />
            </Dialog.Close>

            <Dialog.Title className='text-3xl leading-tight font-bold'>
              Criar hábito
            </Dialog.Title>

            <NewHabitForm  />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
