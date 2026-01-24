import { PencilIcon } from "lucide-react";

import Button from "@/components/Button";

interface CardsGroupProps {
  title: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function CardsGroup({ title, onClick, children }: CardsGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>
        <Button type="button" color="none" onClick={onClick}>
          <PencilIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex gap-4 rounded-2xl min-h-32 shadow-inset p-4">
        {children}
      </div>
    </div>
  )
}