import { z } from 'zod';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      zod: z
    }
  };
});