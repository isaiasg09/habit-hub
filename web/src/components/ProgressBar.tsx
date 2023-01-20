interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const progressStyles = {
    width: `${progress}%`,
  };

  return (
    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <div
        className='h-3 rounded-xl bg-blue-600'
        style={progressStyles}
        role='progressbar'
        aria-label='Progress of completed habits on this day'
        aria-valuenow={progress}
      ></div>
    </div>
  );
}
