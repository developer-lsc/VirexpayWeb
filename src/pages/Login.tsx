import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate auth
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">Contraktor</span>
          </Link>

          <h1 className="mb-2 font-heading text-2xl font-bold text-foreground">Bem-vindo de volta</h1>
          <p className="mb-8 text-muted-foreground">Entre na sua conta para continuar.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link to="/recuperar-senha" className="text-sm text-accent hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11" variant="accent">
              Entrar <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link to="/registro" className="font-medium text-accent hover:underline">
              Crie sua conta grátis
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Branding */}
      <div className="hidden w-1/2 bg-hero lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
            <FileText className="h-8 w-8 text-accent" />
          </div>
          <h2 className="mb-4 font-heading text-3xl font-bold text-primary-foreground">
            Gerencie contratos com facilidade
          </h2>
          <p className="text-primary-foreground/60">
            Crie, assine e cobre automaticamente. Tudo em uma plataforma simples e segura.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
