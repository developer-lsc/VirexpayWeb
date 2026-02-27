import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ClientFormValues {
  name: string;
  document: string;
  email: string;
  phone: string;
}

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ClientFormValues;
  onSubmit: (values: ClientFormValues) => void;
  onInactivate?: () => void;
}

const formatCpfCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14);

  if (digits.length <= 11) {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  }

  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.foreground} 45%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ModalCard = styled(motion.div)`
  width: 100%;
  max-width: 520px;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.cardForeground};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 6px;
`;

const ModalSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  gap: 14px;
`;

const Field = styled.div`
  display: grid;
  gap: 8px;
`;

const ModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

const emptyForm: ClientFormValues = {
  name: "",
  document: "",
  email: "",
  phone: "",
};

const NewClientModal = ({ isOpen, onClose, initialData, onSubmit, onInactivate }: NewClientModalProps) => {
  const [form, setForm] = useState({
    ...emptyForm,
  });

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (!isOpen) return;
    setForm(initialData ?? emptyForm);
  }, [initialData, isOpen]);

  const closeAndReset = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
    closeAndReset();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={closeAndReset}>
      <ModalCard
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        <ModalTitle>{isEditMode ? "Editar cliente" : "Novo cliente"}</ModalTitle>
        <ModalSubtitle>
          {isEditMode ? "Atualize os dados do cliente ou inative o cadastro." : "Preencha os dados para cadastrar um novo cliente."}
        </ModalSubtitle>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="client-name">Nome</Label>
            <Input
              id="client-name"
              placeholder="Nome completo"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="client-document">CPF ou CNPJ</Label>
            <Input
              id="client-document"
              placeholder="000.000.000-00"
              inputMode="numeric"
              value={form.document}
              onChange={(event) => setForm((prev) => ({ ...prev, document: formatCpfCnpj(event.target.value) }))}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="client-email">Email</Label>
            <Input
              id="client-email"
              type="email"
              placeholder="nome@empresa.com"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="client-phone">Telefone</Label>
            <Input
              id="client-phone"
              placeholder="(00) 00000-0000"
              inputMode="numeric"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: formatPhone(event.target.value) }))}
              required
            />
          </Field>

          <ModalActions>
            {isEditMode && onInactivate && (
              <Button type="button" variant="destructive" onClick={onInactivate}>
                Inativar cliente
              </Button>
            )}
            <Button type="button" variant="outline" onClick={closeAndReset}>
              Cancelar
            </Button>
            <Button type="submit" variant="accent">
              {isEditMode ? "Salvar" : "Cadastrar"}
            </Button>
          </ModalActions>
        </Form>
      </ModalCard>
    </ModalOverlay>
  );
};

export default NewClientModal;
