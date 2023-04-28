import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface Modals {
  isCartModalOpen?: boolean;
  isUserModalOpen?: boolean;
}

interface ModalsContextData {
  modals: Modals;
  setModals: (modals: Modals) => void;
}

interface ModalsProviderProps {
  children: ReactNode;
}

const ModalsContext = createContext<ModalsContextData>({} as ModalsContextData);

export const ModalsProvider: React.FC<ModalsProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<Modals>({});

  const api = useMemo(() => {
    return { modals, setModals };
  }, [modals]);

  return (
    <ModalsContext.Provider value={api}>{children}</ModalsContext.Provider>
  );
};

export const useModals = () => useContext(ModalsContext);
