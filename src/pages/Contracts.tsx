import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  FileSignature,
  MoreHorizontal,
  Eye,
} from "lucide-react";

const mockContracts = [
  { id: "1", client: "Maria Silva", title: "Consultoria de Marketing", value: "R$ 3.500,00", installments: 3, status: "Signed", date: "22/02/2026" },
  { id: "2", client: "João Oliveira", title: "Desenvolvimento Web", value: "R$ 8.000,00", installments: 6, status: "Sent", date: "20/02/2026" },
  { id: "3", client: "Ana Costa LTDA", title: "Design de Marca", value: "R$ 2.200,00", installments: 2, status: "Draft", date: "18/02/2026" },
  { id: "4", client: "Pedro Santos", title: "Gestão de Redes Sociais", value: "R$ 1.800,00", installments: 1, status: "Signed", date: "15/02/2026" },
  { id: "5", client: "Maria Silva", title: "Assessoria Financeira", value: "R$ 5.000,00", installments: 4, status: "Cancelled", date: "10/02/2026" },
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

const Contracts = () => {
  const [search, setSearch] = useState("");

  const filtered = mockContracts.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Contratos</h1>
          <p className="text-muted-foreground">{mockContracts.length} contratos</p>
        </div>
        <Button variant="accent">
          <Plus className="mr-1 h-4 w-4" /> Novo contrato
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar contratos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11"
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card shadow-card border border-border/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-6 py-4 font-medium">Contrato</th>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Valor</th>
                <th className="px-6 py-4 font-medium">Parcelas</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <FileSignature className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-card-foreground">{c.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{c.client}</td>
                  <td className="px-6 py-4 text-sm font-medium text-card-foreground">{c.value}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{c.installments}x</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[c.status]}`}>
                      {statusLabels[c.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{c.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Contracts;
