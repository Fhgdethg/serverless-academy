import NodeCache from 'node-cache';

const cache = new NodeCache();

export const setMInCache = (vals) => cache.mset(vals);

export const getCacheData = (key) => cache.get(key);