import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  MoreHorizontal,
  Users,
  Mail,
  Phone,
} from "lucide-react";

const mockClients = [
  { id: "1", name: "Maria Silva", document: "123.456.789-00", email: "maria@email.com", phone: "(11) 99999-0001", contracts: 3 },
  { id: "2", name: "João Oliveira", document: "987.654.321-00", email: "joao@email.com", phone: "(21) 99999-0002", contracts: 2 },
  { id: "3", name: "Ana Costa LTDA", document: "12.345.678/0001-00", email: "contato@anacosta.com", phone: "(31) 99999-0003", contracts: 5 },
  { id: "4", name: "Pedro Santos", document: "456.789.123-00", email: "pedro@email.com", phone: "(41) 99999-0004", contracts: 1 },
];

const Clients = () => {
  const [search, setSearch] = useState("");

  const filtered = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">{mockClients.length} clientes cadastrados</p>
        </div>
        <Button variant="accent">
          <Plus className="mr-1 h-4 w-4" /> Novo cliente
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar clientes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11"
        />
      </div>

      {/* Client Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((client, i) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl bg-card p-6 shadow-card border border-border/50 hover:shadow-elevated transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {client.name.charAt(0)}
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            <h3 className="font-heading font-bold text-card-foreground mb-1">{client.name}</h3>
            <p className="text-xs text-muted-foreground mb-4">{client.document}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>{client.phone}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <span className="text-xs text-muted-foreground">
                {client.contracts} contrato{client.contracts !== 1 ? "s" : ""}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
