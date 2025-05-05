import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { UserContext } from "./config";

export const UserProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserContext);
  return (
    context ?? {
      userId: null,
      setUserId: (id: string) => {
        console.error("try to alert when alert user context is null:", {
          id,
        });
      },
    }
  );
};
