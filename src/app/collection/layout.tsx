import NavTab from "@/components/collection/NavTab";

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-[calc(100dvh-90px)] flex flex-col gap-4 w-full overflow-y-auto'>
      <NavTab navItems={[{ label: 'Cards', value: 'cards' }, { label: 'Decks', value: 'decks' }]} />
      {children}
    </div>
  )
}