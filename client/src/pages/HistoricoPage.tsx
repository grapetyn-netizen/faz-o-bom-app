import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Trash2, Copy } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import EditShowModal from "@/components/EditShowModal";
import EditTrilhaModal from "@/components/EditTrilhaModal";

interface HistoricoPageProps {
  onBack: () => void;
}

export default function HistoricoPage({ onBack }: HistoricoPageProps) {
  const [activeTab, setActiveTab] = useState("shows");
  const [editingShowId, setEditingShowId] = useState<string | null>(null);
  const [editingTrilhaId, setEditingTrilhaId] = useState<string | null>(null);

  const { data: shows = [], refetch: refetchShows } = trpc.shows.list.useQuery();
  const { data: trilhas = [], refetch: refetchTrilhas } = trpc.trilhas.list.useQuery();
  const deleteShowMutation = trpc.shows.delete.useMutation();
  const deleteTrilhaMutation = trpc.trilhas.delete.useMutation();
  const duplicateShowMutation = trpc.shows.duplicate.useMutation();
  const duplicateTrilhaMutation = trpc.trilhas.duplicate.useMutation();

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("pt-BR");
  };

  const handleDeleteShow = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este show?")) {
      try {
        await deleteShowMutation.mutateAsync({ id });
        toast.success("Show excluído com sucesso!");
        refetchShows();
      } catch (error) {
        toast.error("Falha ao excluir show.");
      }
    }
  };

  const handleDeleteTrilha = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta trilha?")) {
      try {
        await deleteTrilhaMutation.mutateAsync({ id });
        toast.success("Trilha excluída com sucesso!");
        refetchTrilhas();
      } catch (error) {
        toast.error("Falha ao excluir trilha.");
      }
    }
  };

  const handleDuplicateShow = async (id: string) => {
    try {
      await duplicateShowMutation.mutateAsync({ id });
      toast.success("Show duplicado com sucesso!");
      refetchShows();
    } catch (error) {
      toast.error("Falha ao duplicar show.");
    }
  };

  const handleDuplicateTrilha = async (id: string) => {
    try {
      await duplicateTrilhaMutation.mutateAsync({ id });
      toast.success("Trilha duplicada com sucesso!");
      refetchTrilhas();
    } catch (error) {
      toast.error("Falha ao duplicar trilha.");
    }
  };

  const selectedShow = editingShowId ? shows.find((s) => s.id === editingShowId) : null;
  const selectedTrilha = editingTrilhaId ? trilhas.find((t) => t.id === editingTrilhaId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button onClick={onBack} variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-900">Histórico de Registros</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shows">Shows</TabsTrigger>
            <TabsTrigger value="trilhas">Trilhas</TabsTrigger>
          </TabsList>

          <TabsContent value="shows" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">Visualize seus shows registrados</CardTitle>
              </CardHeader>
              <CardContent>
                {shows.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Nenhum show registrado ainda.</p>
                ) : (
                  <div className="space-y-3">
                    {shows.map((show) => (
                      <div key={show.id} className="border rounded-lg p-3 bg-white">
                        <h3 className="font-semibold text-blue-900">{show.nomeShow}</h3>
                        <p className="text-sm text-gray-600">{formatDate(show.dataShow)}</p>
                        <p className="text-sm text-gray-600">{show.localShow}</p>

                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={() => setEditingShowId(show.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                          <Button
                            onClick={() => handleDuplicateShow(show.id)}
                            variant="outline"
                            size="sm"
                            disabled={duplicateShowMutation.isPending}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteShow(show.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            disabled={deleteShowMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trilhas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">Veja aqui seus registros anteriores</CardTitle>
              </CardHeader>
              <CardContent>
                {trilhas.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Nenhuma trilha registrada ainda.</p>
                ) : (
                  <div className="space-y-3">
                    {trilhas.map((trilha) => (
                      <div key={trilha.id} className="border rounded-lg p-3 bg-white">
                        <h3 className="font-semibold text-blue-900">{trilha.nomeTrilha}</h3>
                        <p className="text-sm text-gray-600">{trilha.nomePrograma}</p>
                        <p className="text-sm text-gray-600">{formatDate(trilha.dataVeiculacao)}</p>
                        <p className="text-sm text-gray-600">{trilha.categoriaExecucao}</p>
                        <p className="text-sm text-gray-600">Compositor: {trilha.nomeCompositor}</p>

                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={() => setEditingTrilhaId(trilha.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                          <Button
                            onClick={() => handleDuplicateTrilha(trilha.id)}
                            variant="outline"
                            size="sm"
                            disabled={duplicateTrilhaMutation.isPending}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteTrilha(trilha.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            disabled={deleteTrilhaMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedShow && (
        <EditShowModal
          show={selectedShow}
          isOpen={editingShowId !== null}
          onClose={() => setEditingShowId(null)}
          onSuccess={() => {
            refetchShows();
            setEditingShowId(null);
          }}
        />
      )}

      {selectedTrilha && (
        <EditTrilhaModal
          trilha={selectedTrilha}
          isOpen={editingTrilhaId !== null}
          onClose={() => setEditingTrilhaId(null)}
          onSuccess={() => {
            refetchTrilhas();
            setEditingTrilhaId(null);
          }}
        />
      )}
    </div>
  );
}
