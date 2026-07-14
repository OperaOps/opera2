export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Overview', href: '/' },
  { label: 'Demos', href: '/#demos' },
  { label: 'Intent', href: '/intent' },
  { label: 'Loop', href: '/loop' },
];
