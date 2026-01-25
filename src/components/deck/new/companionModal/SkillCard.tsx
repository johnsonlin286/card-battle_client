import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";

import Button from "@/components/Button";

interface SkillCardProps {
  skill: SkillDto;
}

export default function SkillCard({ skill }: SkillCardProps) {
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
