import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewContractModal from "@/components/NewContractModal";
import { Plus, Search, FilePenLine, MoreHorizontal, Eye } from "lucide-react";

const mockContracts = [
  { id: "1", client: "Maria Silva", title: "Consultoria de Marketing", value: "R$ 3.500,00", installments: 3, status: "Signed", date: "22/02/2026" },
  { id: "2", client: "João Oliveira", title: "Desenvolvimento Web", value: "R$ 8.000,00", installments: 6, status: "Sent", date: "20/02/2026" },
  { id: "3", client: "Ana Costa LTDA", title: "Design de Marca", value: "R$ 2.200,00", installments: 2, status: "Draft", date: "18/02/2026" },
  { id: "4", client: "Pedro Santos", title: "Gestão de Redes Sociais", value: "R$ 1.800,00", installments: 1, status: "Signed", date: "15/02/2026" },
  { id: "5", client: "Maria Silva", title: "Assessoria Financeira", value: "R$ 5.000,00", installments: 4, status: "Cancelled", date: "10/02/2026" },
];

const statusLabels: Record<string, string> = {
  Draft: "Rascunho",
  Sent: "Enviado",
  Signed: "Assinado",
  Cancelled: "Cancelado",
};

const Header = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 30px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
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
`;

const Card = styled(motion.div)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
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

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.mutedForeground};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 200ms ease, color 200ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const Badge = styled.span<{ $status: string }>`
  display: inline-flex;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: ${({ theme, $status }) =>
    $status === "Signed"
      ? theme.colors.success
      : $status === "Sent"
      ? theme.colors.warning
      : $status === "Cancelled"
      ? theme.colors.destructive
      : theme.colors.mutedForeground};
  background: ${({ theme, $status }) =>
    $status === "Signed"
      ? "color-mix(in srgb, " + theme.colors.success + " 12%, transparent)"
      : $status === "Sent"
      ? "color-mix(in srgb, " + theme.colors.warning + " 12%, transparent)"
      : $status === "Cancelled"
      ? "color-mix(in srgb, " + theme.colors.destructive + " 12%, transparent)"
      : theme.colors.muted};
`;

const Contracts = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = mockContracts.filter(
    (c) => c.title.toLowerCase().includes(search.toLowerCase()) || c.client.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div>
        <Header>
          <div>
            <Title>Contratos</Title>
            <Subtitle>{mockContracts.length} contratos</Subtitle>
          </div>
          <Button variant="accent" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Novo contrato
          </Button>
        </Header>

        <SearchWrap>
          <SearchIcon size={16} />
          <SearchInput placeholder="Buscar contratos..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </SearchWrap>

        <Card initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Overflow>
            <Table>
              <thead>
                <tr>
                  <HeadCell>Contrato</HeadCell>
                  <HeadCell>Cliente</HeadCell>
                  <HeadCell>Valor</HeadCell>
                  <HeadCell>Parcelas</HeadCell>
                  <HeadCell>Status</HeadCell>
                  <HeadCell>Data</HeadCell>
                  <HeadCell />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <Row key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                    <ContractMainCell>
                      <ContractCell>
                        <ContractIcon>
                          <FilePenLine size={16} />
                        </ContractIcon>
                        <span>{c.title}</span>
                      </ContractCell>
                    </ContractMainCell>
                    <MutedCell>{c.client}</MutedCell>
                    <StrongCell>{c.value}</StrongCell>
                    <MutedCell>{c.installments}x</MutedCell>
                    <Cell>
                      <Badge $status={c.status}>{statusLabels[c.status]}</Badge>
                    </Cell>
                    <MutedCell>{c.date}</MutedCell>
                    <Cell>
                      <Actions>
                        <ActionButton>
                          <Eye size={16} />
                        </ActionButton>
                        <ActionButton>
                          <MoreHorizontal size={16} />
                        </ActionButton>
                      </Actions>
                    </Cell>
                  </Row>
                ))}
              </tbody>
            </Table>
          </Overflow>
        </Card>
      </div>

      <NewContractModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Contracts;
