import { create } from "zustand";

interface CardsStore {
  characterCards: CardDto[];
  skillCards: CardDto[];
  resourceCards: CardDto[];
  supportCards: CardDto[];
  setCharacterCards: (characterCards: CardDto[]) => void;
  setSkillCards: (skillCards: CardDto[]) => void;
  setResourceCards: (resourceCards: CardDto[]) => void;
  setSupportCards: (supportCards: CardDto[]) => void;
}

export const useCardsStore = create<CardsStore>((set) => ({
  characterCards: [],
  skillCards: [],
  resourceCards: [],
  supportCards: [],
  setCharacterCards: (characterPayload) => set({ characterCards: characterPayload }),
  setSkillCards: (skillPayload) => set({ skillCards: skillPayload }),
  setResourceCards: (resourcePayload) => set({ resourceCards: resourcePayload }),
  setSupportCards: (supportPayload) => set({ supportCards: supportPayload }),
}));