"use client";
import { createContext, useContext } from "react";
import { createContextualCan } from "@casl/react";
import { defineAbilityFor } from "@/lib/utils/ability.util";
import { useSession } from "next-auth/react";
import { IAuthSession } from "@/interfaces/user.interface";

export const AbilityContext = createContext<any>({});
export const Can = createContextualCan(AbilityContext.Consumer as any);

export const useAppAbility = () => useContext(AbilityContext);

export const AbilityProvider = ({ children }) => {
  const session = useSession();

  const ability = defineAbilityFor(session.data?.user as IAuthSession);
  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};
