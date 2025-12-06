import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip';

/**
 * Theme Toggle Button
 * 
 * Switches between light and dark themes
 * Only visible when ThemeProvider has switchable=true
 */
export function ThemeToggle() {
  const { theme, toggleTheme, switchable } = useTheme();

  // Don't render if theme is not switchable
  if (!switchable || !toggleTheme) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="relative"
          aria-label={theme === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري'}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}</p>
      </TooltipContent>
    </Tooltip>
  );
}
