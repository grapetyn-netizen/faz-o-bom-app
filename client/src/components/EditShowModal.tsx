import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Show {
  id: string;
  nomeShow: string;
  dataShow: Date | string;
  localShow: string;
  responsavelShow: string;
  categoria: string;
  instrumento: string;
  linkRepertorio?: string | null;
  textoRepertorio?: string | null;
}

interface EditShowModalProps {
  show: Show;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditShowModal({ show, isOpen, onClose, onSuccess }: EditShowModalProps) {
  const [formData, setFormData] = useState({
    nomeShow: show.nomeShow,
    dataShow: typeof show.dataShow === "string" ? show.dataShow.split("T")[0] : show.dataShow.toISOString().split("T")[0],
    localShow: show.localShow,
    responsavelShow: show.responsavelShow,
    categoria: show.categoria,
    instrumento: show.instrumento,
    linkRepertorio: show.linkRepertorio || "",
    textoRepertorio: show.textoRepertorio || "",
  });

  const updateShowMutation = trpc.shows.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateShowMutation.mutateAsync({
        id: show.id,
        ...formData,
        dataShow: new Date(formData.dataShow),
      });

      toast.success("Show atualizado com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Falha ao atualizar show.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Show</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nomeShow">Nome do Show</Label>
            <Input
              id="nomeShow"
              value={formData.nomeShow}
              onChange={(e) => setFormData({ ...formData, nomeShow: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="dataShow">Data do Show</Label>
            <Input
              id="dataShow"
              type="date"
              value={formData.dataShow}
              onChange={(e) => setFormData({ ...formData, dataShow: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="localShow">Local do Show</Label>
            <Input
              id="localShow"
              value={formData.localShow}
              onChange={(e) => setFormData({ ...formData, localShow: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="responsavelShow">Responsável pelo Show</Label>
            <Input
              id="responsavelShow"
              value={formData.responsavelShow}
              onChange={(e) => setFormData({ ...formData, responsavelShow: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Categoria de Execução</Label>
            <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="musico-executante">Músico Executante</SelectItem>
                <SelectItem value="dj">DJ</SelectItem>
                <SelectItem value="cantor">Cantor</SelectItem>
                <SelectItem value="cantora">Cantora</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Instrumento</Label>
            <Select value={formData.instrumento} onValueChange={(value) => setFormData({ ...formData, instrumento: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contrabaixo">Contrabaixo</SelectItem>
                <SelectItem value="teclado">Teclado</SelectItem>
                <SelectItem value="bateria">Bateria</SelectItem>
                <SelectItem value="sopro-metais">Sopro/Metais</SelectItem>
                <SelectItem value="percussao">Percussão</SelectItem>
                <SelectItem value="cordas">Cordas (violino/viola/cello)</SelectItem>
                <SelectItem value="guitarra">Guitarra</SelectItem>
                <SelectItem value="voz">Voz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="linkRepertorio">Link do Repertório</Label>
            <Input
              id="linkRepertorio"
              value={formData.linkRepertorio}
              onChange={(e) => setFormData({ ...formData, linkRepertorio: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="textoRepertorio">Ou texto do repertório</Label>
            <Textarea
              id="textoRepertorio"
              value={formData.textoRepertorio}
              onChange={(e) => setFormData({ ...formData, textoRepertorio: e.target.value })}
              placeholder="Liste as músicas tocadas..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={updateShowMutation.isPending} className="bg-blue-600 hover:bg-blue-700">
              {updateShowMutation.isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
