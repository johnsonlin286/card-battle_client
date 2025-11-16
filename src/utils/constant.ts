const API_URL = process.env.NEXT_PUBLIC_API_URL

const QUERY_KEYS = {
  ACCOUNT: 'account',
  STATE: 'state',
}

const MUTATION_KEYS = {
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout',
}

export { API_URL, QUERY_KEYS, MUTATION_KEYS }