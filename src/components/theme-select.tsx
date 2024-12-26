'use client';

import { siteConfig } from '@/config/site';
import { Select, SelectItem } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeSelect = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const defaultTheme = siteConfig.themes[0]?.name || 'light';
  const [isClient, setIsClient] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>(defaultTheme);

  useEffect(() => {
    setIsClient(true); // Marca el componente como cliente
    if (!theme && !resolvedTheme) {
      setTheme(defaultTheme); // Establece el tema por defecto si no hay tema inicial
      setSelectedTheme(defaultTheme);
    } else {
      setSelectedTheme(resolvedTheme || defaultTheme); // Sincroniza el estado con el tema actual
    }
  }, [theme, resolvedTheme, setTheme, defaultTheme]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme); // Cambia el tema globalmente
    setSelectedTheme(selectedTheme); // Actualiza el estado local
  };

  if (!isClient) {
    // Evita renderizar hasta que el componente esté en el cliente
    return null;
  }

  return (
    <div className="w-full max-w-xs">
      <Select
        placeholder="Select Theme"
        value={selectedTheme}
        defaultSelectedKeys={[selectedTheme]}
        onChange={handleChange} // Usa tu implementación original
        aria-label="Theme Selector"
        className="min-w-[170px]"
      >
        {siteConfig.themes.map(({ name, visual }) => (
          <SelectItem key={name} value={name}>
            {visual}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default ThemeSelect;
