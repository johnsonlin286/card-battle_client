'use client';

import { useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import CardsGroup from '@/components/deck/new/CardsGroup';
import CompanionPick from '@/components/deck/new/CompanionPick';

const BREADCRUMB_ITEMS = [
  { label: 'Decks', href: '/collection/decks' },
  { label: 'New Deck' },
];

type ModalType = 'companion-a' | 'companion-b' | 'skill' | 'resource' | 'support';

export default function CollectionDecksNewPage() {
  const [deckName, setDeckName] = useState<string>('New Deck 1');
  const [modalType, setModalType] = useState<ModalType | undefined>();
  const [companionA, setCompanionA] = useState<Companion | null>(null);
  const [companionB, setCompanionB] = useState<Companion | null>(null);

  return (
    <div className="flex flex-col gap-6 px-6 pb-10">
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <TextInput id="name" label="Deck Name" type="text" name="name" value={deckName} placeholder="Enter your deck name" required={true} onChange={(value) => null} className="w-full max-w-md" />
      <hr className="border-zinc-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardsGroup title="Companion A" onClick={() => setModalType('companion-a')}>
          
        </CardsGroup>
        <CardsGroup title="Companion B" onClick={() => setModalType('companion-b')}>
          
        </CardsGroup>
      </div>
      <hr className="border-zinc-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardsGroup title="Supports" onClick={() => setModalType('support')}>

        </CardsGroup>
        <CardsGroup title="Resources" onClick={() => setModalType('resource')}>
          
        </CardsGroup>
      </div>
      <hr className="border-zinc-300" />
      <div className="flex justify-end gap-2">
        <Button type="button" color="none">
          Cancel
        </Button>
        <Button type="button" color="primary">
          Create Deck
        </Button>
      </div>
      <CompanionPick
        name={`Companion ${modalType === 'companion-a' ? 'A' : modalType === 'companion-b' ? 'B' : ''}`}
        data={modalType === 'companion-a' ? companionA : modalType === 'companion-b' ? companionB : null}
        isOpen={modalType === 'companion-a' || modalType === 'companion-b'}
        onClose={() => setModalType(undefined)}
        onSubmit={() => null}
      />
    </div>
  )
}