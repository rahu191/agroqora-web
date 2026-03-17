"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  Leaf,
  Droplets,
  Sprout,
  TrendingUp,
  BotMessageSquare,
} from 'lucide-react';

export const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/diagnose', label: 'Diagnose Disease', icon: Leaf },
  { href: '/fertilizer', label: 'Fertilizer Guide', icon: Droplets },
  { href: '/planning', label: 'Crop Planner', icon: Sprout },
  { href: '/market', label: 'Market Trends', icon: TrendingUp },
  { href: '/automation', label: 'Automation', icon: BotMessageSquare },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
