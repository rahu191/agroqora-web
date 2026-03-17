import { SidebarTrigger } from '@/components/ui/sidebar';

export const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="w-full flex-1">{/* Future content like search can go here */}</div>
    </header>
  );
};
