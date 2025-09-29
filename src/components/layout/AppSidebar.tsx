import { 
  FileText, 
  Lightbulb, 
  Image, 
  Eraser, 
  Scissors,
  FileCheck,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Article Generator', url: '/article-generator', icon: FileText },
  { title: 'Blog Title Generator', url: '/blog-title-generator', icon: Lightbulb },
  { title: 'Image Generator', url: '/image-generator', icon: Image },
  { title: 'Background Remover', url: '/background-remover', icon: Eraser },
  { title: 'Object Remover', url: '/object-remover', icon: Scissors },
  { title: 'Resume Analyzer', url: '/resume-analyzer', icon: FileCheck },
];

export const AppSidebar = () => {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex items-center gap-2 px-4 py-6">
          <Sparkles className="h-8 w-8 text-primary" />
          {open && (
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              QuickAI
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};