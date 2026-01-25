import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/constant";
import { fetchCharacters, fetchCharacterSkills } from "@/services/collections";
import { useToastStore } from "@/store/toast";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Steps from "./Steps";
import CharacterList from "./CharacterList";
import SkillList from "./SkillList";

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
