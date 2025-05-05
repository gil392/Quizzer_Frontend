import { createContext } from "react";

interface UserContextType {
  userId: string | null;
  setUserId: (id: string) => void;
}

export const UserContext = createContext<UserContextType | null>(null);
