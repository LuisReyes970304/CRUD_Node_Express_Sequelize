/**
 * diseño entidad usuario
 */
export interface User {
  id: number,
  name: string
}

export const database: Array<User> = [{ id: 1, name: "Juan" }];