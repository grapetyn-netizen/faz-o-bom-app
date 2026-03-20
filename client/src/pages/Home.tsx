import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle } from "lucide-react";
import NovoShowPage from "./NovoShowPage";
import NovaTrilhaPage from "./NovaTrilhaPage";
import HistoricoPage from "./HistoricoPage";
import RelatorioPage from "./RelatorioPage";

type Page = "home" | "novo-show" | "nova-trilha" | "historico" | "relatorio";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [showGuide, setShowGuide] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663453570729/PvRpa5WcFSM99z8A5gG6sx/bom-logo-AUrCmJFuutvoYBNEmAgcFv.webp"
            alt="Faz o B.O.M."
            className="w-32 h-32 mx-auto"
          />
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Faz o B.O.M.</h1>
            <p className="text-xl font-semibold text-blue-700 mb-4">Boletim de Ocorrência Musical</p>
            <p className="text-sm text-blue-600 leading-relaxed">
              Proteja seus direitos autorais registrando seus shows e trilhas sonoras.
            </p>
          </div>
          <Button
            onClick={() => {
              try {
                window.location.href = getLoginUrl();
              } catch (error) {
                console.error("Erro ao gerar URL de login:", error);
                window.location.href = "https://oauth.manus.im/app-auth?type=signIn";
              }
            }}
            className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            Entrar ou Cadastrar
          </Button>
          <p className="text-xs text-blue-500 italic">by Moses Gomes</p>
        </div>
      </div>
    );
  }

  // Render current page
  switch (currentPage) {
    case "novo-show":
      return <NovoShowPage onBack={() => setCurrentPage("home")} />;
    case "nova-trilha":
      return <NovaTrilhaPage onBack={() => setCurrentPage("home")} />;
    case "historico":
      return <HistoricoPage onBack={() => setCurrentPage("home")} />;
    case "relatorio":
      return <RelatorioPage onBack={() => setCurrentPage("home")} />;
    default:
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pt-4">
              <div>
                <h1 className="text-2xl font-bold text-blue-900">Faz o B.O.M.</h1>
                <p className="text-sm text-blue-600">{user?.email}</p>
              </div>
              <Button
                onClick={() => logout()}
                variant="outline"
                size="sm"
                className="text-red-600"
              >
                Sair
              </Button>
            </div>

            {/* Logo */}
            <div className="text-center mb-8">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663453570729/PvRpa5WcFSM99z8A5gG6sx/bom-logo-AUrCmJFuutvoYBNEmAgcFv.webp"
                alt="Faz o B.O.M. Logo"
                className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg"
              />
              <h2 className="text-lg font-semibold text-blue-700">Bem-vindo!</h2>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setCurrentPage("novo-show")}
                className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
              >
                📍 Novo Show
              </Button>

              <Button
                onClick={() => setCurrentPage("nova-trilha")}
                className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
              >
                🎬 Sou Compositor de Trilhas
              </Button>

              <Button
                onClick={() => setCurrentPage("historico")}
                className="w-full h-14 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md"
              >
                📅 Histórico de Registros
              </Button>

              <Button
                onClick={() => setCurrentPage("relatorio")}
                className="w-full h-14 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md"
              >
                📈 Gerar Relatório
              </Button>
            </div>

            {/* Guide Button - Fixed encoding UTF-8 */}
            <div className="mt-6">
              <Dialog open={showGuide} onOpenChange={setShowGuide}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full bg-yellow-50 hover:bg-yellow-100 border-yellow-300 text-yellow-800 font-semibold"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    ❓ Guia Prático de Uso
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-900">Guia Prático de Uso - Faz o B.O.M.</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-6 text-sm text-gray-700 pr-4">
                      <section>
                        <h3 className="font-bold text-lg text-blue-800 mb-2">O que é Faz o B.O.M.?</h3>
                        <p>Faz o B.O.M. (Boletim de Ocorrência Musical) é um aplicativo que ajuda músicos e compositores a registrar seus shows e trilhas sonoras de forma fácil e organizada, protegendo seus direitos autorais junto ao ECAD.</p>
                      </section>

                      <section>
                        <h3 className="font-bold text-lg text-blue-800 mb-2">1. Autenticação</h3>
                        <p><strong>Como entrar:</strong> Clique em "Entrar ou Cadastrar" na tela inicial. Você será redirecionado para o login. Se não tiver conta, crie uma nova.</p>
                        <p className="mt-2"><strong>Segurança:</strong> Seus dados são protegidos e armazenados de forma segura.</p>
                      </section>

                      <section>
                        <h3 className="font-bold text-lg text-blue-800 mb-2">2. Registrar um Novo Show</h3>
                        <p><strong>Passo 1:</strong> Na tela inicial, clique em "📍 Novo Show".</p>
                        <p className="mt-2"><strong>Passo 2:</strong> Preencha os dados do show:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                          <li><strong>Nome do Show:</strong> Nome do evento ou apresentação</li>
                          <li><strong>Data do Show:</strong> Data em que ocorreu</li>
                          <li><strong>Local do Show:</strong> Endereço ou nome do local</li>
                          <li><strong>Responsável pelo Show:</strong> Produtor ou organizador</li>
                          <li><strong>Categoria de Execução:</strong> Escolha entre Músico Executante, DJ, Cantor ou Cantora</li>
                          <li><strong>Instrumento:</strong> Selecione o instrumento que tocou</li>
                        </ul>
                        <p className="mt-3"><strong>Passo 3:</strong> Adicione fotos do show:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                          <li>Clique em "Câmera" para tirar fotos no momento</li>
                          <li>Ou clique em "Galeria" para selecionar fotos já existentes</li>
                          <li>Recomendamos no mínimo 4 fotos para melhor documentação</li>
                          <li>Você pode adicionar quantas fotos quiser</li>
                        </ul>
                        <p className="mt-3"><strong>Passo 4:</strong> (Opcional) Adicione o repertório:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                          <li>Cole um link do repertório (ex: Spotify, YouTube)</li>
                          <li>Ou liste as músicas tocadas no campo de texto</li>
                        </ul>
                        <p className="mt-3"><strong>Passo 5:</strong> Clique em "Salvar Show" para registrar.</p>
                      </section>

                      <section>
                        <h3 className="font-bold text-lg text-blue-800 mb-2">3. Registrar uma Trilha Sonora</h3>
                        <p><strong>Passo 1:</strong> Na tela inicial, clique em "🎬 Sou Compositor de Trilhas".</p>
                        <p className="mt-2"><strong>Passo 2:</strong> Preencha os dados da trilha:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                          <li><strong>Nome da Trilha:</strong> Título da obra</li>
                          <li><strong>Nome do Compositor:</strong> Seu nome completo</li>
                          <li><strong>Coautores:</strong> Nomes de outros compositores (se houver)</li>
                          <li><strong>Data de Veiculação:</strong> Quando foi exibida/transmitida</li>
                          <li><strong>Tipo de Obra:</strong> Filme, série, documentário, etc.</li>
                          <li><strong>Categoria de Execução:</strong> Tipo de composição</li>
                          <li><strong>Nome do Programa:</strong> Nome da produção</li>
                          <li><strong>Veículo:</strong> TV, cinema, streaming, etc.</li>
                        </ul>
                        <p className="mt-3"><strong>Passo 3:</strong> Adicione documentos (opcional):</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                          <li>Cue-sheet (documento técnico da trilha)</li>
                          <li>Contrato com a produtora</li>
                        </ul>
                        <p className="mt-3"><strong>Passo 4:</strong> Clique em "Salvar Trilha" para registrar.</p>
                      </section>

                      <section>
                        <h3 className="font-bold text-lg text-blue-800 mb-2">4. Visualizar Histórico</h3>
                        <p><strong>Função:</strong> Veja todos os shows e trilhas que você já registrou.</p>
                        <p className="mt-2"><strong>Ações disponíveis:</strong></p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                          <li>Visualizar detalhes completos</li>
                          <li>Editar informações</li>
                          <li>Duplicar um registro para criar um similar</li>
                          <li>Excluir um registro</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="font-bold text-lg text-blue-800 mb-2">5. Gerar Relatório</h3>
                        <p><strong>Função:</strong> Crie relatórios consolidados por período para enviar ao ECAD ou associações.</p>
                        <p className="mt-2"><strong>Passo 1:</strong> Clique em "📈 Gerar Relatório".</p>
                        <p className="mt-2"><strong>Passo 2:</strong> Escolha o tipo:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                          <li><strong>Relatório de Shows:</strong> Consolidação de todos os shows</li>
                          <li><strong>Relatório de Trilhas:</strong> Consolidação de todas as trilhas</li>
                        </ul>
                        <p className="mt-3"><strong>Passo 3:</strong> Selecione o período (data início e fim).</p>
                        <p className="mt-2"><strong>Passo 4:</strong> Escolha os shows ou trilhas a incluir.</p>
                        <p className="mt-2"><strong>Passo 5:</strong> Informe o e-mail da associação.</p>
                        <p className="mt-2"><strong>Passo 6:</strong> Aceite o termo de responsabilidade.</p>
                        <p className="mt-2"><strong>Passo 7:</strong> Envie por e-mail ou WhatsApp.</p>
                      </section>

                      <section>
                        <h3 className="font-bold text-lg text-blue-800 mb-2">6. Dicas Importantes</h3>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                          <li>Sempre preencha todos os campos obrigatórios (marcados com *)</li>
                          <li>Adicione fotos de qualidade para melhor documentação</li>
                          <li>Mantenha seus dados atualizados</li>
                          <li>Faça backup regular dos seus registros</li>
                          <li>Use o app regularmente para não perder informações</li>
                          <li>Leia o termo de responsabilidade antes de enviar relatórios</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="font-bold text-lg text-blue-800 mb-2">7. Suporte</h3>
                        <p>Se tiver dúvidas ou problemas, entre em contato através do e-mail de suporte ou verifique a documentação completa.</p>
                      </section>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-xs text-blue-500 italic">by Moses Gomes</p>
            </div>
          </div>
        </div>
      );
  }
}
