import Panel from "../Panel";

interface DeckItemProps {
  name: string;
  win: number;
  lose: number;
  onClick?: () => void;
}

export default function DeckItem({ name, win, lose, onClick }: DeckItemProps) {
  return (
    <div role="button" onClick={onClick} className="cursor-pointer">
      <Panel>
        <div className="flex flex-col gap-4">
          <div className="w-full h-full rounded-lg shadow-inset overflow-hidden p-2"></div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-zinc-500">{name}</p>
            <ul className="flex justify-between items-center">
              <li className="flex justify-center items-center gap-1 text-sm">
                <span className="inline-block rounded-full">Win:</span>
                <strong className=" text-zinc-500">{win}</strong>
              </li>
              <li className="flex justify-center items-center gap-1 text-sm">
                <span className="inline-block rounded-full">Lose:</span>
                <strong className=" text-zinc-500">{lose}</strong>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  )
}