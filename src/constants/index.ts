const env = process.env.NODE_ENV

export const server = env == 'development' ? 'http://localhost:3030' : 'https://api.cups.erudiolabs.com'