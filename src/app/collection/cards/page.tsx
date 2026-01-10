'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import Image from 'next/image';

import { QUERY_KEYS } from '@/utils/constant';
import { fetchCollections } from '@/services/collections';
import useCheckIsAuth from '@/hooks/useCheckIsAuth';
import ViewCard from '@/components/ViewCard';

export default function CollectionCardsPage() {
  const { isAuthenticated } = useCheckIsAuth();
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    return () => {
      setCollections([]);
      setSelectedCard(null);
    }
  }, []);

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
      {isLoadingCollectionData ? (
        <div className='w-full h-full flex justify-center items-center'>
          <Loader className='w-10 h-10 text-zinc-500 animate-spin' />
        </div>
      ) : (
        <>
          {collections.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-2.5 w-full px-6 pb-10'>
              {collections.map((collection) => (
                <div key={collection.id} role="button" onClick={() => handleSelectCard(collection)} className='relative w-full h-full bg-zinc-100 rounded-lg cursor-pointer overflow-hidden'>
                  <Image src={collection.image} alt={collection.id} width={0} height={0} sizes='100%' loading='lazy' className='w-full h-full object-contain' />
                  <span className='absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5'>
                    {collection.quantity}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className='w-full h-full flex justify-center items-center'>
              <p className='text-zinc-500'>No collections found</p>
            </div>
          )}
          <ViewCard image={selectedCard?.image} isOpen={!!selectedCard} onClose={() => setSelectedCard(null)} />
        </>
      )}
    </>
  )
}