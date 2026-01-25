const API_URL = process.env.NEXT_PUBLIC_API_URL

const NO_HEADER_ROUTES = [
  '/login',
  '/register',
]

const QUERY_KEYS = {
  ACCOUNT: 'account',
  STATE: 'state',
  COLLECTION: 'collection',
  COLLECTION_CHARACTERS: 'collection-characters',
  COLLECTION_CHARACTER_SKILLS: 'collection-character-skills',
}

const MUTATION_KEYS = {
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout',
}

export { API_URL, NO_HEADER_ROUTES, QUERY_KEYS, MUTATION_KEYS }