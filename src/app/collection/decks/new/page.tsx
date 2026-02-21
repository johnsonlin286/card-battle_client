'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Breadcrumb from '@/components/Breadcrumb';
import TextInput from '@/components/TextInput';
import CardsGroup from '@/components/deck/new/CardsGroup';
import CompanionPick from '@/components/deck/new/companionModal/CompanionPick';
import SupportPick from '@/components/deck/new/companionModal/SupportPick';
import ResourcePick from '@/components/deck/new/companionModal/ResourcePick';
import Button from '@/components/Button';
import ViewCard from '@/components/ViewCard';

const BREADCRUMB_ITEMS = [
  { label: 'Decks', href: '/collection/decks' },
  { label: 'New Deck' },
];

type ModalType = 'companion-a' | 'companion-b' | 'skill' | 'resource' | 'support';

export default function CollectionDecksNewPage() {
  const nextRouter = useRouter();
  const [deckName, setDeckName] = useState<string>('New Deck 1');
  const [modalType, setModalType] = useState<ModalType | undefined>();
  const [companionA, setCompanionA] = useState<PickedCompanion | null>(null);
  const [companionB, setCompanionB] = useState<PickedCompanion | null>(null);
  const [supports, setSupports] = useState<SelectedSupport[]>([]);
  const [resources, setResources] = useState<SelectedResource[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleSubmitCompanion = ({ name, companion }: { name: string, companion: PickedCompanion }) => {
    if (name === 'Companion A') {
      setCompanionA(companion);
    } else if (name === 'Companion B') {
      setCompanionB(companion);
    }
  }

  return (
    <div className="flex flex-col gap-6 px-6 pb-10">
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <TextInput id="name" label="Deck Name" type="text" name="name" value={deckName} placeholder="Enter your deck name" required={true} onChange={setDeckName} className="w-full max-w-md" />
      <hr className="border-zinc-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardsGroup title="Companion A" onClick={() => setModalType('companion-a')}>
          {companionA && (
            <div className="h-full flex flex-nowrap items-center gap-2">
              <div role="button" onClick={() => setSelectedCard(companionA.character.image)} className="relative w-auto h-full cursor-pointer">
                <Image src={companionA.character.image} alt={companionA.character.character_id} width={0} height={0} sizes='100%' loading='lazy' className="w-auto h-full object-contain rounded-lg" />
              </div>
              {companionA.skills.map((skill) => (
                <div key={skill.skill_id} role="button" onClick={() => setSelectedCard(skill.image)} className="relative w-auto h-full cursor-pointer">
                  <Image src={skill.image} alt={skill.skill_id} width={0} height={0} sizes='100%' loading='lazy' className='w-auto h-full object-contain rounded-lg' />
                  <span className="absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5">
                    {skill.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardsGroup>
        <CardsGroup title="Companion B" onClick={() => setModalType('companion-b')}>
          {companionB && (
            <div className="h-full flex flex-nowrap items-center gap-2">
              <div role="button" onClick={() => setSelectedCard(companionB.character.image)} className="relative w-auto h-full cursor-pointer">
                <Image src={companionB.character.image} alt={companionB.character.character_id} width={0} height={0} sizes='100%' loading='lazy' className="w-auto h-full object-contain rounded-lg" />
              </div>
              {companionB.skills.map((skill) => (
                <div key={skill.skill_id} role="button" onClick={() => setSelectedCard(skill.image)} className="relative w-auto h-full cursor-pointer">
                  <Image src={skill.image} alt={skill.skill_id} width={0} height={0} sizes='100%' loading='lazy' className='w-auto h-full object-contain rounded-lg' />
                  <span className="absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5">
                    {skill.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardsGroup>
      </div>
      <hr className="border-zinc-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardsGroup title="Resources" onClick={() => setModalType('resource')}>
          <div className="h-full flex flex-nowrap items-center gap-2">
            {resources.map((resource) => (
              <div key={resource.resource_id} role="button" onClick={() => setSelectedCard(resource.image)} className="relative w-auto h-full cursor-pointer">
                <Image src={resource.image} alt={resource.resource_id} width={0} height={0} sizes='100%' loading='lazy' className='w-auto h-full object-contain rounded-lg' />
                <span className="absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5">
                  {resource.quantity}
                </span>
              </div>
            ))}
          </div>
        </CardsGroup>
        <CardsGroup title="Supports" onClick={() => setModalType('support')}>
          <div className="h-full flex flex-nowrap items-center gap-2">
            {supports.map((support) => (
              <div key={support.support_id} role="button" onClick={() => setSelectedCard(support.image)} className="relative w-auto h-full cursor-pointer">
                <Image src={support.image} alt={support.support_id} width={0} height={0} sizes='100%' loading='lazy' className='w-auto h-full object-contain rounded-lg' />
                <span className="absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5">
                  {support.quantity}
                </span>
              </div>
            ))}
          </div>
        </CardsGroup>
      </div>
      <hr className="border-zinc-300" />
      <div className="flex justify-end gap-2">
        <Button type="button" color="none" onClick={() => nextRouter.back()}>
          Cancel
        </Button>
        <Button type="button" color="primary" onClick={() => console.log('create deck')}>
          Create Deck
        </Button>
      </div>
      <CompanionPick
        name={`Companion ${modalType === 'companion-a' ? 'A' : modalType === 'companion-b' ? 'B' : ''}`}
        companion={modalType === 'companion-a' ? companionA : modalType === 'companion-b' ? companionB : null}
        isOpen={modalType === 'companion-a' || modalType === 'companion-b'}
        onClose={() => setModalType(undefined)}
        onSubmit={handleSubmitCompanion}
      />
      <SupportPick isOpen={modalType === 'support'} onClose={() => setModalType(undefined)} onSubmit={setSupports} />
      <ResourcePick isOpen={modalType === 'resource'} onClose={() => setModalType(undefined)} onSubmit={setResources} />
      <ViewCard image={selectedCard || undefined} isOpen={!!selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  )
}