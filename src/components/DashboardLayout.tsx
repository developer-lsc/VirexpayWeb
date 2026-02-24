import { Link, useLocation, Outlet } from "react-router-dom";
import {
  FileText,
  LayoutDashboard,
  Users,
  FileSignature,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

const navItems = [
  { to: "/app", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/app/clientes", icon: Users, label: "Clientes" },
  { to: "/app/contratos", icon: FileSignature, label: "Contratos" },
  { to: "/app/parcelas", icon: CreditCard, label: "Parcelas" },
  { to: "/app/configuracoes", icon: Settings, label: "Configurações" },
];

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Overlay = styled.button`
  position: fixed;
  inset: 0;
  z-index: 40;
  border: 0;
  background: rgba(0, 0, 0, 0.28);

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Sidebar = styled.aside<{ $open: boolean }>`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 50;
  width: 256px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  background: ${({ theme }) => theme.colors.sidebarBackground};
  transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
  transition: transform 0.2s ease;

  @media (min-width: 1024px) {
    position: static;
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BrandIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.sidebarPrimary};
  color: ${({ theme }) => theme.colors.sidebarPrimaryForeground};
`;

const BrandText = styled.span`
  font-family: Inter, system-ui, sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.sidebarForeground};
`;

const MobileCloseButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.sidebarForeground};
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 16px 12px;
  display: grid;
  gap: 4px;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme, $active }) => ($active ? theme.colors.sidebarPrimary : "color-mix(in srgb, " + theme.colors.sidebarForeground + " 70%, transparent)")};
  background: ${({ theme, $active }) => ($active ? theme.colors.sidebarAccent : "transparent")};

  &:hover {
    background: ${({ theme }) => theme.colors.sidebarAccent};
    color: ${({ theme }) => theme.colors.sidebarForeground};
  }
`;

const SidebarFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  padding: 12px;
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 10px 12px;
  background: transparent;
  color: color-mix(in srgb, ${({ theme }) => theme.colors.sidebarForeground} 70%, transparent);
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.sidebarAccent};
    color: ${({ theme }) => theme.colors.sidebarForeground};
  }
`;

const Main = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};

  @media (min-width: 1024px) {
    padding: 0 32px;
  }
`;

const MobileMenuButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const HeaderSpacer = styled.div`
  flex: 1;
`;

const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.accent} 10%, transparent);
`;

const Content = styled.main`
  flex: 1;
  padding: 16px;

  @media (min-width: 1024px) {
    padding: 32px;
  }
`;

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Shell>
      {sidebarOpen && <Overlay onClick={() => setSidebarOpen(false)} aria-label="Fechar menu" />}

      <Sidebar $open={sidebarOpen}>
        <SidebarHeader>
          <Brand to="/">
            <BrandIcon>
              <FileText size={16} />
            </BrandIcon>
            <BrandText>Virexapay</BrandText>
          </Brand>
          <MobileCloseButton onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </MobileCloseButton>
        </SidebarHeader>

        <SidebarNav>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavItem key={item.to} to={item.to} $active={isActive} onClick={() => setSidebarOpen(false)}>
                <item.icon size={20} />
                {item.label}
              </NavItem>
            );
          })}
        </SidebarNav>

        <SidebarFooter>
          <LogoutButton>
            <LogOut size={20} />
            Sair
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <Main>
        <Header>
          <MobileMenuButton onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </MobileMenuButton>
          <HeaderSpacer />
          <UserBadge>
            <UserAvatar>U</UserAvatar>
            <ChevronDown size={16} color="currentColor" />
          </UserBadge>
        </Header>

        <Content>
          <Outlet />
        </Content>
      </Main>
    </Shell>
  );
};

export default DashboardLayout;
