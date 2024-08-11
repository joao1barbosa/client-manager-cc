'use client'

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme){
      const isDark = savedTheme === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      setIsDarkMode(isDark);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', newIsDarkMode);
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
  };

  return (
    <Button 
        onClick={toggleTheme}
        size='icon'
        variant='secondary'
        className='fixed top-4 right-4 z-50'
    >
        {
        !isDarkMode ? 
            <Sun/> 
        :
            <Moon/>
        }
    </Button>
  );
};
