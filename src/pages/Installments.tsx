import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, Calendar, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const mockInstallments = [
  { id: "1", contract: "Consultoria de Marketing", client: "Maria Silva", dueDate: "15/03/2026", amount: "R$ 1.166,67", status: "Pending" },
  { id: "2", contract: "Consultoria de Marketing", client: "Maria Silva", dueDate: "15/02/2026", amount: "R$ 1.166,67", status: "Paid" },
  { id: "3", contract: "Desenvolvimento Web", client: "João Oliveira", dueDate: "10/03/2026", amount: "R$ 1.333,33", status: "Pending" },
  { id: "4", contract: "Desenvolvimento Web", client: "João Oliveira", dueDate: "10/02/2026", amount: "R$ 1.333,33", status: "Overdue" },
  { id: "5", contract: "Design de Marca", client: "Ana Costa LTDA", dueDate: "20/03/2026", amount: "R$ 1.100,00", status: "Pending" },
  { id: "6", contract: "Gestão de Redes Sociais", client: "Pedro Santos", dueDate: "01/03/2026", amount: "R$ 1.800,00", status: "Paid" },
];

const statusConfig: Record<string, { label: string; icon: typeof Clock }> = {
  Pending: { label: "Pendente", icon: Clock },
  Paid: { label: "Pago", icon: CheckCircle2 },
  Overdue: { label: "Vencido", icon: AlertCircle },
};

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const SummaryGrid = styled.div`
  margin-bottom: 32px;
  display: grid;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const SummaryCard = styled(motion.div)`
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 20px;
`;

const SummaryLabel = styled.p`
  margin-bottom: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const SummaryValue = styled.p<{ $tone: string }>`
  font-size: 24px;
  font-weight: 700;
  font-family: Inter, system-ui, sans-serif;
  color: ${({ theme, $tone }) => ($tone === "warning" ? theme.colors.warning : $tone === "success" ? theme.colors.success : theme.colors.destructive)};
`;

const SearchWrap = styled.div`
  max-width: 380px;
  margin-bottom: 24px;
  position: relative;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const SearchInput = styled(Input)`
  padding-left: 40px;
  min-height: 44px;
`;

const TableCard = styled(motion.div)`
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;
`;

const Overflow = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeadCell = styled.th`
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const Row = styled(motion.tr)`
  border-bottom: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);

  &:hover > td {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.foreground} 6%, ${({ theme }) => theme.colors.card});
  }

  &:last-child {
    border-bottom: 0;
  }
`;

const Cell = styled.td`
  padding: 16px 24px;
  font-size: 14px;
  line-height: 20px;
  background: transparent;
  transition: background-color 200ms ease;
`;

const ContractMainCell = styled(Cell)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.cardForeground};
`;

const MutedCell = styled(Cell)`
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const StrongCell = styled(Cell)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.cardForeground};
`;

const ContractCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ContractIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent);
  color: ${({ theme }) => theme.colors.primary};
`;

const DateCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.mutedForeground};

  > svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: ${({ theme, $status }) =>
    $status === "Paid" ? theme.colors.success : $status === "Overdue" ? theme.colors.destructive : theme.colors.warning};
  background: ${({ theme, $status }) =>
    $status === "Paid"
      ? "color-mix(in srgb, " + theme.colors.success + " 12%, transparent)"
      : $status === "Overdue"
      ? "color-mix(in srgb, " + theme.colors.destructive + " 12%, transparent)"
      : "color-mix(in srgb, " + theme.colors.warning + " 12%, transparent)"};

  > svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }
`;

const Installments = () => {
  const [search, setSearch] = useState("");

  const filtered = mockInstallments.filter(
    (item) => item.contract.toLowerCase().includes(search.toLowerCase()) || item.client.toLowerCase().includes(search.toLowerCase()),
  );

  const summary = [
    { label: "Pendentes", count: mockInstallments.filter((i) => i.status === "Pending").length, tone: "warning" },
    { label: "Pagas", count: mockInstallments.filter((i) => i.status === "Paid").length, tone: "success" },
    { label: "Vencidas", count: mockInstallments.filter((i) => i.status === "Overdue").length, tone: "destructive" },
  ];

  return (
    <div>
      <Header>
        <Title>Parcelas</Title>
        <Subtitle>Acompanhe todas as parcelas dos seus contratos</Subtitle>
      </Header>

      <SummaryGrid>
        {summary.map((s, i) => (
          <SummaryCard key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <SummaryLabel>{s.label}</SummaryLabel>
            <SummaryValue $tone={s.tone}>{s.count}</SummaryValue>
          </SummaryCard>
        ))}
      </SummaryGrid>

      <SearchWrap>
        <SearchIcon size={16} />
        <SearchInput placeholder="Buscar parcelas..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </SearchWrap>

      <TableCard initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Overflow>
          <Table>
            <thead>
              <tr>
                <HeadCell>Contrato</HeadCell>
                <HeadCell>Cliente</HeadCell>
                <HeadCell>Vencimento</HeadCell>
                <HeadCell>Valor</HeadCell>
                <HeadCell>Status</HeadCell>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inst, i) => {
                const cfg = statusConfig[inst.status];
                const StatusIcon = cfg.icon;
                return (
                  <Row key={inst.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                    <ContractMainCell>
                      <ContractCell>
                        <ContractIcon>
                          <CreditCard size={16} />
                        </ContractIcon>
                        <span>{inst.contract}</span>
                      </ContractCell>
                    </ContractMainCell>
                    <MutedCell>{inst.client}</MutedCell>
                    <Cell>
                      <DateCell>
                        <Calendar size={14} />
                        {inst.dueDate}
                      </DateCell>
                    </Cell>
                    <StrongCell>{inst.amount}</StrongCell>
                    <Cell>
                      <StatusBadge $status={inst.status}>
                        <StatusIcon size={12} />
                        {cfg.label}
                      </StatusBadge>
                    </Cell>
                  </Row>
                );
              })}
            </tbody>
          </Table>
        </Overflow>
      </TableCard>
    </div>
  );
};

export default Installments;
