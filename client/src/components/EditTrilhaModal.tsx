import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Trilha {
  id: string;
  nomeTrilha: string;
  nomeCompositor: string;
  coautores: string[] | null;
  dataVeiculacao: Date | string;
  tipoObra: string;
  categoriaExecucao: string;
  categoriaOutros?: string | null;
  nomePrograma: string;
  veiculo: string;
}

interface EditTrilhaModalProps {
  trilha: Trilha;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditTrilhaModal({ trilha, isOpen, onClose, onSuccess }: EditTrilhaModalProps) {
  const [formData, setFormData] = useState({
    nomeTrilha: trilha.nomeTrilha,
    nomeCompositor: trilha.nomeCompositor,
    coautores: trilha.coautores ? trilha.coautores.join(", ") : "",
    dataVeiculacao: typeof trilha.dataVeiculacao === "string" ? trilha.dataVeiculacao.split("T")[0] : trilha.dataVeiculacao.toISOString().split("T")[0],
    tipoObra: trilha.tipoObra,
    categoriaExecucao: trilha.categoriaExecucao,
    categoriaOutros: trilha.categoriaOutros || "",
    nomePrograma: trilha.nomePrograma,
    veiculo: trilha.veiculo,
  });

  const updateTrilhaMutation = trpc.trilhas.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateTrilhaMutation.mutateAsync({
        id: trilha.id,
        nomeTrilha: formData.nomeTrilha,
        nomeCompositor: formData.nomeCompositor,
        coautores: formData.coautores ? formData.coautores.split(",").map((a) => a.trim()).filter((a) => a) : [],
        dataVeiculacao: new Date(formData.dataVeiculacao),
        tipoObra: formData.tipoObra,
        categoriaExecucao: formData.categoriaExecucao,
        categoriaOutros: formData.categoriaOutros,
        nomePrograma: formData.nomePrograma,
        veiculo: formData.veiculo,
      });

      toast.success("Trilha atualizada com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Falha ao atualizar trilha.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Trilha Sonora</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nomeTrilha">Nome da Trilha</Label>
            <Input
              id="nomeTrilha"
              value={formData.nomeTrilha}
              onChange={(e) => setFormData({ ...formData, nomeTrilha: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="nomeCompositor">Nome do Compositor</Label>
            <Input
              id="nomeCompositor"
              value={formData.nomeCompositor}
              onChange={(e) => setFormData({ ...formData, nomeCompositor: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="coautores">Coautores (separados por vírgula)</Label>
            <Input
              id="coautores"
              value={formData.coautores}
              onChange={(e) => setFormData({ ...formData, coautores: e.target.value })}
              placeholder="João Silva, Maria Santos"
            />
          </div>

          <div>
            <Label htmlFor="dataVeiculacao">Data de Veiculação</Label>
            <Input
              id="dataVeiculacao"
              type="date"
              value={formData.dataVeiculacao}
              onChange={(e) => setFormData({ ...formData, dataVeiculacao: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Tipo de Obra</Label>
            <Select value={formData.tipoObra} onValueChange={(value) => setFormData({ ...formData, tipoObra: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="musica-original">Música Original</SelectItem>
                <SelectItem value="adaptacao">Adaptação</SelectItem>
                <SelectItem value="arranjo">Arranjo</SelectItem>
                <SelectItem value="trilha-sonora">Trilha Sonora</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Categoria de Execução</Label>
            <Select value={formData.categoriaExecucao} onValueChange={(value) => setFormData({ ...formData, categoriaExecucao: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TA">TA - Televisão Aberta</SelectItem>
                <SelectItem value="TE">TE - Televisão por Assinatura</SelectItem>
                <SelectItem value="BK">BK - Backgrond Music</SelectItem>
                <SelectItem value="TB">TB - Trilha de Fundo</SelectItem>
                <SelectItem value="TP">TP - Trilha de Produção</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="nomePrograma">Nome do Programa/Série</Label>
            <Input
              id="nomePrograma"
              value={formData.nomePrograma}
              onChange={(e) => setFormData({ ...formData, nomePrograma: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Veículo de Exibição</Label>
            <Select value={formData.veiculo} onValueChange={(value) => setFormData({ ...formData, veiculo: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tv">TV</SelectItem>
                <SelectItem value="cinema">Cinema</SelectItem>
                <SelectItem value="streaming">Streaming (Netflix, Prime, etc)</SelectItem>
                <SelectItem value="radio">Rádio</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={updateTrilhaMutation.isPending} className="bg-blue-600 hover:bg-blue-700">
              {updateTrilhaMutation.isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
