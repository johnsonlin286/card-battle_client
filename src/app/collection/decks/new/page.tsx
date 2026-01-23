'use client';

import { useState, useEffect } from 'react';
import { PencilIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils/constant';
import { fetchCharacters } from '@/services/collections';
import Breadcrumb from '@/components/Breadcrumb';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

const BREADCRUMB_ITEMS = [
  { label: 'Decks', href: '/collection/decks' },
  { label: 'New Deck' },
];

interface Companion {
  character: string;
  skills: string[];
}

type ModalType = 'character' | 'skill' | 'resource' | 'support';

export default function CollectionDecksNewPage() {
  const [deckName, setDeckName] = useState<string>('New Deck 1');
  const [modalType, setModalType] = useState<ModalType | undefined>();
  const [characters, setCharacters] = useState<CharacterDto[]>([]);
  const [companionA, setCompanionA] = useState<Companion | null>(null);
  const [companionB, setCompanionB] = useState<Companion | null>(null);

  const { data: charactersData,  } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION_CHARACTERS],
    queryFn: fetchCharacters,
    enabled: modalType === 'character',
  })

  useEffect(() => {
    if (charactersData) {
      if ('error' in charactersData) {
        // TODO: Handle error
      } else {
        const { data } = charactersData as CharactersResponse;
        setCharacters(data);
      }
    }
  }, [charactersData])

  return (
    <div className="flex flex-col gap-6 px-6 pb-10">
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <TextInput id="name" label="Deck Name" type="text" name="name" value={deckName} placeholder="Enter your deck name" required={true} onChange={(value) => null} className="w-full max-w-md" />
      <hr className="border-zinc-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              Companion A
            </h2>
            <Button type="button" color="none" onClick={() => setModalType('character')}>
              <PencilIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 rounded-2xl min-h-32 shadow-inset p-4"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              Companion B
            </h2>
            <Button type="button" color="none">
              <PencilIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 rounded-2xl min-h-32 shadow-inset p-4"></div>
        </div>
      </div>
      <hr className="border-zinc-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              Resources
            </h2>
            <Button type="button" color="none">
              <PencilIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 rounded-2xl min-h-32 shadow-inset p-4"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              Supports
            </h2>
            <Button type="button" color="none">
              <PencilIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 rounded-2xl min-h-32 shadow-inset p-4"></div>
        </div>
      </div>
      <hr className="border-zinc-300" />
      <div className="flex justify-end">
        <Button type="button" color="none">
          Cancel
        </Button>
        <Button type="button" color="primary">
          Create Deck
        </Button>
      </div>
      <Modal size="lg" isOpen={modalType !== undefined } onClose={() => setModalType(undefined)}>
        {characters.length > 0 && (
          <pre>{JSON.stringify(characters, null, 2)}</pre>
        )}
      </Modal>
    </div>
  )
}