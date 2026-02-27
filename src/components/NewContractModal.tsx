import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, FileText, Upload, ZoomIn, ZoomOut } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

interface NewContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const activeClientsMock = ["Maria Silva", "João Oliveira", "Ana Costa LTDA", "Pedro Santos"];

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);

const parseCurrencyInput = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  const cents = Number(digits || "0");
  return cents / 100;
};

const formatCurrencyInput = (raw: string) => {
  const value = parseCurrencyInput(raw);
  return formatBRL(value);
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.foreground} 45%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Card = styled(motion.div)`
  width: min(100%, 1080px);
  max-height: calc(100vh - 32px);
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.cardForeground};
  box-shadow: ${({ theme }) => theme.shadows.elevated};
  padding: 20px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const Header = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 22px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const Content = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
  }
`;

const LeftPanel = styled.div`
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 65%, transparent);
  border-radius: ${({ theme }) => theme.radius.lg};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.background} 65%, ${({ theme }) => theme.colors.card});
  padding: 14px;
`;

const PdfToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const UploadArea = styled.button`
  width: 100%;
  min-height: 120px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: transparent;
  color: ${({ theme }) => theme.colors.mutedForeground};
  display: grid;
  place-items: center;
  gap: 8px;
  padding: 16px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileMeta = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 14px;
`;

const ViewerWrap = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 110px minmax(0, 1fr);
  }
`;

const ThumbsColumn = styled.div`
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 70%, transparent);
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.background};
  padding: 8px;
  display: flex;
  gap: 8px;
  overflow: auto;

  @media (min-width: 768px) {
    max-height: 430px;
    flex-direction: column;
  }
`;

const ThumbButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.card};
  padding: 4px;
  cursor: pointer;
  display: grid;
  gap: 4px;
  justify-items: center;
  min-width: 86px;
`;

const ThumbPageLabel = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const PreviewColumn = styled.div`
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 70%, transparent);
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.background};
  padding: 10px;
  min-height: 280px;
`;

const PreviewToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const ToolbarGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const PageInfo = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const PreviewCanvasWrap = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  overflow: auto;
`;

const PdfList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const PdfItemButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $active }) => ($active ? theme.colors.muted : theme.colors.background)};
  color: ${({ theme }) => theme.colors.foreground};
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
`;

const RightPanel = styled.form`
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 65%, transparent);
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 14px;
  display: grid;
  gap: 14px;
`;

const Field = styled.div`
  display: grid;
  gap: 8px;
`;

const Select = styled.select`
  width: 100%;
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px color-mix(in srgb, ${({ theme }) => theme.colors.accent} 24%, transparent);
  }
`;

const ValueInstallmentRow = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: 520px) {
    grid-template-columns: minmax(0, 1fr) 140px;
  }
`;

const InstallmentInfo = styled.div`
  border-radius: ${({ theme }) => theme.radius.md};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent);
  color: ${({ theme }) => theme.colors.foreground};
  padding: 10px 12px;
  font-weight: 600;
  font-size: 14px;
`;

const ToggleFeesButton = styled(Button)`
  justify-self: start;
`;

const FeesGrid = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: 520px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 140px;
  }
`;

const Actions = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 6px;

  @media (min-width: 520px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const NewContractModal = ({ isOpen, onClose }: NewContractModalProps) => {
  type PdfItem = { id: string; name: string; url: string };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pdfFilesRef = useRef<Array<PdfItem>>([]);
  const previewCanvasRef = useRef<HTMLDivElement | null>(null);
  const [client, setClient] = useState(activeClientsMock[0]);
  const [totalValueInput, setTotalValueInput] = useState(formatBRL(0));
  const [installmentsInput, setInstallmentsInput] = useState("1");
  const [pdfFiles, setPdfFiles] = useState<Array<PdfItem>>([]);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewWidth, setPreviewWidth] = useState(420);
  const [zoom, setZoom] = useState(1);
  const [showFeesRules, setShowFeesRules] = useState(false);
  const [lateFeeInput, setLateFeeInput] = useState(formatBRL(0));
  const [interestRate, setInterestRate] = useState("0");
  const [interestPeriod, setInterestPeriod] = useState("dia");

  const totalValue = useMemo(() => parseCurrencyInput(totalValueInput), [totalValueInput]);
  const installments = useMemo(() => {
    const numeric = Number(installmentsInput);
    return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : 1;
  }, [installmentsInput]);
  const installmentValue = useMemo(() => (installments > 0 ? totalValue / installments : 0), [installments, totalValue]);
  const currentPdf = pdfFiles[currentPdfIndex] ?? null;
  const hasFeesData = useMemo(() => {
    const lateFee = parseCurrencyInput(lateFeeInput);
    const rate = Number(interestRate || "0");
    return lateFee > 0 || rate > 0;
  }, [lateFeeInput, interestRate]);

  useEffect(() => {
    pdfFilesRef.current = pdfFiles;
  }, [pdfFiles]);

  useEffect(() => {
    if (!currentPdf) return;
    setNumPages(0);
    setCurrentPage(1);
    setZoom(1);
  }, [currentPdf]);

  useEffect(() => {
    const node = previewCanvasRef.current;
    if (!node) return;

    const updateWidth = () => {
      const measured = Math.max(260, Math.floor(node.clientWidth - 16));
      setPreviewWidth(measured);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, [currentPdf]);

  useEffect(() => {
    return () => {
      pdfFilesRef.current.forEach((pdf) => URL.revokeObjectURL(pdf.url));
    };
  }, []);

  const resetForm = () => {
    setClient(activeClientsMock[0]);
    setTotalValueInput(formatBRL(0));
    setInstallmentsInput("1");
    setShowFeesRules(false);
    setLateFeeInput(formatBRL(0));
    setInterestRate("0");
    setInterestPeriod("dia");
    setCurrentPage(1);
    setNumPages(0);
    setZoom(1);
    pdfFiles.forEach((pdf) => URL.revokeObjectURL(pdf.url));
    setPdfFiles([]);
    setCurrentPdfIndex(0);
  };

  const closeModal = () => {
    resetForm();
    onClose();
  };

  const handlePickPdf = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []).filter((file) => file.type === "application/pdf");
    if (!selectedFiles.length) return;

    const newPdfItems = selectedFiles.map((file) => ({
      id: `${Date.now()}-${file.name}-${Math.random().toString(16).slice(2)}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    const startIndex = pdfFiles.length;
    setPdfFiles((prev) => [...prev, ...newPdfItems]);
    setCurrentPdfIndex(startIndex);
    event.target.value = "";
  };

  const handleDocumentLoadSuccess = ({ numPages: loadedPages }: { numPages: number }) => {
    setNumPages(loadedPages);
    setCurrentPage((prev) => Math.min(Math.max(prev, 1), loadedPages));
  };

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(numPages || 1, prev + 1));

  const handleRemoveCurrentPdf = () => {
    if (!currentPdf) return;

    setPdfFiles((prev) => {
      if (!prev.length) return prev;

      const removed = prev[currentPdfIndex];
      if (removed) URL.revokeObjectURL(removed.url);

      const next = prev.filter((_, index) => index !== currentPdfIndex);
      const nextIndex = next.length === 0 ? 0 : Math.min(currentPdfIndex, next.length - 1);
      setCurrentPdfIndex(nextIndex);
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeModal();
  };

  const clearFeesRules = () => {
    setLateFeeInput(formatBRL(0));
    setInterestRate("0");
    setInterestPeriod("dia");
    setShowFeesRules(false);
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={closeModal}>
      <Card
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Title>Novo contrato</Title>
          <Subtitle>Adicione o PDF e configure o cliente com valor e parcelamento.</Subtitle>
        </Header>

        <Content>
          <LeftPanel>
            <HiddenFileInput ref={fileInputRef} type="file" accept="application/pdf" multiple onChange={handleFileChange} />

            {pdfFiles.length > 0 ? (
              <>
                <PdfToolbar>
                  <Button type="button" variant="outline" onClick={handlePickPdf}>
                    <Upload size={16} /> Incluir mais PDF
                  </Button>
                  <Button type="button" variant="destructive" onClick={handleRemoveCurrentPdf}>
                    Remover PDF atual
                  </Button>
                </PdfToolbar>

                <PdfList>
                  {pdfFiles.map((pdf, index) => (
                    <PdfItemButton type="button" key={`${pdf.name}-${index}`} $active={index === currentPdfIndex} onClick={() => setCurrentPdfIndex(index)}>
                      PDF {index + 1}
                    </PdfItemButton>
                  ))}
                </PdfList>

                <FileMeta>
                  <FileText size={16} />
                  <span>{currentPdf?.name}</span>
                </FileMeta>

                {currentPdf?.url && (
                  <Document file={currentPdf.url} onLoadSuccess={handleDocumentLoadSuccess}>
                    <ViewerWrap>
                      <ThumbsColumn>
                        {numPages > 0 &&
                          Array.from({ length: numPages }, (_, index) => {
                            const pageNumber = index + 1;
                            return (
                              <ThumbButton type="button" key={pageNumber} $active={pageNumber === currentPage} onClick={() => setCurrentPage(pageNumber)}>
                                <Page pageNumber={pageNumber} width={72} renderTextLayer={false} renderAnnotationLayer={false} />
                                <ThumbPageLabel>{pageNumber}</ThumbPageLabel>
                              </ThumbButton>
                            );
                          })}
                      </ThumbsColumn>

                      <PreviewColumn>
                        <PreviewToolbar>
                          <ToolbarGroup>
                            <Button type="button" variant="outline" size="sm" onClick={goToPrevPage} disabled={currentPage <= 1}>
                              <ChevronLeft size={14} />
                            </Button>
                            <PageInfo>{`Página ${currentPage}${numPages ? ` de ${numPages}` : ""}`}</PageInfo>
                            <Button type="button" variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage >= numPages}>
                              <ChevronRight size={14} />
                            </Button>
                          </ToolbarGroup>

                          <ToolbarGroup>
                            <Button type="button" variant="outline" size="sm" onClick={() => setZoom((prev) => Math.max(0.7, Number((prev - 0.1).toFixed(2))))}>
                              <ZoomOut size={14} />
                            </Button>
                            <PageInfo>{`${Math.round(zoom * 100)}%`}</PageInfo>
                            <Button type="button" variant="outline" size="sm" onClick={() => setZoom((prev) => Math.min(2, Number((prev + 0.1).toFixed(2))))}>
                              <ZoomIn size={14} />
                            </Button>
                          </ToolbarGroup>
                        </PreviewToolbar>

                        <PreviewCanvasWrap ref={previewCanvasRef}>
                          <Page pageNumber={currentPage} width={previewWidth} scale={zoom} renderTextLayer={false} renderAnnotationLayer={false} />
                        </PreviewCanvasWrap>
                      </PreviewColumn>
                    </ViewerWrap>
                  </Document>
                )}
              </>
            ) : (
              <UploadArea type="button" onClick={handlePickPdf}>
                <Upload size={20} />
                <span>Toque aqui para incluir arquivo</span>
              </UploadArea>
            )}
          </LeftPanel>

          <RightPanel onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="contract-client">Cliente</Label>
              <Select id="contract-client" value={client} onChange={(event) => setClient(event.target.value)}>
                {activeClientsMock.map((clientName) => (
                  <option key={clientName} value={clientName}>
                    {clientName}
                  </option>
                ))}
              </Select>
            </Field>

            <ValueInstallmentRow>
              <Field>
                <Label htmlFor="contract-total-value">Valor total</Label>
                <Input
                  id="contract-total-value"
                  inputMode="numeric"
                  placeholder="R$ 0,00"
                  value={totalValueInput}
                  onChange={(event) => setTotalValueInput(formatCurrencyInput(event.target.value))}
                />
              </Field>

              <Field>
                <Label htmlFor="contract-installments">Parcelas</Label>
                <Input
                  id="contract-installments"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={installmentsInput}
                  onChange={(event) => setInstallmentsInput(event.target.value.replace(/\D/g, ""))}
                />
              </Field>
            </ValueInstallmentRow>

            <InstallmentInfo>{`${installments}x ${formatBRL(installmentValue)}`}</InstallmentInfo>

            <ToggleFeesButton
              type="button"
              variant={hasFeesData ? "destructive" : "outline"}
              onClick={() => {
                if (hasFeesData) {
                  clearFeesRules();
                  return;
                }
                setShowFeesRules((prev) => !prev);
              }}
            >
              {hasFeesData ? "Remover regras" : "Incluir regras de taxa de juros"}
            </ToggleFeesButton>

            {showFeesRules && (
              <FeesGrid>
                <Field>
                  <Label htmlFor="late-fee">Multa após vencimento</Label>
                  <Input
                    id="late-fee"
                    inputMode="numeric"
                    placeholder="R$ 0,00"
                    value={lateFeeInput}
                    onChange={(event) => setLateFeeInput(formatCurrencyInput(event.target.value))}
                  />
                </Field>

                <Field>
                  <Label htmlFor="interest-rate">Taxa de juros (%)</Label>
                  <Input
                    id="interest-rate"
                    type="number"
                    min={0}
                    step="0.01"
                    value={interestRate}
                    onChange={(event) => setInterestRate(event.target.value)}
                  />
                </Field>

                <Field>
                  <Label htmlFor="interest-period">Período</Label>
                  <Select id="interest-period" value={interestPeriod} onChange={(event) => setInterestPeriod(event.target.value)}>
                    <option value="dia">Ao dia</option>
                    <option value="mes">Ao mês</option>
                    <option value="ano">Ao ano</option>
                  </Select>
                </Field>
              </FeesGrid>
            )}

            <Actions>
              <Button type="button" variant="destructive" onClick={closeModal}>
                Cancelar
              </Button>
              <Button type="button" variant="secondary" onClick={closeModal}>
                Salvar rascunho
              </Button>
              <Button type="submit" variant="accent">
                Enviar
              </Button>
            </Actions>
          </RightPanel>
        </Content>
      </Card>
    </Overlay>
  );
};

export default NewContractModal;
