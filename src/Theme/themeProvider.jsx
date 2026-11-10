import { useState } from 'react';
import { ThemeContext } from './themeContext';

function ThemeProvider({ children }) {
  
  let savedTheme = localStorage.getItem('theme');
  if (savedTheme !== 'dark') {
    savedTheme = 'light';
  }

  const [theme, setTheme] = useState(savedTheme);

  function toggleTheme() {
    let newTheme = 'light';
    if (theme === 'light') {
      newTheme = 'dark';
    }
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); 
  }

  const themeValue = { theme: theme, toggleTheme: toggleTheme };

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;