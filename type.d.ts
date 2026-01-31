type ErrorResponse = {
  success: boolean;
  message: string;
}

type SelectOption = {
  value: string;
  label: string;
}

type fetchStatePayload = {
  name?: string;
  page?: number;
  limit?: number;
}

type registerUserPayload = {
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
  country: string;
}

type loginUserPayload = {
  email: string;
  password: string;
}

type loginUserResponse = {
  token: string;
  refresh_token: string;
}

type Toast = {
  id?: string;
  message: React.ReactNode;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

type AccountType = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  sex: string;
  date_of_birth: string;
  country: string;
  avatar: string;
  is_active: boolean;
  gold: number;
  energy: number;
  token: number;
  created_at: string;
  updated_at: string;
}

type CardDto = {
  id: string;
  [key: string]: any; // character_id, resource_id, support_id
  image: string;
  quantity: number;
  in_used: number;
}

type CardsResponse = {
  success: boolean;
  data: CardDto[];
}

type CharacterDto = {
  id: string;
  character_id: string;
  image: string;
  quantity: number;
  in_used: number;
}

type CharactersResponse = {
  success: boolean;
  data: CharacterDto[];
}

type SelectedCharacter = {
  character_id: string;
  image: string;
}

type SkillDto = {
  id: string;
  skill_id: string;
  image: string;
  quantity: number;
  in_used: number;
}

type SkillsResponse = {
  success: boolean;
  data: SkillDto[];
}

type SelectedSkill = {
  skill_id: string;
  image: string;
  quantity: number;
}

type PickedCompanion = {
  character: SelectedCharacter;
  skills: SelectedSkill[];
}

// New Deck
type Companion = {
  character: SelectOption;
  skills: SelectedSkill[];
}