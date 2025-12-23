const DEVELOPMENT = true;

const DEVELOPMENT_ORIGIN = 'http://localhost:8000';

export const LIVE_ORIGIN = DEVELOPMENT ? DEVELOPMENT_ORIGIN : window.location.origin
 
const DEVELOPMENT_SERVER = new URL('/api/', DEVELOPMENT_ORIGIN).toString();

const PRODUCTION_SERVER = new URL('/api/', window.location.origin);
 
export const BASE_URL = DEVELOPMENT ? DEVELOPMENT_SERVER : PRODUCTION_SERVER;