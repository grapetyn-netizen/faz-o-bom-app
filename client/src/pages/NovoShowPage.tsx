import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, X, Camera, Image as ImageIcon } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface NovoShowPageProps {
  onBack: () => void;
}

export default function NovoShowPage({ onBack }: NovoShowPageProps) {
  const createShowMutation = trpc.shows.create.useMutation();
  const uploadPhotoMutation = trpc.upload.uploadPhoto.useMutation();
  
  const [formData, setFormData] = useState({
    nomeShow: "",
    dataShow: "",
    localShow: "",
    responsavelShow: "",
    categoria: "",
    instrumento: "",
    linkRepertorio: "",
    textoRepertorio: "",
    fotoUrls: [] as string[],
  });
  
  const [fotos, setFotos] = useState<File[]>([]);
  const [fotoPreviews, setFotoPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Fixed: Accumulate files instead of replacing them
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Accumulate files instead of replacing
      setFotos((prevFotos) => [...prevFotos, ...newFiles]);

      // Generate previews for new files
      const newPreviews: string[] = [];
      let loadedCount = 0;
      
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          loadedCount++;
          if (loadedCount === newFiles.length) {
            setFotoPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeFoto = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
    setFotoPreviews(fotoPreviews.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const foto of fotos) {
      try {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(foto);
        });

        const base64Data = base64.split(",")[1];

        const result = await uploadPhotoMutation.mutateAsync({
          fileName: foto.name,
          fileData: base64Data,
        });

        if (result.url) {
          uploadedUrls.push(result.url);
        }
      } catch (error) {
        console.error("Erro ao fazer upload da foto:", error);
        toast.error(`Falha ao enviar foto: ${foto.name}`);
      }
    }

    return uploadedUrls;
  };

  // Fixed: Allow any number of photos (including 1), removed 3 photo minimum requirement
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Allow any number of photos (including 1)
    if (fotos.length === 0) {
      toast.error("Selecione pelo menos 1 foto do show.");
      return;
    }

    setUploading(true);

    try {
      toast.loading("Enviando fotos...");
      const uploadedUrls = await uploadPhotos();

      if (uploadedUrls.length === 0) {
        toast.error("Falha ao enviar fotos. Tente novamente.");
        setUploading(false);
        return;
      }

      await createShowMutation.mutateAsync({
        ...formData,
        dataShow: new Date(formData.dataShow),
        fotoUrls: uploadedUrls,
      });

      toast.success("Show registrado com sucesso!");
      onBack();
    } catch (error) {
      toast.error("Falha ao registrar show.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button onClick={onBack} variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-900">Novo Show</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">Registre seu novo show</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nomeShow">Nome do Show *</Label>
                <Input
                  id="nomeShow"
                  value={formData.nomeShow}
                  onChange={(e) => setFormData({ ...formData, nomeShow: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="dataShow">Data do Show *</Label>
                <Input
                  id="dataShow"
                  type="date"
                  value={formData.dataShow}
                  onChange={(e) => setFormData({ ...formData, dataShow: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="localShow">Local do Show *</Label>
                <Input
                  id="localShow"
                  value={formData.localShow}
                  onChange={(e) => setFormData({ ...formData, localShow: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="responsavelShow">Responsável pelo Show *</Label>
                <Input
                  id="responsavelShow"
                  value={formData.responsavelShow}
                  onChange={(e) => setFormData({ ...formData, responsavelShow: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Categoria de Execução *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
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
                <Label>Instrumento *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, instrumento: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o instrumento" />
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
                <Label htmlFor="textoRepertorio">Ou cole o texto do repertório</Label>
                <Textarea
                  id="textoRepertorio"
                  value={formData.textoRepertorio}
                  onChange={(e) => setFormData({ ...formData, textoRepertorio: e.target.value })}
                  placeholder="Liste as músicas tocadas..."
                  rows={4}
                />
              </div>

              {/* Fixed: Removed 3 photo minimum, added camera/gallery choice, fixed accumulation bug */}
              <div>
                <Label>Fotos no Show * (recomendado mínimo 4)</Label>
                <p className="text-xs text-blue-500 mb-2">Escolha entre câmera ou galeria para adicionar fotos</p>
                
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label htmlFor="fotos-camera" className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                        <Camera className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">Câmera</span>
                        <Input
                          id="fotos-camera"
                          type="file"
                          multiple
                          accept="image/*"
                          capture="environment"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    <div className="flex-1">
                      <label htmlFor="fotos-galeria" className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                        <ImageIcon className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">Galeria</span>
                        <Input
                          id="fotos-galeria"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {fotos.length > 0 && (
                  <>
                    <p className="text-sm text-blue-600 mt-3 font-medium">
                      {fotos.length} foto(s) selecionada(s) {fotos.length < 4 && "(recomendado mínimo 4)"}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {fotoPreviews.map((preview, i) => (
                        <div key={i} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${i + 1}`}
                            className="w-full h-20 object-cover rounded border border-blue-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeFoto(i)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" onClick={onBack} variant="outline" className="flex-1">
                  Voltar à Home
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={uploading || createShowMutation.isPending || fotos.length === 0}
                >
                  {uploading ? "Enviando fotos..." : "Salvar Show"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
