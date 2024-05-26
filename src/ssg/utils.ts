import path from 'node:path';

export const toAbsolute = (p: string): string => path.resolve(p);
