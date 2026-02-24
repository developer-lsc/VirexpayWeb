import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, ArrowRight } from "lucide-react";

const Page = styled.div`
  display: flex;
  min-height: 100vh;
`;

const FormSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
`;

const FormWrap = styled.div`
  width: 100%;
  max-width: 380px;
`;

const Brand = styled(Link)`
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BrandIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

const BrandText = styled.span`
  font-family: Inter, system-ui, sans-serif;
  font-size: 20px;
  font-weight: 700;
`;

const Title = styled.h1`
  margin-bottom: 8px;
  font-size: 28px;
`;

const Subtitle = styled.p`
  margin-bottom: 32px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const Field = styled.div`
  display: grid;
  gap: 8px;
`;

const RowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SmallLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent};

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.p`
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const FooterLink = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};

  &:hover {
    text-decoration: underline;
  }
`;

const BrandingSide = styled.div`
  width: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: ${({ theme }) => theme.gradients.hero};

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const BrandingContent = styled.div`
  max-width: 420px;
  text-align: center;
`;

const BrandingIcon = styled.div`
  margin: 0 auto 24px;
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.radius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.accent} 20%, transparent);
  color: ${({ theme }) => theme.colors.accent};
`;

const BrandingTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

const BrandingText = styled.p`
  color: color-mix(in srgb, ${({ theme }) => theme.colors.primaryForeground} 60%, transparent);
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Page>
      <FormSide>
        <FormWrap>
          <Brand to="/">
            <BrandIcon>
              <FileText size={20} />
            </BrandIcon>
            <BrandText>Virexapay</BrandText>
          </Brand>

          <Title>Bem-vindo de volta</Title>
          <Subtitle>Entre na sua conta para continuar.</Subtitle>

          <Form onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>

            <Field>
              <RowBetween>
                <Label htmlFor="password">Senha</Label>
                <SmallLink to="/recuperar-senha">Esqueceu a senha?</SmallLink>
              </RowBetween>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            <Button type="submit" variant="accent" size="lg">
              Entrar <ArrowRight size={16} />
            </Button>
          </Form>

          <Footer>
            Não tem conta? <FooterLink to="/registro">Crie sua conta grátis</FooterLink>
          </Footer>
        </FormWrap>
      </FormSide>

      <BrandingSide>
        <BrandingContent>
          <BrandingIcon>
            <FileText size={32} />
          </BrandingIcon>
          <BrandingTitle>Gerencie contratos com facilidade</BrandingTitle>
          <BrandingText>Crie, assine e cobre automaticamente. Tudo em uma plataforma simples e segura.</BrandingText>
        </BrandingContent>
      </BrandingSide>
    </Page>
  );
};

export default Login;
