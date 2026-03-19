import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Mail, MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface RelatorioPageProps {
  onBack: () => void;
}

export default function RelatorioPage({ onBack }: RelatorioPageProps) {
  const [activeTab, setActiveTab] = useState("shows");
  const [formData, setFormData] = useState({
    nomeMusico: "",
    dataInicio: "",
    dataFim: "",
    showsSelecionados: [] as string[],
    trilhasSelecionadas: [] as string[],
    emailAssociacao: "",
    emailCopia: "",
    termoAceito: false,
  });

  const { data: shows = [] } = trpc.shows.list.useQuery();
  const { data: trilhas = [] } = trpc.trilhas.list.useQuery();
  const sendEmailMutation = trpc.email.sendReport.useMutation();

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("pt-BR");
  };

  const handleShowSelection = (showId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      showsSelecionados: checked
        ? [...prev.showsSelecionados, showId]
        : prev.showsSelecionados.filter((id) => id !== showId),
    }));
  };

  const handleTrilhaSelection = (trilhaId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      trilhasSelecionadas: checked
        ? [...prev.trilhasSelecionadas, trilhaId]
        : prev.trilhasSelecionadas.filter((id) => id !== trilhaId),
    }));
  };

  const handleGenerateReport = async () => {
    if (activeTab === "shows" && formData.showsSelecionados.length === 0) {
      toast.error("Selecione pelo menos um show para gerar o relatório.");
      return;
    }
    if (activeTab === "trilhas" && formData.trilhasSelecionadas.length === 0) {
      toast.error("Selecione pelo menos uma trilha para gerar o relatório.");
      return;
    }

    if (!formData.termoAceito) {
      toast.error("Você deve aceitar o termo de responsabilidade.");
      return;
    }

    if (!formData.emailAssociacao) {
      toast.error("Informe o e-mail da associação.");
      return;
    }

    try {
      await sendEmailMutation.mutateAsync({
        emailAssociacao: formData.emailAssociacao,
        emailCopia: formData.emailCopia || undefined,
        tipo: activeTab as "shows" | "trilhas",
        nomeMusico: formData.nomeMusico,
        dataInicio: formData.dataInicio,
        dataFim: formData.dataFim,
        showsSelecionados: formData.showsSelecionados,
        trilhasSelecionadas: formData.trilhasSelecionadas,
      });

      toast.success("Relatório enviado com sucesso!");
      onBack();
    } catch (error) {
      toast.error("Falha ao enviar relatório.");
    }
  };

  const handleWhatsApp = () => {
    if (!formData.termoAceito) {
      toast.error("Você deve aceitar o termo de responsabilidade.");
      return;
    }

    const mensagem =
      activeTab === "shows"
        ? `Olá, associação. Aqui é ${formData.nomeMusico || "[NOME DO MÚSICO]"}. Encaminho aos senhores, para fins de acompanhamento junto ao ECAD, o relatório das minhas participações em shows.`
        : `Olá, aqui é ${formData.nomeMusico || "[NOME DO COMPOSITOR]"}. Encaminho para fins de acompanhamento junto ao ECAD as cue-sheets e dados das obras.`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, "_blank");

    toast.success("Relatório enviado via WhatsApp!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button onClick={onBack} variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-900">Gerar Relatório</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shows">Relatório de Shows</TabsTrigger>
            <TabsTrigger value="trilhas">Relatório de Trilhas</TabsTrigger>
          </TabsList>

          <TabsContent value="shows">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">Consolide seus registros por período</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nomeMusico">Nome do Músico</Label>
                  <Input
                    id="nomeMusico"
                    value={formData.nomeMusico}
                    onChange={(e) => setFormData({ ...formData, nomeMusico: e.target.value })}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="dataInicio">Data Início</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={formData.dataInicio}
                      onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataFim">Data Fim</Label>
                    <Input
                      id="dataFim"
                      type="date"
                      value={formData.dataFim}
                      onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Selecionar Shows</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {shows.length === 0 ? (
                      <p className="text-gray-500 text-sm">Nenhum show registrado.</p>
                    ) : (
                      shows.map((show) => (
                        <div key={show.id} className="flex items-center space-x-2 p-2 border rounded">
                          <Checkbox
                            id={`show-${show.id}`}
                            checked={formData.showsSelecionados.includes(show.id)}
                            onCheckedChange={(checked) =>
                              handleShowSelection(show.id, checked as boolean)
                            }
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{show.nomeShow}</p>
                            <p className="text-xs text-gray-600">
                              {formatDate(show.dataShow)} - {show.localShow}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="emailAssociacao">E-mail da Associação *</Label>
                  <Input
                    id="emailAssociacao"
                    type="email"
                    value={formData.emailAssociacao}
                    onChange={(e) => setFormData({ ...formData, emailAssociacao: e.target.value })}
                    placeholder="associacao@exemplo.com"
                  />
                </div>

                <div>
                  <Label htmlFor="emailCopia">Com Cópia Para (opcional)</Label>
                  <Input
                    id="emailCopia"
                    type="email"
                    value={formData.emailCopia}
                    onChange={(e) => setFormData({ ...formData, emailCopia: e.target.value })}
                    placeholder="copia@exemplo.com"
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">Termo de Responsabilidade</h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    "Declaro que sou o único responsável pelas informações fornecidas. O app Faz o B.O.M. e seus gestores não se responsabilizam por erros, omissões ou inverdades nos relatórios enviados."
                  </p>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="termo"
                      checked={formData.termoAceito}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, termoAceito: checked as boolean })
                      }
                    />
                    <Label htmlFor="termo" className="text-sm">
                      Li e aceito o termo de responsabilidade
                    </Label>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleGenerateReport}
                    disabled={!formData.termoAceito || sendEmailMutation.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {sendEmailMutation.isPending ? "Enviando..." : "Enviar por E-mail"}
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    disabled={!formData.termoAceito}
                    variant="outline"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trilhas">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">Consolide seu relatório por período</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nomeCompositor">Nome do Compositor</Label>
                  <Input
                    id="nomeCompositor"
                    value={formData.nomeMusico}
                    onChange={(e) => setFormData({ ...formData, nomeMusico: e.target.value })}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="dataInicio2">Data Início</Label>
                    <Input
                      id="dataInicio2"
                      type="date"
                      value={formData.dataInicio}
                      onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataFim2">Data Fim</Label>
                    <Input
                      id="dataFim2"
                      type="date"
                      value={formData.dataFim}
                      onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Selecionar Trilhas</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {trilhas.length === 0 ? (
                      <p className="text-gray-500 text-sm">Nenhuma trilha registrada.</p>
                    ) : (
                      trilhas.map((trilha) => (
                        <div key={trilha.id} className="flex items-center space-x-2 p-2 border rounded">
                          <Checkbox
                            id={`trilha-${trilha.id}`}
                            checked={formData.trilhasSelecionadas.includes(trilha.id)}
                            onCheckedChange={(checked) =>
                              handleTrilhaSelection(trilha.id, checked as boolean)
                            }
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{trilha.nomeTrilha}</p>
                            <p className="text-xs text-gray-600">
                              {trilha.nomePrograma} - {formatDate(trilha.dataVeiculacao)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="emailAssociacao2">E-mail do Destinatário *</Label>
                  <Input
                    id="emailAssociacao2"
                    type="email"
                    value={formData.emailAssociacao}
                    onChange={(e) => setFormData({ ...formData, emailAssociacao: e.target.value })}
                    placeholder="destinatario@exemplo.com"
                  />
                </div>

                <div>
                  <Label htmlFor="emailCopia2">Com Cópia Para (opcional)</Label>
                  <Input
                    id="emailCopia2"
                    type="email"
                    value={formData.emailCopia}
                    onChange={(e) => setFormData({ ...formData, emailCopia: e.target.value })}
                    placeholder="copia@exemplo.com"
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">Termo de Responsabilidade</h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    "Declaro que sou o único responsável pelas informações fornecidas. O app Faz o B.O.M. e seus gestores não se responsabilizam por erros, omissões ou inverdades nos relatórios enviados."
                  </p>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="termo2"
                      checked={formData.termoAceito}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, termoAceito: checked as boolean })
                      }
                    />
                    <Label htmlFor="termo2" className="text-sm">
                      Li e aceito o termo de responsabilidade
                    </Label>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleGenerateReport}
                    disabled={!formData.termoAceito || sendEmailMutation.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {sendEmailMutation.isPending ? "Enviando..." : "Enviar por E-mail"}
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    disabled={!formData.termoAceito}
                    variant="outline"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
