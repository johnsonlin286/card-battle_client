'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import Image from 'next/image';

import { QUERY_KEYS } from '@/utils/constant';
import { fetchCollections } from '@/services/collections';
import { useToastStore } from '@/store/toast';
import useCheckIsAuth from '@/hooks/useCheckIsAuth';
import useLogout from '@/hooks/useLogout';
import ViewCard from '@/components/ViewCard';

export default function CollectionCardsPage() {
  const nextRouter = useRouter();
  const { isAuthenticated } = useCheckIsAuth();
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const { clearAuthData } = useLogout();
  const { addToast } = useToastStore();

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
      const { success, data, error } = collectionData;
      if (success) {
        const characters = data.characters || []
        const skills = data.skills || []
        const resources = data.resources || []
        const supports = data.supports || []
        const characterAndSkills: any[] = [];
        
        // For each character, add the character first, then all its skills
        characters.forEach((character: any) => {
          // Add the character
          characterAndSkills.push(character);
          
          // Find and add all skills that belong to this character
          skills.forEach((skill: any) => {
            if (character.id === skill.character_id) {
              characterAndSkills.push(skill);
            }
          });
        });
        
        // Add resources and supports at the end
        const finalCollections = [...characterAndSkills, ...resources, ...supports];
        
        setCollections(finalCollections)
      } else {
        if (error === 'Token expired and refresh failed. Please login again.') {
          clearAuthData();
          nextRouter.push('/login');
        }
        addToast({
          message: error,
          variant: 'error',
        });
      }
    }
  }, [collectionData]);

  const handleSelectCard = (card: any) => {
    setSelectedCard(card);
  }
  return (
    <>
      {isLoadingCollectionData ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader className="w-10 h-10 text-zinc-500 animate-spin" />
        </div>
      ) : (
        <>
          {collections.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-2.5 w-full px-6 pb-10">
              {collections.map((collection) => (
                <div key={collection.id} role="button" onClick={() => handleSelectCard(collection)} className="relative w-full h-full bg-zinc-100 rounded-lg cursor-pointer overflow-hidden">
                  <Image src={collection.image} alt={collection.id} width={0} height={0} sizes='100%' loading='lazy' className='w-full h-full object-contain' />
                  <span className="absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5">
                    {collection.quantity}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-zinc-500">No collections found</p>
            </div>
          )}
          <ViewCard image={selectedCard?.image} isOpen={!!selectedCard} onClose={() => setSelectedCard(null)} />
        </>
      )}
    </>
  )
}