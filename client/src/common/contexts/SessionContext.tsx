import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useModals } from './ModalContext';
import { LocalStorageService } from '../services/localStorageService';

export interface User {
  id: number;
  username: string;
}

interface SessionContextData {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface SessionProviderProps {
  children: ReactNode;
}

const SessionContext = createContext<SessionContextData>(
  {} as SessionContextData,
);

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  //*** HOOKS ***//

  const [user, setUser] = useState<User | null>(null);
  const { setModals } = useModals();

  //*** HANDLERS ***//

  const handleSetUser = useCallback(
    (user: User | null) => {
      setUser(user);

      if (user) {
        LocalStorageService.setItem('currentUser', user);
      } else {
        LocalStorageService.removeItem('currentUser');
        setModals({ isUserModalOpen: true });
      }
    },
    [setModals],
  );

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    const currentUser = LocalStorageService.getJSONItem<User>('currentUser');

    if (!currentUser) {
      setModals({ isUserModalOpen: true });
    } else {
      handleSetUser(currentUser);
    }
  }, []);

  //*** CONTEXT API */

  const api = useMemo(
    () => ({ user, setUser: handleSetUser }),
    [user, handleSetUser],
  );

  return (
    <SessionContext.Provider value={api}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
