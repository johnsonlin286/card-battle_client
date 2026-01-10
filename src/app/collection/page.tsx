'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { QUERY_KEYS } from '@/utils/constant';
import { fetchCollections } from '@/services/collections';
import useCheckIsAuth from '@/hooks/useCheckIsAuth';
import NavTab from '@/components/collection/NavTab';
import ViewCard from '@/components/ViewCard';

export default function CollectionPage() {
  const nextRouter = useRouter();
  const { isAuthenticated } = useCheckIsAuth();
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    return () => {
      setCollections([]);
      setSelectedCard(null);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      nextRouter.push('/login');
      return;
    }
  }, [isAuthenticated]);

  const { data: collectionData, isLoading: isLoadingCollectionData } = useQuery({
    queryKey: [QUERY_KEYS.COLLECTION],
    queryFn: fetchCollections,
    enabled: isAuthenticated === true,
  });

  useEffect(() => {
    if (collectionData) {
      const { success, data } = collectionData;
      if (success) {
        setCollections([...data.characters, ...data.skills, ...data.resources, ...data.supports])
      } else {
        console.log(collectionData);
      }
    }
  }, [collectionData]);

  const handleSelectCard = (card: any) => {
    setSelectedCard(card);
  }
  
  return (
    <>
      <div className="h-[calc(100dvh-90px)] flex flex-col gap-4 w-full overflow-y-auto">
        <NavTab navItems={[{ label: 'Cards', value: 'cards' }, { label: 'Decks', value: 'decks' }]} />
        <div className='grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-2.5 w-full px-6'>
          {collections.length > 0 ? collections.map((collection) => (
            <div key={collection.id} role="button" onClick={() => handleSelectCard(collection)} className='relative w-full h-full bg-zinc-100 rounded-lg cursor-pointer overflow-hidden'>
              <Image src={collection.image} alt={collection.id} width={0} height={0} sizes='100%' loading='lazy' className='w-full h-full object-contain' />
              <span className='absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5'>
                {collection.quantity}
              </span>
            </div>
          )) : (
            <div className='w-full h-full flex justify-center items-center'>
              <p className='text-zinc-500'>No collections found</p>
            </div>
          )}
        </div>
      </div>
      <ViewCard image={selectedCard?.image} isOpen={!!selectedCard} onClose={() => setSelectedCard(null)} />
    </>
  )
}