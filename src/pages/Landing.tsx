import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  PenTool,
  DollarSign,
  Shield,
  Clock,
  BarChart3,
  ArrowRight,
  CircleCheck,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Page = styled.div`
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, ${({ theme }) => theme.colors.background} 86%, transparent);
`;

const NavInner = styled(Container)`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled(Link)`
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
  font-size: 22px;
  font-weight: 700;
`;

const NavLinks = styled.div`
  display: none;
  align-items: center;
  gap: 24px;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavAnchor = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedForeground};

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const MobileMenuButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  padding: 0 16px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;

  > a > button {
    width: 100%;
  }
`;

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding-top: 64px;
  background: ${({ theme }) => theme.gradients.hero};
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

const HeroInner = styled(Container)`
  padding: 80px 0 120px;
  display: grid;
  align-items: center;
  gap: 48px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const HeroContent = styled(motion.div)`
  text-align: center;

  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const Badge = styled(motion.div)`
  margin-bottom: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.accent} 30%, transparent);
  background: color-mix(in srgb, ${({ theme }) => theme.colors.accent} 10%, transparent);
  padding: 6px 16px;
  font-size: 14px;
`;

const HeroTitle = styled(motion.h1)`
  margin-bottom: 24px;
  font-size: 36px;
  font-weight: 900;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 48px;
  }

  @media (min-width: 1024px) {
    font-size: 60px;
  }
`;

const GradientText = styled.span`
  background-image: ${({ theme }) => theme.gradients.accent};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const HeroText = styled(motion.p)`
  margin-bottom: 32px;
  margin-inline: auto;
  max-width: 512px;
  font-size: 18px;
  color: color-mix(in srgb, ${({ theme }) => theme.colors.primaryForeground} 70%, transparent);

  @media (min-width: 1024px) {
    margin-inline: 0;
  }
`;

const HeroActions = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;

  > a {
    width: 100%;
  }

  > a > button {
    width: 100%;
  }

  @media (min-width: 640px) {
    flex-direction: row;

    > a {
      width: auto;
    }

    > a > button {
      width: auto;
    }
  }

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const HeroPrimaryButton = styled(Button)`
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadows.elevated};
`;

const HeroSecondaryButton = styled(Button)`
  border-radius: ${({ theme }) => theme.radius.xl};
  color: color-mix(in srgb, ${({ theme }) => theme.colors.primaryForeground} 80%, transparent);
  border-color: color-mix(in srgb, ${({ theme }) => theme.colors.primaryForeground} 20%, transparent);
  background: color-mix(in srgb, ${({ theme }) => theme.colors.accent} 5%, transparent);

  &:hover {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.primaryForeground} 5%, transparent);
  }
`;

const HeroImageWrap = styled(motion.div)`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadows.elevated};
`;

const HeroBottomShape = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${({ theme }) => theme.colors.background};

  svg {
    display: block;
    width: 100%;
    height: auto;

    path {
      fill: ${({ theme }) => theme.colors.background};
    }
  }
`;

const Section = styled.section<{ $alt?: boolean }>`
  padding: 80px 0;
  background: ${({ theme, $alt }) => ($alt ? theme.colors.card : "transparent")};
`;

const SectionCenter = styled.div`
  max-width: 780px;
  margin: 0 auto 48px;
  text-align: center;
`;

const Label = styled(motion.p)`
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.accent};
`;

const H2 = styled(motion.h2)`
  margin-bottom: 16px;
  font-size: clamp(30px, 4vw, 44px);
`;

const Muted = styled(motion.p)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const Grid3 = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled(motion.div)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 28px;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.elevated};
  }
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.destructive} 10%, transparent);
  color: ${({ theme }) => theme.colors.destructive};
`;

const CardTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 20px;
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const BenefitsSection = styled.section`
  padding: 80px 0;

  @media (min-width: 768px) {
    padding: 112px 0;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  align-items: center;
  gap: 48px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const BenefitsLeft = styled.div``;

const BenefitsLabel = styled(motion.p)`
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const BenefitsTitle = styled(motion.h2)`
  margin-bottom: 32px;
  font-size: 30px;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.foreground};

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const BenefitsList = styled.div`
  display: grid;
  gap: 20px;
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const BenefitItemText = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.foreground};
`;

const PricingCard = styled(motion.div)`
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.elevated};
  padding: 32px;
`;

const PricingHeader = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

const PricingPlanLabel = styled.p`
  margin-bottom: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const PricingValueRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
`;

const PricingCurrency = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const PricingValue = styled.span`
  font-size: clamp(40px, 6vw, 48px);
  font-weight: 900;
  line-height: 1;
  color: ${({ theme }) => theme.colors.foreground};
`;

const PricingPeriod = styled.span`
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const PricingSubtext = styled.p`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent};
`;

const PricingFeatures = styled.div`
  margin-bottom: 32px;
  display: grid;
  gap: 12px;
`;

const PricingFeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PricingFeatureText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground};
`;

const FullWidthLink = styled(Link)`
  display: block;
`;

const PricingButton = styled(Button)`
  width: 100%;
`;

const CtaSection = styled(Section)`
  background: ${({ theme }) => theme.gradients.hero};
`;

const CtaTitle = styled(motion.h2)`
  margin-bottom: 16px;
  font-size: clamp(30px, 4vw, 44px);
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

const CtaText = styled(motion.p)`
  margin-bottom: 32px;
  font-size: 18px;
  color: color-mix(in srgb, ${({ theme }) => theme.colors.primaryForeground} 70%, transparent);
`;

const LeadForm = styled(motion.form)`
  max-width: 580px;
  margin: 0 auto;
  display: grid;
  gap: 10px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr auto;
  }
`;

const LeadInput = styled(Input)`
  background: color-mix(in srgb, ${({ theme }) => theme.colors.primaryForeground} 10%, transparent);
  border-color: color-mix(in srgb, ${({ theme }) => theme.colors.primaryForeground} 20%, transparent);
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

const Footer = styled.footer`
  padding: 40px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
`;

const FooterInner = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const Landing = () => {
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Page>
      <Nav>
        <NavInner>
          <Brand to="/">
            <BrandIcon>
              <FileText size={20} />
            </BrandIcon>
            <BrandText>Virexapay</BrandText>
          </Brand>

          <NavLinks>
            <NavAnchor href="#problema">Problema</NavAnchor>
            <NavAnchor href="#solucao">Solução</NavAnchor>
            <NavAnchor href="#beneficios">Benefícios</NavAnchor>
            <Link to="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/registro">
              <Button variant="accent" size="sm">Teste grátis</Button>
            </Link>
          </NavLinks>

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavInner>

        {mobileMenuOpen && (
          <MobileMenu>
            <MobileMenuStack>
              <NavAnchor href="#problema" onClick={() => setMobileMenuOpen(false)}>Problema</NavAnchor>
              <NavAnchor href="#solucao" onClick={() => setMobileMenuOpen(false)}>Solução</NavAnchor>
              <NavAnchor href="#beneficios" onClick={() => setMobileMenuOpen(false)}>Benefícios</NavAnchor>
              <Link to="/login"><Button variant="ghost">Entrar</Button></Link>
              <Link to="/registro"><Button variant="accent">Teste grátis</Button></Link>
            </MobileMenuStack>
          </MobileMenu>
        )}
      </Nav>

      <Hero>
        <HeroInner>
          <HeroContent initial="hidden" animate="visible">
            <Badge variants={fadeUp} custom={0}>
              <Clock size={16} /> 14 dias grátis • Sem cartão de crédito
            </Badge>
            <HeroTitle variants={fadeUp} custom={1}>
              Contratos, assinaturas e cobranças <GradientText>em um só lugar.</GradientText>
            </HeroTitle>
            <HeroText variants={fadeUp} custom={2}>
              Organize seus contratos e receba automaticamente, sem planilhas e sem inadimplência.
            </HeroText>
            <HeroActions variants={fadeUp} custom={3}>
              <Link to="/registro">
                <HeroPrimaryButton
                  variant="hero"
                  size="xl">
                  Começar grátis <ArrowRight size={20} style={{ marginLeft: 4 }} />
                </HeroPrimaryButton>
              </Link>
              <a href="#solucao">
                <HeroSecondaryButton variant="hero-outline" size="xl">Como funciona</HeroSecondaryButton>
              </a>
            </HeroActions>
          </HeroContent>

          <HeroImageWrap initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <HeroImage src={heroImage} alt="Contratos digitais e cobranças automatizadas" />
          </HeroImageWrap>
        </HeroInner>
        <HeroBottomShape aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 0C1440 0 1080 60 720 60C360 60 0 0 0 0L0 60Z"/>
          </svg>
        </HeroBottomShape>
      </Hero>

      <Section id="problema">
        <Container>
          <SectionCenter>
            <Label variants={fadeUp} custom={0}>O problema</Label>
            <H2 variants={fadeUp} custom={1}>Ainda usando planilhas para controlar contratos?</H2>
            <Muted variants={fadeUp} custom={2}>Contratos perdidos em pastas, cobranças manuais, clientes inadimplentes e zero visibilidade financeira. Isso custa tempo e dinheiro.</Muted>
          </SectionCenter>

          <Grid3>
            {[
              { icon: FileText, title: "Contratos desorganizados", desc: "Documentos espalhados em e-mails, WhatsApp e pastas." },
              { icon: DollarSign, title: "Cobranças manuais", desc: "Você precisa lembrar de cobrar cada parcela manualmente." },
              { icon: Shield, title: "Sem proteção jurídica", desc: "Acordos verbais ou informais sem assinatura e sem registro documental." },
            ].map((item, i) => (
              <Card key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <CardIcon>
                  <item.icon size={22} />
                </CardIcon>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.desc}</CardText>
              </Card>
            ))}
          </Grid3>
        </Container>
      </Section>

      <Section id="solucao" $alt>
        <Container>
          <SectionCenter>
            <Label variants={fadeUp} custom={0}>A solução</Label>
            <H2 variants={fadeUp} custom={1}>Tudo que você precisa em uma plataforma</H2>
            <Muted variants={fadeUp} custom={2}>Do contrato à cobrança, automatize todo o processo.</Muted>
          </SectionCenter>

          <Grid3>
            {[
              { icon: FileText, title: "Crie contratos", desc: "Modelos prontos com variáveis dinâmicas." },
              { icon: PenTool, title: "Assinatura digital", desc: "Envie um link seguro para assinatura." },
              { icon: DollarSign, title: "Parcelamento automático", desc: "Defina parcelas, juros e multa." },
              { icon: BarChart3, title: "Dashboard financeiro", desc: "Receitas e vencimentos em tempo real." },
              { icon: Shield, title: "Segurança jurídica", desc: "Hash SHA256, IP e timestamp auditáveis." },
              { icon: Clock, title: "Menos inadimplência", desc: "Cobranças automáticas antes do vencimento." },
            ].map((item, i) => (
              <Card key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <CardIcon style={{ background: "color-mix(in srgb, hsl(162 72% 42%) 10%, transparent)", color: "hsl(162 72% 42%)" }}>
                  <item.icon size={22} />
                </CardIcon>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.desc}</CardText>
              </Card>
            ))}
          </Grid3>
        </Container>
      </Section>

      <BenefitsSection id="beneficios">
        <Container>
          <BenefitsGrid>
            <BenefitsLeft>
              <BenefitsLabel initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                Por que escolher o Virexapay
              </BenefitsLabel>
              <BenefitsTitle initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                Foque no seu negócio. A gente cuida da burocracia.
              </BenefitsTitle>

              <BenefitsList>
                {[
                  "Crie contratos em menos de 2 minutos",
                  "Assinatura digital sem sair da plataforma",
                  "Cobranças automáticas via Pix e boleto",
                  "Dashboard financeiro em tempo real",
                  "Sem planilhas, sem retrabalho",
                  "Plano único de R$ 69/mês após trial",
                ].map((benefit, i) => (
                  <BenefitItem key={benefit} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 2}>
                    <CircleCheck size={24} color="hsl(162 72% 42%)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <BenefitItemText>{benefit}</BenefitItemText>
                  </BenefitItem>
                ))}
              </BenefitsList>
            </BenefitsLeft>

            <PricingCard initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              <PricingHeader>
                <PricingPlanLabel>Plano único</PricingPlanLabel>
                <PricingValueRow>
                  <PricingCurrency>R$</PricingCurrency>
                  <PricingValue>69</PricingValue>
                  <PricingPeriod>/mês</PricingPeriod>
                </PricingValueRow>
                <PricingSubtext>14 dias grátis • Cancele quando quiser</PricingSubtext>
              </PricingHeader>

              <PricingFeatures>
                {[
                  "Contratos ilimitados",
                  "Assinatura digital ilimitada",
                  "Cobranças automáticas",
                  "Dashboard financeiro",
                  "Gestão de clientes",
                  "Suporte por e-mail",
                ].map((feature) => (
                  <PricingFeatureItem key={feature}>
                    <CircleCheck size={16} color="hsl(162 72% 42%)" />
                    <PricingFeatureText>{feature}</PricingFeatureText>
                  </PricingFeatureItem>
                ))}
              </PricingFeatures>

              <FullWidthLink to="/registro">
                <PricingButton variant="accent" size="lg">
                  Começar teste grátis <ArrowRight size={16} />
                </PricingButton>
              </FullWidthLink>
            </PricingCard>
          </BenefitsGrid>
        </Container>
      </BenefitsSection>

      <CtaSection>
        <Container>
          <SectionCenter>
            <CtaTitle variants={fadeUp} custom={0}>Pronto para organizar seus contratos?</CtaTitle>
            <CtaText variants={fadeUp} custom={1}>Cadastre-se e receba acesso antecipado. Sem compromisso.</CtaText>
            {submitted ? (
              <Badge initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <CheckCircle2 size={18} /> Obrigado! Entraremos em contato em breve.
              </Badge>
            ) : (
              <LeadForm variants={fadeUp} custom={2} onSubmit={handleLeadSubmit}>
                <LeadInput type="text" placeholder="Seu nome" value={leadName} onChange={(e) => setLeadName(e.target.value)} required />
                <LeadInput type="email" placeholder="Seu e-mail" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} required />
                <Button variant="hero" size="lg" type="submit">Quero testar</Button>
              </LeadForm>
            )}
          </SectionCenter>
        </Container>
      </CtaSection>

      <Footer>
        <FooterInner>
          <Brand to="/">
            <BrandIcon>
              <FileText size={16} />
            </BrandIcon>
            <strong>Virexapay</strong>
          </Brand>
          <FooterText>© 2026 Virexapay. Todos os direitos reservados.</FooterText>
        </FooterInner>
      </Footer>
    </Page>
  );
};

export default Landing;
