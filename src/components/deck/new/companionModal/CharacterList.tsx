import { Loader } from "lucide-react";

import CharacterOption from "@/components/deck/new/companionModal/CharacterOption";

interface CharacterListProps {
  name: string;
  isLoading: boolean;
  characters: CharacterDto[];
  onSelect: (id: string) => void;
}

export default function CharacterList({ name, isLoading, characters, onSelect }: CharacterListProps) {
  return (
    <div className={`flex items-center gap-2 max-w-full min-h-64 rounded-2xl shadow-inset overflow-x-auto p-2.5 ${isLoading || characters.length === 0 ? 'justify-center' : ''}`}>
      {isLoading && <Loader className="w-10 h-10 text-zinc-500 animate-spin" />}
      {!isLoading && characters.length > 0 && characters.map((character) => (
        <CharacterOption
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
