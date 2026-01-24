import Image from "next/image";

interface CardOptionProps {
  id: string;
  name: string;
  image: string;
  quantity: number;
  in_used: number;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

export default function CardOption({ id, name, image, quantity, in_used, disabled, onClick, className }: CardOptionProps) {
  return (
    <label role="button" onClick={onClick} className={`cursor-pointer ${className}`}>
      <input type="radio" name={name} id={id} value={id} className="hidden peer" disabled={disabled} />
      <div className="relative w-full h-full bg-zinc-100 rounded-lg cursor-pointer overflow-hidden peer-checked:outline-4 peer-checked:outline-red-500 peer-disabled:grayscale">
        <Image src={image} alt={id} width={0} height={0} sizes='100%' loading='lazy' className='w-full h-full object-contain' />
        <span className="absolute bottom-0 right-0 w-fit min-w-10 h-fit bg-black/80 text-white text-sm text-center py-0.5 px-1.5">
          {quantity} / {in_used}
        </span>
      </div>
    </label>
  )
}