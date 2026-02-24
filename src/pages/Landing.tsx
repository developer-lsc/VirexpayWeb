import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

const Landing = () => {
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">
              Contraktor
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#problema" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Problema
            </a>
            <a href="#solucao" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Solução
            </a>
            <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Benefícios
            </a>
            <Link to="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/registro">
              <Button variant="accent" size="sm">
                Teste grátis
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 pb-4">
            <div className="flex flex-col gap-3 pt-3">
              <a href="#problema" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Problema</a>
              <a href="#solucao" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Solução</a>
              <a href="#beneficios" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Benefícios</a>
              <Link to="/login"><Button variant="ghost" className="w-full">Entrar</Button></Link>
              <Link to="/registro"><Button variant="accent" className="w-full">Teste grátis</Button></Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero pt-16">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
                <Clock className="h-4 w-4" />
                14 dias grátis • Sem cartão de crédito
              </motion.div>
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="mb-6 font-heading text-4xl font-black leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
              >
                Contratos, assinaturas e cobranças{" "}
                <span className="text-gradient">em um só lugar.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mb-8 max-w-lg text-lg text-primary-foreground/70 mx-auto lg:mx-0"
              >
                Organize seus contratos e receba automaticamente, sem planilhas e
                sem inadimplência. Ideal para freelancers, consultores e pequenas
                empresas.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-col gap-3 sm:flex-row justify-center lg:justify-start">
                <Link to="/registro">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Começar grátis <ArrowRight className="ml-1 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#solucao">
                  <Button variant="hero-outline" size="xl" className="w-full sm:w-auto text-primary-foreground/80 border-primary-foreground/20 hover:bg-primary-foreground/5">
                    Como funciona
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <img
                src={heroImage}
                alt="Contratos digitais e cobranças automatizadas"
                className="rounded-2xl shadow-elevated"
              />
            </motion.div>
          </div>
        </div>
        {/* Curve divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 0C1440 0 1080 60 720 60C360 60 0 0 0 0L0 60Z" fill="hsl(210 25% 97%)" />
          </svg>
        </div>
      </section>

      {/* Problema */}
      <section id="problema" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
              O problema
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ainda usando planilhas para controlar contratos?
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg">
              Contratos perdidos em pastas, cobranças manuais, clientes inadimplentes e zero visibilidade financeira. Isso custa tempo e dinheiro.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: FileText, title: "Contratos desorganizados", desc: "Documentos espalhados em e-mails, WhatsApp e pastas. Sem controle de versão." },
              { icon: DollarSign, title: "Cobranças manuais", desc: "Você precisa lembrar de cobrar cada parcela manualmente. Fácil esquecer." },
              { icon: Shield, title: "Sem proteção jurídica", desc: "Acordos verbais ou informais sem assinatura e sem registro documental." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl bg-card p-8 shadow-card border border-border/50 hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                  <item.icon className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-card-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solução */}
      <section id="solucao" className="bg-card py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
              A solução
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa em uma plataforma
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg">
              Do contrato à cobrança, automatize todo o processo e foque no que importa: o seu negócio.
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: FileText, title: "Crie contratos", desc: "Modelos prontos com variáveis dinâmicas. Gere PDFs profissionais em segundos.", step: "01" },
              { icon: PenTool, title: "Assinatura digital", desc: "Envie um link seguro. Seu cliente assina de qualquer dispositivo, com validade jurídica.", step: "02" },
              { icon: DollarSign, title: "Parcelamento automático", desc: "Defina parcelas, juros e multa. O sistema cria cobranças e atualiza status automaticamente.", step: "03" },
              { icon: BarChart3, title: "Dashboard financeiro", desc: "Veja total a receber, recebido, vencido e receita mensal em tempo real.", step: "04" },
              { icon: Shield, title: "Segurança jurídica", desc: "Hash SHA256, registro de IP e timestamp. Tudo registrado e auditável.", step: "05" },
              { icon: Clock, title: "Redução de inadimplência", desc: "Cobranças automáticas via Pix e boleto. Notificações antes do vencimento.", step: "06" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-xl bg-background p-8 border border-border/50 hover:border-accent/30 transition-all duration-300"
              >
                <span className="absolute top-6 right-6 font-heading text-4xl font-black text-muted/60">{item.step}</span>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
                Por que escolher o Contraktor
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
                Foque no seu negócio. A gente cuida da burocracia.
              </motion.h2>
              <div className="space-y-5">
                {[
                  "Crie contratos em menos de 2 minutos",
                  "Assinatura digital sem sair da plataforma",
                  "Cobranças automáticas via Pix e boleto",
                  "Dashboard financeiro em tempo real",
                  "Sem planilhas, sem retrabalho",
                  "Plano único de R$ 69/mês após trial",
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-accent mt-0.5" />
                    <span className="text-foreground text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-card p-8 shadow-elevated border border-border/50"
            >
              <div className="mb-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Plano único</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="font-heading text-5xl font-black text-foreground">69</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="mt-2 text-sm text-accent font-medium">14 dias grátis • Cancele quando quiser</p>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  "Contratos ilimitados",
                  "Assinatura digital ilimitada",
                  "Cobranças automáticas",
                  "Dashboard financeiro",
                  "Gestão de clientes",
                  "Suporte por e-mail",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm text-foreground">{feat}</span>
                  </div>
                ))}
              </div>
              <Link to="/registro" className="block">
                <Button variant="accent" size="lg" className="w-full">
                  Começar teste grátis <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA + Lead Form */}
      <section className="bg-hero py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Pronto para organizar seus contratos?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/70 text-lg mb-8">
              Cadastre-se e receba acesso antecipado. Sem compromisso.
            </motion.p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 rounded-xl bg-accent/20 px-6 py-4 text-accent"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Obrigado! Entraremos em contato em breve.</span>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeUp}
                custom={2}
                onSubmit={handleLeadSubmit}
                className="flex flex-col gap-3 sm:flex-row sm:gap-2 max-w-md mx-auto"
              >
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-12"
                />
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-12"
                />
                <Button variant="hero" size="lg" type="submit" className="shrink-0">
                  Quero testar
                </Button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-foreground">Contraktor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Contraktor. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
