import { memo, useMemo } from "react";

interface BtnTabProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
}

const BASE_CLASSES = 'block w-full bg-white border border-zinc-300 rounded-full flex justify-center items-center cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed p-1';
// Replaced oklch() with hex - Chrome 144 may have oklch rendering bug
const ACTIVE_SHADOW_CLASS = 'bg-zinc-50 shadow-[inset_0_0_8px_#d4d4d8]';

function BtnTab({ children, onClick, disabled, isActive }: BtnTabProps) {
  const className = useMemo(
    () => isActive ? `${BASE_CLASSES} ${ACTIVE_SHADOW_CLASS}` : BASE_CLASSES,
    [isActive]
  );

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default memo(BtnTab);