'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader, Plus } from 'lucide-react';

import DeckItem from '@/components/deck/deckItem';
import Button from '@/components/Button';

export default function CollectionDecksPage() {
  const [decks, setDecks] = useState<any[]>([]);

  const handleSelectDeck = (deck: any) => {
    console.log(deck);
  }

  return (
    // <div className='w-full h-full flex justify-center items-center'>
    //   <Loader className='w-10 h-10 text-zinc-500 animate-spin' />
    // </div>
    <div className="relative w-full h-full">
      {decks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 w-full px-6 pb-10">
            {decks.map((deck) => (
              <DeckItem key={deck.id} name={deck.name} win={deck.win} lose={deck.lose} onClick={() => handleSelectDeck(deck)} />
            ))}
          </div>
          <Button type="link" href="/collection/decks/new" color="primary" className="sticky flex justify-center items-center gap-2 w-fit bottom-5 left-full -translate-x-5">
            <Plus className="relative inline-block size-4 -top-0.5 mr-2" />
            New Deck
          </Button>
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <p className="text-zinc-500">You don't have any decks yet, create your first deck!</p>
          <Button type="link" href="/collection/decks/new" color="primary" className="w-fit">
            <Plus className="relative inline-block size-4 -top-0.5 mr-2" />
            New Deck
          </Button>
        </div>
      )}
    </div>
  )
}