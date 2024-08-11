'use client'

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Button 
        onClick={toggleTheme}
        size='icon'
        variant='secondary'
        className='fixed top-4 right-4 z-50'
    >
        {
        isDarkMode ? 
            <Moon/> 
        :
            <Sun/>
        }
    </Button>
  );
};

export default ThemeToggleButton;