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
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
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
