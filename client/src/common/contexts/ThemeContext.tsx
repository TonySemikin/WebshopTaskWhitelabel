import { createContext, ReactNode, useContext } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const theme = {
  primary: {
    light: 'var(--primary-light)',
    main: 'var(--primary-main)',
    dark: 'var(--primary-dark)',
    contrastTextLight: 'var(--primary-contrast-text-light)',
    contrastTextMain: 'var(--primary-contrast-text-main)',
    contrastTextDark: 'var(--primary-contrast-text-dark)',
  },
  secondary: {
    light: 'var(--secondary-light)',
    main: 'var(--secondary-main)',
    dark: 'var(--secondary-dark)',
    contrastTextLight: 'var(--secondary-contrast-text-light)',
    contrastTextMain: 'var(--secondary-contrast-text-main)',
    contrastTextDark: 'var(--secondary-contrast-text-dark)',
  },
  contrastRed: {
    light: 'var(--contrast-red-light)',
    main: 'var(--contrast-red-main)',
    dark: 'var(--contrast-red-dark)',
    contrastTextLight: 'var(--contrast-red-contrast-text-light)',
    contrastTextMain: 'var(--contrast-red-contrast-text-main)',
    contrastTextDark: 'var(--contrast-red-contrast-text-dark)',
  },
  grey: {
    light: 'var(--grey-light)',
    main: 'var(--grey-main)',
    dark: 'var(--grey-dark)',
    contrastTextLight: 'var(--grey-contrast-text-light)',
    contrastTextMain: 'var(--grey-contrast-text-main)',
    contrastTextDark: 'var(--grey-contrast-text-dark)',
  },
};

const ThemeContext = createContext(theme);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
