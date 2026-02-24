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

const Register = () => {
  const [name, setName] = useState("");
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

          <Title>Crie sua conta</Title>
          <Subtitle>Comece seu trial gratuito de 14 dias. Sem cartão de crédito.</Subtitle>

          <Form onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
            </Field>
            <Field>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </Field>
            <Button type="submit" variant="accent" size="lg">
              Criar conta grátis <ArrowRight size={16} />
            </Button>
          </Form>

          <Footer>
            Já tem conta? <FooterLink to="/login">Entrar</FooterLink>
          </Footer>
        </FormWrap>
      </FormSide>

      <BrandingSide>
        <BrandingContent>
          <BrandingIcon>
            <FileText size={32} />
          </BrandingIcon>
          <BrandingTitle>14 dias grátis para testar tudo</BrandingTitle>
          <BrandingText>
            Contratos, assinatura digital, cobranças automáticas e dashboard financeiro. Tudo incluso.
          </BrandingText>
        </BrandingContent>
      </BrandingSide>
    </Page>
  );
};

export default Register;
