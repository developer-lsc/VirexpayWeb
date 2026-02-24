import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Search,
  CreditCard,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const mockInstallments = [
  { id: "1", contract: "Consultoria de Marketing", client: "Maria Silva", dueDate: "15/03/2026", amount: "R$ 1.166,67", status: "Pending" },
  { id: "2", contract: "Consultoria de Marketing", client: "Maria Silva", dueDate: "15/02/2026", amount: "R$ 1.166,67", status: "Paid" },
  { id: "3", contract: "Desenvolvimento Web", client: "João Oliveira", dueDate: "10/03/2026", amount: "R$ 1.333,33", status: "Pending" },
  { id: "4", contract: "Desenvolvimento Web", client: "João Oliveira", dueDate: "10/02/2026", amount: "R$ 1.333,33", status: "Overdue" },
  { id: "5", contract: "Design de Marca", client: "Ana Costa LTDA", dueDate: "20/03/2026", amount: "R$ 1.100,00", status: "Pending" },
  { id: "6", contract: "Gestão de Redes Sociais", client: "Pedro Santos", dueDate: "01/03/2026", amount: "R$ 1.800,00", status: "Paid" },
];

const statusConfig: Record<string, { label: string; icon: typeof Clock; style: string }> = {
  Pending: { label: "Pendente", icon: Clock, style: "bg-warning/10 text-warning" },
  Paid: { label: "Pago", icon: CheckCircle2, style: "bg-success/10 text-success" },
  Overdue: { label: "Vencido", icon: AlertCircle, style: "bg-destructive/10 text-destructive" },
};

const Installments = () => {
  const [search, setSearch] = useState("");

  const filtered = mockInstallments.filter(
    (i) =>
      i.contract.toLowerCase().includes(search.toLowerCase()) ||
      i.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">Parcelas</h1>
        <p className="text-muted-foreground">Acompanhe todas as parcelas dos seus contratos</p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Pendentes", count: mockInstallments.filter(i => i.status === "Pending").length, color: "text-warning", bg: "bg-warning/10" },
          { label: "Pagas", count: mockInstallments.filter(i => i.status === "Paid").length, color: "text-success", bg: "bg-success/10" },
          { label: "Vencidas", count: mockInstallments.filter(i => i.status === "Overdue").length, color: "text-destructive", bg: "bg-destructive/10" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl bg-card p-5 shadow-card border border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
            <p className={`font-heading text-2xl font-bold ${s.color}`}>{s.count}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar parcelas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11"
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-card shadow-card border border-border/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-6 py-4 font-medium">Contrato</th>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Vencimento</th>
                <th className="px-6 py-4 font-medium">Valor</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inst, i) => {
                const config = statusConfig[inst.status];
                const StatusIcon = config.icon;
                return (
                  <motion.tr
                    key={inst.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-card-foreground">{inst.contract}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{inst.client}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {inst.dueDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-card-foreground">{inst.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.style}`}>
                        <StatusIcon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Installments;
