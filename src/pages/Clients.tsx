import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewClientModal, { type ClientFormValues } from "@/components/NewClientModal";
import { Plus, Search, MoreHorizontal, Mail, Phone } from "lucide-react";

interface Client {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  contracts: number;
  isActive: boolean;
}

const mockClients: Client[] = [
  { id: "1", name: "Maria Silva", document: "123.456.789-00", email: "maria@email.com", phone: "(11) 99999-0001", contracts: 3, isActive: true },
  { id: "2", name: "João Oliveira", document: "987.654.321-00", email: "joao@email.com", phone: "(21) 99999-0002", contracts: 2, isActive: true },
  { id: "3", name: "Ana Costa LTDA", document: "12.345.678/0001-00", email: "contato@anacosta.com", phone: "(31) 99999-0003", contracts: 5, isActive: true },
  { id: "4", name: "Pedro Santos", document: "456.789.123-00", email: "pedro@email.com", phone: "(41) 99999-0004", contracts: 1, isActive: true },
];

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
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
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
  min-height: 44px;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled(motion.div)`
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 24px;
  cursor: pointer;
  transition: box-shadow 300ms ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.elevated};
  }
`;

const CardTop = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Initial = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent);
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
`;

const IconButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.mutedForeground};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const Name = styled.h3`
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.cardForeground};
`;

const Document = styled.p`
  margin-bottom: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const Details = styled.div`
  display: grid;
  gap: 10px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedForeground};

  > svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Footer = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
`;

const ContractsInfo = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const Clients = () => {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const selectedClient = selectedClientId ? clients.find((client) => client.id === selectedClientId) ?? null : null;
  const activeClients = clients.filter((client) => client.isActive);

  const filtered = activeClients.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const openCreateModal = () => {
    setSelectedClientId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClientId(null);
  };

  const handleModalSubmit = (values: ClientFormValues) => {
    if (selectedClient) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === selectedClient.id
            ? {
                ...client,
                ...values,
              }
            : client,
        ),
      );
      return;
    }

    setClients((prev) => [
      {
        id: `${Date.now()}`,
        contracts: 0,
        isActive: true,
        ...values,
      },
      ...prev,
    ]);
  };

  const handleInactivate = () => {
    if (!selectedClient) return;

    setClients((prev) =>
      prev.map((client) =>
        client.id === selectedClient.id
          ? {
              ...client,
              isActive: false,
            }
          : client,
      ),
    );

    closeModal();
  };

  return (
    <>
      <div>
        <Header>
          <div>
            <Title>Clientes</Title>
            <Subtitle>{activeClients.length} clientes cadastrados</Subtitle>
          </div>
          <Button variant="accent" onClick={openCreateModal}>
            <Plus size={16} /> Novo cliente
          </Button>
        </Header>

        <SearchWrap>
          <SearchIcon size={16} />
          <SearchInput placeholder="Buscar clientes..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </SearchWrap>

        <Grid>
          {filtered.map((client, i) => (
            <Card key={client.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <CardTop>
                <Initial>{client.name.charAt(0)}</Initial>
                <IconButton type="button" onClick={() => openEditModal(client.id)}>
                  <MoreHorizontal size={18} />
                </IconButton>
              </CardTop>
              <Name>{client.name}</Name>
              <Document>{client.document}</Document>
              <Details>
                <DetailRow>
                  <Mail size={14} />
                  <span>{client.email}</span>
                </DetailRow>
                <DetailRow>
                  <Phone size={14} />
                  <span>{client.phone}</span>
                </DetailRow>
              </Details>
              <Footer>
                <ContractsInfo>
                  {client.contracts} contrato{client.contracts !== 1 ? "s" : ""}
                </ContractsInfo>
              </Footer>
            </Card>
          ))}
        </Grid>
      </div>

      <NewClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={
          selectedClient
            ? {
                name: selectedClient.name,
                document: selectedClient.document,
                email: selectedClient.email,
                phone: selectedClient.phone,
              }
            : undefined
        }
        onSubmit={handleModalSubmit}
        onInactivate={selectedClient ? handleInactivate : undefined}
      />
    </>
  );
};

export default Clients;
