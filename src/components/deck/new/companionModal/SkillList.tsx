import { Loader } from "lucide-react";

import SkillCard from "./SkillCard";

interface SkillListProps {
  isLoading: boolean;
  skills: SkillDto[];
}

export default function SkillList({ isLoading, skills }: SkillListProps) {
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
