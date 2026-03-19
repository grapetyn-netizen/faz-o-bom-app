import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, X, Upload, FileText } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface NovaTrilhaPageProps {
  onBack: () => void;
}

export default function NovaTrilhaPage({ onBack }: NovaTrilhaPageProps) {
  const createTrilhaMutation = trpc.trilhas.create.useMutation();
  const uploadFileMutation = trpc.upload.uploadFile.useMutation();
  
  const [formData, setFormData] = useState({
    nomeTrilha: "",
    nomeCompositor: "",
    coautores: [""],
    dataVeiculacao: "",
    tipoObra: "",
    categoriaExecucao: "",
    categoriaOutros: "",
    nomePrograma: "",
    veiculo: "",
    video: "",
    cueSheetUrl: "",
    contratoUrl: "",
  });

  const [cueSheetFile, setCueSheetFile] = useState<File | null>(null);
  const [contratoFile, setContratoFile] = useState<File | null>(null);
  const [uploadingCueSheet, setUploadingCueSheet] = useState(false);
  const [uploadingContrato, setUploadingContrato] = useState(false);

  const addCoautor = () => {
    if (formData.coautores.length < 8) {
      setFormData({
        ...formData,
        coautores: [...formData.coautores, ""],
      });
    }
  };

  const removeCoautor = (index: number) => {
    setFormData({
      ...formData,
      coautores: formData.coautores.filter((_, i) => i !== index),
    });
  };

  const updateCoautor = (index: number, value: string) => {
    setFormData({
      ...formData,
      coautores: formData.coautores.map((c, i) => (i === index ? value : c)),
    });
  };

  const handleCueSheetUpload = async (file: File) => {
    setCueSheetFile(file);
    setUploadingCueSheet(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        const result = await uploadFileMutation.mutateAsync({
          fileName: file.name,
          fileData: base64,
          fileType: file.type.includes("pdf") ? "pdf" : file.type.includes("image") ? "image" : "doc",
          relatedId: "temp-trilha",
          relatedType: "trilha",
        });
        setFormData({ ...formData, cueSheetUrl: result.url });
        toast.success("Cue-sheet enviado com sucesso!");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Falha ao enviar cue-sheet.");
    } finally {
      setUploadingCueSheet(false);
    }
  };

  const handleContratoUpload = async (file: File) => {
    setContratoFile(file);
    setUploadingContrato(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        const result = await uploadFileMutation.mutateAsync({
          fileName: file.name,
          fileData: base64,
          fileType: file.type.includes("pdf") ? "pdf" : file.type.includes("image") ? "image" : "doc",
          relatedId: "temp-trilha",
          relatedType: "trilha",
        });
        setFormData({ ...formData, contratoUrl: result.url });
        toast.success("Contrato enviado com sucesso!");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Falha ao enviar contrato.");
    } finally {
      setUploadingContrato(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTrilhaMutation.mutateAsync({
        ...formData,
        dataVeiculacao: new Date(formData.dataVeiculacao),
        coautores: formData.coautores.filter((c) => c.trim()),
      });

      toast.success("Trilha registrada com sucesso!");
      onBack();
    } catch (error) {
      toast.error("Falha ao registrar trilha.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button onClick={onBack} variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-900">Nova Trilha Sonora</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">Informe sua trilha sonora utilizada em Áudio Visual</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <Label htmlFor="nomeTrilha">Nome da Trilha / Obra *</Label>
                <Input
                  id="nomeTrilha"
                  value={formData.nomeTrilha}
                  onChange={(e) => setFormData({ ...formData, nomeTrilha: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="nomeCompositor">Nome do Compositor *</Label>
                <Input
                  id="nomeCompositor"
                  value={formData.nomeCompositor}
                  onChange={(e) => setFormData({ ...formData, nomeCompositor: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Coautores (até 8)</Label>
                {formData.coautores.map((coautor, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={coautor}
                      onChange={(e) => updateCoautor(index, e.target.value)}
                      placeholder={`Coautor ${index + 1}`}
                    />
                    {formData.coautores.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeCoautor(index)}
                        variant="outline"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {formData.coautores.length < 8 && (
                  <Button
                    type="button"
                    onClick={addCoautor}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Adicionar Coautor
                  </Button>
                )}
              </div>

              <div>
                <Label htmlFor="dataVeiculacao">Data/Período da Veiculação *</Label>
                <Input
                  id="dataVeiculacao"
                  type="date"
                  value={formData.dataVeiculacao}
                  onChange={(e) => setFormData({ ...formData, dataVeiculacao: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Tipo da Obra *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, tipoObra: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trilha-original">Trilha Original</SelectItem>
                    <SelectItem value="trilha-adaptada">Trilha Adaptada</SelectItem>
                    <SelectItem value="jingle">Jingle</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Categoria de Execução *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, categoriaExecucao: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TA">TA – Tema de Abertura</SelectItem>
                    <SelectItem value="TE">TE – Tema de Encerramento</SelectItem>
                    <SelectItem value="BK">BK – Back Ground</SelectItem>
                    <SelectItem value="TB">TB – Tema de Bloco</SelectItem>
                    <SelectItem value="TP">TP – Tema de Personagem</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.categoriaExecucao === "outros" && (
                <div>
                  <Label htmlFor="categoriaOutros">Especifique a categoria</Label>
                  <Input
                    id="categoriaOutros"
                    value={formData.categoriaOutros}
                    onChange={(e) => setFormData({ ...formData, categoriaOutros: e.target.value })}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="nomePrograma">Nome do Programa / Obra Audiovisual *</Label>
                <Input
                  id="nomePrograma"
                  value={formData.nomePrograma}
                  onChange={(e) => setFormData({ ...formData, nomePrograma: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Veículo onde foi exibida *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, veiculo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o veículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tv">TV</SelectItem>
                    <SelectItem value="cinema">Cinema</SelectItem>
                    <SelectItem value="radio">Rádio</SelectItem>
                    <SelectItem value="streaming">Streaming</SelectItem>
                    <SelectItem value="estabelecimento">Estabelecimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="video">Vídeo com trecho no ar (link)</Label>
                <Input
                  id="video"
                  value={formData.video}
                  onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-blue-900 mb-3">Documentos (Opcional)</h3>

                <div>
                  <Label>Cue-Sheet (PDF, DOC ou Imagem)</Label>
                  <div className="flex gap-2 mt-2">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0];
                          if (file) handleCueSheetUpload(file);
                        }}
                        className="hidden"
                        disabled={uploadingCueSheet}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full cursor-pointer"
                        disabled={uploadingCueSheet}
                        onClick={() => (document.querySelector('input[accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"]') as HTMLInputElement)?.click()}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        {uploadingCueSheet ? "Enviando..." : "Selecionar Cue-Sheet"}
                      </Button>
                    </label>
                  </div>
                  {formData.cueSheetUrl && (
                    <div className="mt-2 flex items-center gap-2 text-green-600">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Cue-sheet enviado ✓</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Label>Contrato (PDF, DOC ou Imagem)</Label>
                  <div className="flex gap-2 mt-2">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0];
                          if (file) handleContratoUpload(file);
                        }}
                        className="hidden"
                        disabled={uploadingContrato}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full cursor-pointer"
                        disabled={uploadingContrato}
                        onClick={() => (document.querySelector('input[accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"]:last-of-type') as HTMLInputElement)?.click()}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        {uploadingContrato ? "Enviando..." : "Selecionar Contrato"}
                      </Button>
                    </label>
                  </div>
                  {formData.contratoUrl && (
                    <div className="mt-2 flex items-center gap-2 text-green-600">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Contrato enviado ✓</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" onClick={onBack} variant="outline" className="flex-1">
                  Voltar à Home
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={createTrilhaMutation.isPending}
                >
                  {createTrilhaMutation.isPending ? "Salvando..." : "Salvar Trilha"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
