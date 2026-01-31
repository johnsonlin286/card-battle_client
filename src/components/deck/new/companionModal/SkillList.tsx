import { useState } from "react";
import { Loader } from "lucide-react";

import SkillCard from "./SkillCard";
import Button from "@/components/Button";

interface SkillListProps {
  isLoading: boolean;
  skills: SkillDto[];
  onSubmit: (skills: SelectedSkill[]) => void;
  onCancel: () => void;
}

export default function SkillList({ isLoading, skills, onSubmit, onCancel }: SkillListProps) {
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);

  const skillCardsHandlers = (skillId: string, quantity: number) => {
    const selectedSkill = selectedSkills.find((skill) => skill.skill_id === skillId);
    if (selectedSkill) {
      setSelectedSkills(selectedSkills.map((skill) => skill.skill_id === skillId ? { ...skill, quantity } : skill));
    } else {
      const skillImage = skills.find((skill) => skill.skill_id === skillId)?.image || '';
      setSelectedSkills([...selectedSkills, { skill_id: skillId, image: skillImage, quantity }]);
    }
  }

  const submitSelectedSkills = () => {
    onSubmit(selectedSkills);
  }

  return (
    <>
      <div className={`relative grid grid-cols-2 md:grid-cols-3 gap-2 w-full min-h-64 max-h-[60dvh] overflow-y-auto rounded-2xl shadow-inset p-2.5 ${isLoading || skills.length === 0 ? 'grid-cols-1' : ''}`}>
        {isLoading && <div className="absolute inset-0 flex justify-center items-center">
          <Loader className="w-10 h-10 text-zinc-500 animate-spin" />
        </div>}
        {!isLoading && skills.length > 0 && skills.map((skill) => (
          <SkillCard key={skill.skill_id} skill={skill} maxQuantity={3} onChange={skillCardsHandlers} />
        ))}
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button type="button" color="none" onClick={onCancel}>
          Previous
        </Button>
        <Button type="button" color="primary" onClick={submitSelectedSkills}>
          Save
        </Button>
      </div>
    </>
  )
}
