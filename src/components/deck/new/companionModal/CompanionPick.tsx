import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/constant";
import { fetchCollectionCards, fetchCharacterSkills } from "@/services/collections";
import { useCardsStore } from "@/store/cards";
import Modal from "@/components/Modal";
import Steps from "@/components/deck/new/companionModal/Steps";
import CharacterList from "@/components/deck/new/companionModal/CharacterList";
import SkillList from "@/components/deck/new/companionModal/SkillList";

interface CompanionPickProps {
  name: string;
  companion: PickedCompanion | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: ({name, companion  }: { name: string, companion: PickedCompanion }) => void;
}

export default function CompanionPick({ name, companion, isOpen, onClose, onSubmit }: CompanionPickProps) {
  const [finishedStep, setFinishedStep] = useState<number>(0);
  const [selectedCompanion, setSelectedCompanion] = useState<SelectedCharacter | null>(null);
  const { characterCards, skillCards, setCharacterCards, setSkillCards } = useCardsStore();

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
    enabled: isOpen && characterCards.length === 0,
  });

  const characters = useMemo(() => {
    if (characterCards.length > 0) {
      return characterCards;
    }
    if (charactersData) {
      const { success, data } = charactersData as CardsResponse;
      if (success) {
        return data as CardDto[];
      }
    }
    return [];
  }, [characterCards, charactersData]);
  
  useEffect(() => {
    if (characters.length > 0) {
      setCharacterCards(characters);
    }
  }, [characters])

  const handleSubmitCompanion = useCallback((character: SelectedCharacter) => {
    if (!character) return;
    const characterCard = characterCards.find((card) => card.character_id === character.character_id);
    if (!characterCard) return;
    characterCard.in_used += 1;
    setCharacterCards([...characterCards]);
    setSelectedCompanion(character);
    setFinishedStep(1);
  }, [characterCards]);

  const { data: skillsData, isLoading: isLoadingSkills } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_CHARACTER_SKILLS, selectedCompanion?.character_id],
    queryFn: () => fetchCharacterSkills(selectedCompanion?.character_id || ''),
    enabled: finishedStep === 1 && skillCards.length === 0,
  });

  const skills = useMemo(() => {
    if (skillsData) {
      const { success, data } = skillsData as any;
      if (success) {
        return data as CardDto[];
      }
    }
    return [];
  }, [skillsData]);

  useEffect(() => {
    if (skills.length > 0 && skillCards.length === 0) {
      setSkillCards(skills);
    }
  }, [skills])

  const handleSubmitSkills = useCallback((selectedSkills: SelectedSkill[]) => {
    if (!selectedCompanion || skillCards.length === 0) return;
    // update skillCards in_used by selectedSkills
    setSkillCards(skillCards.map((skill) => selectedSkills.find((selectedSkill) => selectedSkill.skill_id === skill.skill_id) ? { ...skill, in_used: selectedSkills.find((selectedSkill) => selectedSkill.skill_id === skill.skill_id)?.quantity ?? 0 } : skill) as CardDto[]);
    
    onSubmit({ name, companion: { character: selectedCompanion, skills: selectedSkills } });
    handleClose();
  }, [selectedCompanion, skillCards]);

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
            characters={characterCards}
            onSubmit={handleSubmitCompanion}
            onCancel={handleClose}
          />
        )}
        {finishedStep === 1 && (
          <SkillList
            isLoading={isLoadingSkills}
            skills={skillCards}
            onSubmit={handleSubmitSkills}
            onCancel={() => setFinishedStep(0)}
          />
        )}
      </div>
    </Modal>
  )
}
