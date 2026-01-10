'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface ViewCardProps {
  image?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewCard({ image, isOpen, onClose }: ViewCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  }
  
  if (!isVisible || !image) return null;

  return createPortal (
    <>
      <div onClick={handleClose} className='fixed inset-0 backdrop-blur-sm z-50'/>
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={image} alt='card' width={0} height={0} sizes='100%' loading='lazy' className='w-full max-w-full h-full object-contain rounded-2xl shadow-2xl' />
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  )
}