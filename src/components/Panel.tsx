interface PanelProps {
  className?: string;
  children: React.ReactNode;
}

export default function Panel({ className, children }: PanelProps) {
  return (
    <div className={`relative bg-white rounded-2xl border border-zinc-300/20 shadow-md shadow-zinc-300 p-4 before:content-[''] before:absolute before:w-full before:h-3/4 before:[clip-path:polygon(0_0,100%_0,60%_100%,0_100%)] before:rounded-t-2xl before:bg-linear-to-bl before:from-sky-500/20 before:via-white before:via-60% before:to-transparent before:top-0 before:left-0 ${className}`}>
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
}

// polygon(0 0, 100% 0%, 75% 100%, 0% 100%)