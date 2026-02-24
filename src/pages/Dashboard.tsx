import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  FileSignature,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

const metrics = [
  {
    label: "Total a Receber",
    value: "R$ 12.450,00",
    icon: DollarSign,
    change: "+8%",
    positive: true,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Total Recebido",
    value: "R$ 8.320,00",
    icon: TrendingUp,
    change: "+12%",
    positive: true,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Total Vencido",
    value: "R$ 2.100,00",
    icon: AlertTriangle,
    change: "-3%",
    positive: false,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    label: "Contratos Ativos",
    value: "14",
    icon: FileSignature,
    change: "+2",
    positive: true,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Receita Mensal",
    value: "R$ 4.890,00",
    icon: BarChart3,
    change: "+15%",
    positive: true,
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const recentContracts = [
  { client: "Maria Silva", title: "Consultoria de Marketing", value: "R$ 3.500,00", status: "Signed", date: "22/02/2026" },
  { client: "João Oliveira", title: "Desenvolvimento Web", value: "R$ 8.000,00", status: "Sent", date: "20/02/2026" },
  { client: "Ana Costa", title: "Design de Marca", value: "R$ 2.200,00", status: "Draft", date: "18/02/2026" },
  { client: "Pedro Santos", title: "Gestão de Redes Sociais", value: "R$ 1.800,00", status: "Signed", date: "15/02/2026" },
];

const statusStyles: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Sent: "bg-warning/10 text-warning",
  Signed: "bg-success/10 text-success",
  Cancelled: "bg-destructive/10 text-destructive",
};

const statusLabels: Record<string, string> = {
  Draft: "Rascunho",
  Sent: "Enviado",
  Signed: "Assinado",
  Cancelled: "Cancelado",
};

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio</p>
        </div>
        <Link to="/app/contratos">
          <Button variant="accent">
            <Plus className="mr-1 h-4 w-4" /> Novo contrato
          </Button>
        </Link>
      </div>

      {/* Metric Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i}
            className="rounded-xl bg-card p-5 shadow-card border border-border/50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.bg}`}>
                <m.icon className={`h-5 w-5 ${m.color}`} />
              </div>
              <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${m.positive ? "text-success" : "text-destructive"}`}>
                {m.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {m.change}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{m.label}</p>
            <p className="font-heading text-xl font-bold text-card-foreground">{m.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Contracts */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-card shadow-card border border-border/50"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-heading text-lg font-bold text-card-foreground">Contratos Recentes</h2>
          <Link to="/app/contratos" className="text-sm text-accent hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Contrato</th>
                <th className="px-6 py-3 font-medium">Valor</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentContracts.map((c, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-card-foreground">{c.client}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{c.title}</td>
                  <td className="px-6 py-4 text-sm font-medium text-card-foreground">{c.value}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[c.status]}`}>
                      {statusLabels[c.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
