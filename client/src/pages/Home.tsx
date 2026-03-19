import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import NovoShowPage from "./NovoShowPage";
import NovaTrilhaPage from "./NovaTrilhaPage";
import HistoricoPage from "./HistoricoPage";
import RelatorioPage from "./RelatorioPage";

type Page = "home" | "novo-show" | "nova-trilha" | "historico" | "relatorio";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>("home");

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
            onClick={() => window.location.href = getLoginUrl()}
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

            {/* Footer */}
            <div className="text-center pt-8">
              <p className="text-xs text-blue-500 italic">by Moses Gomes</p>
            </div>
          </div>
        </div>
      );
  }
}
