"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header';
import { Nav } from '@/components/layout/nav';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const AppSidebar = () => {
  const { state } = useSidebar();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/Agroqora_logo.png" alt="AgroQora Logo" width={32} height={32} />
          {state === 'expanded' && <span className="text-xl font-bold">AgroQora</span>}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <Nav />
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-2 h-auto">
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-8 w-8">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" />}
                  <AvatarFallback>FN</AvatarFallback>
                </Avatar>
                {state === 'expanded' && (
                  <div className="text-left overflow-hidden">
                    <p className="text-sm font-medium truncate">F. Farmer</p>
                    <p className="text-xs text-muted-foreground">Free Plan</p>
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
