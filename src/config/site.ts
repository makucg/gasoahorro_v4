export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'GasoAhorro',
  description: 'El mejor lugar para encontrar gasolineras baratas',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Promos',
      href: '/docs',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'About',
      href: '/about',
    },
  ],
  navMenuItems: [
    {
      label: 'Promos',
      href: '/docs',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
      secured: true,
    },
  ],
  links: {
    github: 'https://github.com/makucg',
    linkedin: 'https://www.linkedin.com/in/diego-montes-novio-50503448/',
    sponsor: 'https://buymeacoffee.com/dmndev',
  },

  themes: [
    {
      name: 'light',
      visual: 'Light',
    },
    {
      name: 'dark',
      visual: 'Dark',
    },
    {
      name: 'posthog',
      visual: 'PostHog',
    },
    {
      name: 'darkBlue',
      visual: 'Dark Blue',
    },
    {
      name: 'blossomTheme',
      visual: 'Blossom Theme',
    },
    {
      name: 'political',
      visual: 'Political',
    },
  ],
};
