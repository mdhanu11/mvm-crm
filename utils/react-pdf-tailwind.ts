// utils/tw.ts
import { createTw } from 'react-pdf-tailwind';

export const tw = createTw({
  theme: {
    extend: {
      colors: {
        custom: '#bada55',
      },
      fontFamily: {
        sans: ['Helvetica'],
      },
    },
  },
});
