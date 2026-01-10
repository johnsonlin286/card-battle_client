import { memo, useState } from "react";
import BtnTab from "../BtnTab";

interface NavTabProps {
  navItems: {
    label: string;
    value: string;
  }[];
  onTabChange?: (value: string) => void;
}

function NavTab({ navItems, onTabChange }: NavTabProps) {
  const [activeTab, setActiveTab] = useState('cards');

  const handleClick = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };
  
  return (
    <div className="sticky top-0 z-10">
      <nav className="flex justify-stretch items-center gap-3 bg-white shadow-sm shadow-zinc-300 py-4 px-5">
        {navItems.map((item, index) => (
          <BtnTab key={index} onClick={() => handleClick(item.value)} isActive={activeTab === item.value}>
            {item.label}
          </BtnTab>
        ))}
      </nav>
    </div>
  );
}

export default memo(NavTab);