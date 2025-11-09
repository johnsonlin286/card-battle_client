interface PanelProps {
  className?: string;
  children: React.ReactNode;
}

export default function Panel({ className, children }: PanelProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  )
}
