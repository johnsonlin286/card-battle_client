import { useState, useEffect } from "react";
import { CheckIcon, Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/constant";
import { fetchCharacters } from "@/services/collections";
import Modal from "@/components/Modal";
import CardOption from "@/components/deck/new/CardOption";
import Button from "@/components/Button";

interface CompanionPickProps {
  name: string;
  isOpen: boolean;
  data: Companion | null;
  onClose: () => void;
  onSubmit: () => void;
}

export default function CompanionPick({ name, isOpen, data, onClose, onSubmit }: CompanionPickProps) {
  const [finishedStep, setFinishedStep] = useState<number>(0);
  const [characters, setCharacters] = useState<CharacterDto[]>([]);

  const { data: charactersData, isLoading: isLoadingCharacters } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_CHARACTERS],
    queryFn: fetchCharacters,
    enabled: isOpen,
  })

  useEffect(() => {
    if (charactersData) {
      if ('error' in charactersData) {
        // TODO: Handle error
      } else {
        const { data } = charactersData as CharactersResponse;
        setCharacters(data);
      }
    }
  }, [charactersData])

  return (
    <Modal size="xl" isOpen={isOpen} dismissible={false} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center capitalize">{name}</h2>
        <Steps finishedStep={finishedStep} onStepClick={setFinishedStep} />
        {finishedStep === 0 && <CharacterList name={name} isLoading={isLoadingCharacters} characters={characters} />}
        {/* {finishedStep === 1 && <SkillList name={name} isLoading={isLoadingSkills} skills={skills} />} */}
        <div className="flex justify-end items-center gap-2">
          <Button type="button" color="none" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" color="primary" onClick={() => null}>
            Next
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function Steps({ finishedStep, onStepClick }: { finishedStep: number; onStepClick: (step: number) => void }) {
  return (
    <div className="flex justify-center items-center">
      <ul className="flex">
        <li role={finishedStep > 0 ? 'button' : undefined} onClick={() => onStepClick(0)} className={`flex justify-center items-center after:content-[''] after:w-10 after:h-0.5 after:relative after:-top-3.5 ${finishedStep === 0 ? 'after:bg-yellow-500' : finishedStep >= 1 ? 'after:bg-green-500 cursor-pointer' : 'after:bg-zinc-300 cursor-not-allowed'}`}>
          <p className="w-14 flex flex-col justify-between items-center gap-1 h-full">
            <strong className={`flex flex-col justify-center items-center gap-1 w-14 aspect-square border-2 rounded-full p-2.5 text-2xl ${finishedStep === 0 ? 'border-yellow-500 text-yellow-500' : finishedStep >= 1 ? 'border-green-500 text-green-500' : 'border-zinc-300 text-zinc-300'}`}>
              {finishedStep >= 1 ? <CheckIcon className="w-8 h-8 text-green-500" /> : '1'}
            </strong>
            <strong className={`text-center text-sm leading-3.5 ${finishedStep === 0 ? 'text-yellow-500' : finishedStep >= 1 ? 'text-green-500' : 'text-zinc-300'}`}>
              Select Companion
            </strong>
          </p>
        </li>
        <li role={finishedStep > 1 ? 'button' : undefined} onClick={() => onStepClick(1)} className={`flex justify-center items-center before:content-[''] before:w-10 before:h-0.5 before:relative before:-top-3.5 ${finishedStep === 1 ? 'before:bg-yellow-500' : finishedStep >= 2 ? 'before:bg-green-500 cursor-pointer' : 'before:bg-zinc-300 cursor-not-allowed'}`}>
          <p className="w-14 flex flex-col justify-between items-center gap-1 h-full">
            <strong className={`flex flex-col justify-center items-center gap-1 w-14 aspect-square border-2 rounded-full p-2.5 text-2xl ${finishedStep === 1 ? 'border-yellow-500 text-yellow-500' : finishedStep >= 2 ? 'border-green-500 text-green-500' : 'border-zinc-300 text-zinc-300'}`}>
              {finishedStep >= 2 ? <CheckIcon className="w-8 h-8 text-green-500" /> : '2'}
            </strong>
            <strong className={`text-center text-sm leading-3.5 ${finishedStep === 1 ? 'text-yellow-500' : finishedStep >= 2 ? 'text-green-500' : 'text-zinc-300'}`}>
              Add Skills
            </strong>
          </p>
        </li>
      </ul>
    </div>
  )
}

function CharacterList({ name, isLoading, characters }: { name: string; isLoading: boolean; characters: CharacterDto[] }) {
  return (
    <div className={`flex items-center gap-2 max-w-full min-h-64 rounded-2xl shadow-inset overflow-x-auto p-2.5 ${isLoading ? 'justify-center' : ''}`}>
      {isLoading && <Loader className="w-10 h-10 text-zinc-500 animate-spin" />}
      {!isLoading && characters.length > 0 && characters.map((character) => (
        <CardOption key={character.id} id={character.id} name={name} image={character.image} quantity={character.quantity} in_used={character.in_used} disabled={character.in_used >= character.quantity} onClick={() => { }} className="w-[27.5%] h-auto bg-zinc-100 rounded-lg cursor-pointer" />
      ))}
    </div>
  )
}