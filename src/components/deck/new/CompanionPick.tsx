import { useState, useEffect, useCallback, useMemo } from "react";
import { CheckIcon, Loader, MinusIcon, PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { QUERY_KEYS } from "@/utils/constant";
import { fetchCharacters, fetchCharacterSkills } from "@/services/collections";
import { useToastStore } from "@/store/toast";
import Modal from "@/components/Modal";
import CardOption from "@/components/deck/new/CardOption";
import Button from "@/components/Button";

interface CompanionPickProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function CompanionPick({ name, isOpen, onClose, onSubmit }: CompanionPickProps) {
  const [finishedStep, setFinishedStep] = useState<number>(0);
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null);
  const { addToast } = useToastStore();

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFinishedStep(0);
      setSelectedCompanion(null);
    }
  }, [isOpen]);

  const { data: charactersData, isLoading: isLoadingCharacters } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_CHARACTERS],
    queryFn: fetchCharacters,
    enabled: isOpen,
  });

  const characters = useMemo(() => {
    if (charactersData) {
      const { success, data } = charactersData as CharactersResponse;
      if (success) {
        return data as CharacterDto[];
      }
    }
    return [];
  }, [charactersData]);

  const handleSelectCompanion = useCallback((id: string) => {
    const character = characters.find((c) => c.character_id === id);
    if (!character || character.in_used >= character.quantity) return;
    setSelectedCompanion(character.character_id);
  }, [characters, selectedCompanion]);

  const { data: skillsData, isLoading: isLoadingSkills } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_CHARACTER_SKILLS, selectedCompanion],
    queryFn: () => fetchCharacterSkills(selectedCompanion || ''),
    enabled: !!selectedCompanion && finishedStep === 1,
  });

  const skills = useMemo(() => {
    if (skillsData) {
      const { success, data } = skillsData as any;
      if (success) {
        return data as SkillDto[];
      }
    }
    return [];
  }, [skillsData]);

  const handleNextStep = () => {
    if (finishedStep === 0) {
      setFinishedStep(1);
    } else if (finishedStep === 1) {
      setFinishedStep(2);
      // onSubmit();
    }
  };

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Modal size="xl" isOpen={isOpen} dismissible={false} onClose={handleClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center capitalize">{name}</h2>
        <Steps finishedStep={finishedStep} onStepClick={setFinishedStep} />
        {finishedStep === 0 && (
          <CharacterList
            name={name}
            isLoading={isLoadingCharacters}
            characters={characters}
            onSelect={handleSelectCompanion}
          />
        )}
        {finishedStep >= 1 && (
          <SkillList isLoading={isLoadingSkills} skills={skills} />
        )}
        <div className="flex justify-end items-center gap-2">
          {finishedStep === 0 && (
            <Button type="button" color="none" onClick={handleClose}>
              Cancel
            </Button>
          )}
          {finishedStep === 1 && (
            <Button type="button" color="none" onClick={() => setFinishedStep(0)}>
              Back
            </Button>
          )}
          <Button type="button" color="primary" onClick={handleNextStep}>
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

interface CharacterListProps {
  name: string;
  isLoading: boolean;
  characters: CharacterDto[];
  onSelect: (id: string) => void;
}

function CharacterList({ name, isLoading, characters, onSelect }: CharacterListProps) {
  return (
    <div className={`flex items-center gap-2 max-w-full min-h-64 rounded-2xl shadow-inset overflow-x-auto p-2.5 ${isLoading || characters.length === 0 ? 'justify-center' : ''}`}>
      {isLoading && <Loader className="w-10 h-10 text-zinc-500 animate-spin" />}
      {!isLoading && characters.length > 0 && characters.map((character) => (
        <CardOption
          key={character.id}
          id={character.id}
          name={name}
          image={character.image}
          quantity={character.quantity}
          in_used={character.in_used}
          disabled={character.in_used > character.quantity}
          onClick={() => onSelect(character.character_id)}
          className="w-[27.5%] h-auto bg-zinc-100 rounded-lg cursor-pointer"
        />
      ))}
    </div>
  )
}

interface SkillListProps {
  isLoading: boolean;
  skills: SkillDto[];
}

function SkillList({ isLoading, skills }: SkillListProps) {
  return (
    <div className={`relative grid grid-cols-2 md:grid-cols-3 gap-2 w-full min-h-64 max-h-[60dvh] overflow-y-auto rounded-2xl shadow-inset p-2.5 ${isLoading || skills.length === 0 ? 'grid-cols-1' : ''}`}>
      {isLoading && <div className="absolute inset-0 flex justify-center items-center">
        <Loader className="w-10 h-10 text-zinc-500 animate-spin" />
      </div>}
      {!isLoading && skills.length > 0 && skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  )
}

interface SkillCardProps {
  skill: SkillDto;
}

function SkillCard({ skill }: SkillCardProps) {
  const [usedQuantity, setUsedQuantity] = useState<number>(0);

  const handleDecreaseQuantity = () => {
    setUsedQuantity(Math.max(usedQuantity - 1, 0));
  }

  const handleIncreaseQuantity = () => {
    setUsedQuantity(Math.min(usedQuantity + 1, skill.quantity));
  }

  return (
    <div className="flex flex-col justify-between w-full h-full rounded-lg bg-white shadow-md">
      <div className="relative w-full h-full">
        <Image src={skill.image} alt={skill.skill_id} width={0} height={0} sizes='100%' loading='lazy' className='w-full h-full object-contain rounded-lg' />
        <span className="absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5">
          stock: {skill.quantity - skill.in_used}
        </span>
      </div>
      <div className="flex justify-between items-center p-2.5 gap-2">
        <Button type="button" color="primary" onClick={handleDecreaseQuantity} spanStyle="!p-1.5">
          <MinusIcon className="w-4 h-4" />
        </Button>
        <strong className="flex-1 text-center text-lg">
          {usedQuantity}
        </strong>
        <Button type="button" color="primary" onClick={handleIncreaseQuantity} spanStyle="!p-1.5">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}