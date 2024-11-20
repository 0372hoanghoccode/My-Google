import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CACHE_DURATION = 1000 * 60 * 5; 

const searchCache = new Map();

const params = {
  key: import.meta.env.VITE_API_KEY,
  cx: import.meta.env.VITE_CX,
};

const rateLimiter = {
  tokens: 100,
  lastRefill: Date.now(),
  refillRate: 100, 
  refillInterval: 1000, 
};

const refillTokens = () => {
  const now = Date.now();
  const timePassed = now - rateLimiter.lastRefill;
  const tokensToAdd = Math.floor((timePassed / rateLimiter.refillInterval) * rateLimiter.refillRate);
  
  if (tokensToAdd > 0) {
    rateLimiter.tokens = Math.min(100, rateLimiter.tokens + tokensToAdd);
    rateLimiter.lastRefill = now;
  }
};

const checkRateLimit = () => {
  refillTokens();
  if (rateLimiter.tokens > 0) {
    rateLimiter.tokens--;
    return true;
  }
  return false;
};

export const fetchDataFromApi = async (payload) => {
  try {
    const cacheKey = JSON.stringify(payload);
    const cachedData = searchCache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    if (!checkRateLimit()) {
      toast.error('Too many requests. Please try again later.');
      throw new Error('Rate limit exceeded');
    }

    const { data } = await axios.get(BASE_URL, {
      params: { ...params, ...payload },
    });

    searchCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || error.message;
      toast.error(`Search failed: ${errorMessage}`);
      console.error('API Error:', errorMessage);
    } else {
      toast.error('An unexpected error occurred');
      console.error('Unexpected Error:', error);
    }
    throw error;
  }
};

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of searchCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      searchCache.delete(key);
    }
  }
}, CACHE_DURATION);