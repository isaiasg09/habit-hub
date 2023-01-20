import { Check } from "phosphor-react";

export function NewHabitForm() {
  return (
    <form className='w-full flex flex-col mt-6'>
      <label htmlFor='title' className='font-semibold leading-tight'>
        What's your new habit name?
      </label>

      <input
        type='text'
        id='title'
        placeholder='Go to gym, sleep 8h, read a book...'
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
        autoFocus
      />

      <label htmlFor='' className='font-semibold leading-tight mt-4'>
        What's the frequency?
      </label>

      <button
        type='submit'
        className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 transition-all hover:bg-green-400 active:scale-95 active:bg-green-500'
      >
        <Check size={20} weight='bold' />
        Confirm
      </button>
    </form>
  );
}
