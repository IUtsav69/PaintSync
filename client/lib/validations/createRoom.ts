import * as z from 'zod';

export const createRoomSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must contain at least 2 characters')
    .max(50, 'Username must not contain more than 50 characters')
    .regex(/^[a-zA-Z0-9]+69$/, 'Username must end with "69" because devloper wanted to'),
});
