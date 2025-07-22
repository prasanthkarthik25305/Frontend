import { createContext, useState, useEffect, useContext } from 'react';

// Create the theme context
const ThemeContext = createContext();

/**
 * ThemeProvider component
 * Provides theme and font size settings across the app
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function ThemeProvider({ children }) {
  // Get saved settings from localStorage or use defaults
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('pathpilot-theme');
    return savedTheme || 'light';
  });

  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('pathpilot-font-size');
    return savedFontSize || 'normal';
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('pathpilot-theme', theme);
    
    // Apply theme to body element
    const body = document.querySelector('body');
    if (body) {
      if (theme === 'dark') {
        body.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
      }
    }
  }, [theme]);

  // Update localStorage when font size changes
  useEffect(() => {
    localStorage.setItem('pathpilot-font-size', fontSize);
    
    // Apply font size to html element
    const html = document.querySelector('html');
    if (html) {
      // Remove any existing font size classes
      html.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
      
      // Apply new font size class
      switch (fontSize) {
        case 'small':
          html.classList.add('text-sm');
          break;
        case 'normal':
          html.classList.add('text-base');
          break;
        case 'large':
          html.classList.add('text-lg');
          break;
        case 'x-large':
          html.classList.add('text-xl');
          break;
        default:
          html.classList.add('text-base');
      }
    }
  }, [fontSize]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  /**
   * Change font size
   * @param {string} size - The new font size ('small', 'normal', 'large', 'x-large')
   */
  const changeFontSize = (size) => {
    if (['small', 'normal', 'large', 'x-large'].includes(size)) {
      setFontSize(size);
    }
  };

  // Context value with theme settings and functions
  const contextValue = {
    theme,
    toggleTheme,
    fontSize,
    changeFontSize
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook for accessing theme context
 * @returns {Object} Theme context value
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;