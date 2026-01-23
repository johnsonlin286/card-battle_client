import { createPortal } from 'react-dom';
import { XIcon } from 'lucide-react';

interface ModalProps {
  size?: 'sm' | 'md' | 'lg';
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dismissible?: boolean;
}

export default function Modal({ size = 'md', isOpen, onClose, children, dismissible = true }: ModalProps) {
  const sizeClasses = {
    sm: 'md:max-w-md',
    md: 'md:max-w-lg',
    lg: 'md:max-w-xl',
  }[size];

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 backdrop-blur-sm z-50" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className={`relative max-h-[calc(100dvh-2rem)] overflow-y-auto bg-white rounded-2xl border border-zinc-300/20 shadow-md shadow-zinc-300 p-4 w-[calc(100dvw-2rem)] ${sizeClasses}`}>
          {dismissible && <button type="button" onClick={onClose} className="absolute top-2 right-2">
            <XIcon className="w-4 h-4" />
          </button>}
          {children}
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  )
}