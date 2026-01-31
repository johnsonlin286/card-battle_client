import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/constant";
import { fetchCollectionCards, fetchCharacterSkills } from "@/services/collections";
import { useToastStore } from "@/store/toast";
import Modal from "@/components/Modal";
import Steps from "./Steps";
import CharacterList from "./CharacterList";
import SkillList from "./SkillList";

interface CompanionPickProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: ({name, companion  }: { name: string, companion: PickedCompanion }) => void;
}

export default function CompanionPick({ name, isOpen, onClose, onSubmit }: CompanionPickProps) {
  const [finishedStep, setFinishedStep] = useState<number>(0);
  const [selectedCompanion, setSelectedCompanion] = useState<SelectedCharacter | null>(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFinishedStep(0);
      setSelectedCompanion(null);
    }
  }, [isOpen]);

  const { data: charactersData, isLoading: isLoadingCharacters } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_CHARACTERS],
    queryFn: () => fetchCollectionCards('characters'),
    enabled: isOpen,
  });

  const characters = useMemo(() => {
    if (charactersData) {
      const { success, data } = charactersData as CardsResponse;
      if (success) {
        return data as CardDto[];
      }
    }
    return [];
  }, [charactersData]);

  const handleSubmitCompanion = useCallback((character: SelectedCharacter) => {
    if (!character) return;
    setSelectedCompanion(character);
    setFinishedStep(1);
  }, []);

  const { data: skillsData, isLoading: isLoadingSkills } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_CHARACTER_SKILLS, selectedCompanion?.character_id],
    queryFn: () => fetchCharacterSkills(selectedCompanion?.character_id || ''),
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

  const handleSubmitSkills = useCallback((skills: SelectedSkill[]) => {
    if (!selectedCompanion || skills.length === 0) return;
    onSubmit({ name, companion: { character: selectedCompanion, skills } });
    handleClose();
  }, [selectedCompanion]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    console.log(selectedCompanion);
  }, [selectedCompanion]);

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
            onSubmit={handleSubmitCompanion}
            onCancel={handleClose}
          />
        )}
        {finishedStep >= 1 && (
          <SkillList
            isLoading={isLoadingSkills}
            skills={skills}
            onSubmit={handleSubmitSkills}
            onCancel={() => setFinishedStep(0)}
          />
        )}
      </div>
    </Modal>
  )
}
