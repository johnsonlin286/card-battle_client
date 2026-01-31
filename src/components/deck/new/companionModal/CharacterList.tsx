import { useState, useCallback } from "react";
import { Loader } from "lucide-react";

import CharacterOption from "@/components/deck/new/companionModal/CharacterOption";
import Button from "@/components/Button";
interface CharacterListProps {
  name: string;
  isLoading: boolean;
  characters: CardDto[];
  onSubmit: (character: SelectedCharacter) => void;
  onCancel: () => void;
}

export default function CharacterList({ name, isLoading, characters, onSubmit, onCancel }: CharacterListProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<SelectedCharacter | null>(null);

  const handleSelectCharacter = useCallback((id: string) => {
    const character = characters.find((c) => c.character_id === id);
    if (!character || character.in_used >= character.quantity) return;
    setSelectedCharacter({ character_id: character.character_id, image: character.image });
  }, [characters]);

  const submitSelectedCharacter = () => {
    if (!selectedCharacter) return;
    onSubmit(selectedCharacter);
  }

  return (
    <>
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
            onClick={() => handleSelectCharacter(character.character_id)}
            className="w-[27.5%] h-auto bg-zinc-100 rounded-lg cursor-pointer"
          />
        ))}
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button type="button" color="none" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" color="primary" onClick={submitSelectedCharacter}>
          Next
        </Button>
      </div>
    </>
  )
}
