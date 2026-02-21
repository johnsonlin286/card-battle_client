import { useState, useEffect } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";

import useDebounce from "@/hooks/useDebounce";
import Button from "@/components/Button";
import ViewCard from "@/components/ViewCard";

interface CardPickProps {
  type: 'character' | 'skill' | 'resource' | 'support';
  card: CardDto;
  maxQuantity: number;
  onChange: (id: string, quantity: number) => void;
}

export default function CardPick({ type, card, maxQuantity, onChange }: CardPickProps) {
  const [usedQuantity, setUsedQuantity] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const debouncedQuantity = useDebounce(usedQuantity, 500);

  const handleDecreaseQuantity = () => {
    setUsedQuantity(Math.max(usedQuantity - 1, 0));
  }

  const handleIncreaseQuantity = () => {
    if (usedQuantity >= (card.quantity - card.in_used)) return;
    setUsedQuantity(Math.min(usedQuantity + 1,  maxQuantity));
  }

  useEffect(() => {
    onChange(card[type + '_id'], debouncedQuantity);
  }, [debouncedQuantity]);

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full rounded-lg bg-white shadow-md">
        <div role="button" onClick={() => setSelectedCard(card.image)} className="relative w-full h-full">
          <Image src={card.image} alt={card.image} width={0} height={0} sizes='100%' loading='lazy' className='w-full h-full object-contain rounded-lg' />
          <span className="absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5">
            stock: {card.quantity - card.in_used}
          </span>
        </div>
        <div className="flex justify-between items-center p-2.5 gap-2">
          <Button type="button" color="primary" onClick={handleDecreaseQuantity} spanStyle="!p-1.5">
            <MinusIcon className="w-4 h-4" />
          </Button>
          <strong className="flex-1 text-center text-lg">
            {usedQuantity} / {maxQuantity}
          </strong>
          <Button type="button" color="primary" onClick={handleIncreaseQuantity} spanStyle="!p-1.5">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <ViewCard image={selectedCard || undefined} isOpen={!!selectedCard} onClose={() => setSelectedCard(null)} />
    </>
  )
}
