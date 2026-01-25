import { CheckIcon } from "lucide-react";

interface StepsProps {
  finishedStep: number;
  onStepClick: (step: number) => void;
}

export default function Steps({ finishedStep, onStepClick }: StepsProps) {
  return (
    <div className="flex justify-center items-center">
      <ul className="flex">
        <li role={finishedStep > 0 ? 'button' : undefined} onClick={() => onStepClick(0)} className={`flex justify-center items-center after:content-[''] after:w-10 after:h-0.5 after:relative after:-top-3.5 ${finishedStep === 0 ? 'after:bg-amber-500' : finishedStep >= 1 ? 'after:bg-green-500 cursor-pointer' : 'after:bg-zinc-300 cursor-not-allowed'}`}>
          <p className="w-14 flex flex-col justify-between items-center gap-1 h-full">
            <strong className={`flex flex-col justify-center items-center gap-1 w-14 aspect-square border-2 rounded-full p-2.5 text-2xl ${finishedStep === 0 ? 'border-amber-500 text-amber-500' : finishedStep >= 1 ? 'border-green-500 text-green-500' : 'border-zinc-300 text-zinc-300'}`}>
              {finishedStep >= 1 ? <CheckIcon className="w-8 h-8 text-green-500" /> : '1'}
            </strong>
            <strong className={`text-center text-sm leading-3.5 ${finishedStep === 0 ? 'text-amber-500' : finishedStep >= 1 ? 'text-green-500' : 'text-zinc-300'}`}>
              Select Companion
            </strong>
          </p>
        </li>
        <li role={finishedStep > 1 ? 'button' : undefined} onClick={() => onStepClick(1)} className={`flex justify-center items-center before:content-[''] before:w-10 before:h-0.5 before:relative before:-top-3.5 ${finishedStep === 1 ? 'before:bg-amber-500' : finishedStep >= 2 ? 'before:bg-green-500 cursor-pointer' : 'before:bg-zinc-300 cursor-not-allowed'}`}>
          <p className="w-14 flex flex-col justify-between items-center gap-1 h-full">
            <strong className={`flex flex-col justify-center items-center gap-1 w-14 aspect-square border-2 rounded-full p-2.5 text-2xl ${finishedStep === 1 ? 'border-amber-500 text-amber-500' : finishedStep >= 2 ? 'border-green-500 text-green-500' : 'border-zinc-300 text-zinc-300'}`}>
              {finishedStep >= 2 ? <CheckIcon className="w-8 h-8 text-green-500" /> : '2'}
            </strong>
            <strong className={`text-center text-sm leading-3.5 ${finishedStep === 1 ? 'text-amber-500' : finishedStep >= 2 ? 'text-green-500' : 'text-zinc-300'}`}>
              Add Skills
            </strong>
          </p>
        </li>
      </ul>
    </div>
  )
}
