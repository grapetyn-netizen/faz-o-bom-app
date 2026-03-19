# Faz o B.O.M. — TODO List

## Fase 1: Backend & Database
- [x] Configurar schema Supabase (Shows, Trilhas, Uploads)
- [x] Implementar autenticação Supabase Auth (cadastro aberto)
- [x] Criar tRPC procedures para CRUD de Shows
- [x] Criar tRPC procedures para CRUD de Trilhas
- [x] Integrar Resend API para envio de e-mails
- [x] Criar tRPC procedure para envio de e-mail
- [ ] Configurar Supabase Storage para fotos e arquivos
- [ ] Criar tRPC procedures para upload de fotos
- [ ] Criar tRPC procedures para upload de arquivos

## Fase 2: Frontend - Autenticação & Layout
- [x] Tela de Login/Cadastro com Supabase Auth
- [x] Dashboard principal com navegação mobile-first
- [x] Logo personalizada na interface
- [x] Tema visual com cores azul + ouro
- [x] Responsividade mobile completa

## Fase 3: Frontend - Funcionalidades Principais
- [x] Tela "Novo Show" com formulário completo
- [x] Tela "Nova Trilha" com formulário completo
- [x] Tela "Histórico" com listagem, exclusão
- [x] Tela "Gerar Relatório" com seleção por período
- [x] Termo de responsabilidade obrigatório
- [x] Upload de fotos do show (corrigido: permite qualquer quantidade, câmera/galeria, sem mínimo obrigatório)
- [x] Botão "❓ Guia Prático de Uso" criado com encoding UTF-8 correto e conteúdo didático completo
- [ ] Upload de cue-sheet e contrato
- [ ] Edição de registros existentes
- [ ] Duplicação de registros
- [ ] Visualização detalhada de registros

## Fase 4: PWA & Deploy
- [x] Configurar manifest.json para PWA
- [x] Adicionar meta tags PWA ao index.html
- [x] Adicionar favicon e apple-touch-icon
- [x] Créditos "by Moses Gomes"
- [ ] Adicionar service worker para offline
- [ ] Testar câmera e upload de arquivos no mobile
- [ ] Deploy na Vercel

## Fase 5: Testes & Refinamento
- [x] Testes de validação de schema (vitest)
- [x] Testes de credenciais Supabase e Resend
- [ ] Testes de fluxo completo
- [ ] Otimização de performance
- [ ] Validação de segurança

---

## Notas Importantes
- Logo: https://d2xsxph8kpxj0f.cloudfront.net/310519663453570729/PvRpa5WcFSM99z8A5gG6sx/bom-logo-AUrCmJFuutvoYBNEmAgcFv.webp
- Supabase URL: dkvehreyohlxauyvrfcp
- Resend API: re_21w5GpoQ_PFNwGJzXEnJrxrXvcadn4xFk
- Cores: Azul (#1e40af, #1e3a8a), Ouro (#f59e0b, #d97706)
- App está rodando em: https://3000-i3cn746m97dn6oow28l9b-ccf265cc.us1.manus.computer


## Fase 6: Upload de Fotos e Arquivos (EM PROGRESSO)
- [ ] Criar tRPC procedure para upload de fotos para Supabase Storage
- [ ] Criar tRPC procedure para upload de arquivos (PDF, DOC, imagens)
- [ ] Integrar upload de fotos no NovoShowPage.tsx
- [ ] Integrar upload de cue-sheet e contrato no NovaTrilhaPage.tsx
- [ ] Validar mínimo 3 fotos por show
- [ ] Exibir preview de fotos antes do envio
- [ ] Exibir lista de arquivos no Histórico

## Fase 7: Edição e Duplicação (PRÓXIMA)
- [ ] Implementar tRPC procedure para editar shows
- [ ] Implementar tRPC procedure para editar trilhas
- [ ] Criar interface de edição para shows
- [ ] Criar interface de edição para trilhas
- [ ] Implementar duplicação de shows
- [ ] Implementar duplicação de trilhas
- [ ] Atualizar HistoricoPage com botões de edição e duplicação

## Fase 8: Deploy & App Store (PRÓXIMA)
- [ ] Configurar build para produção
- [ ] Testar PWA em iOS e Android
- [ ] Preparar screenshots para App Store
- [ ] Criar conta de desenvolvedor Apple (99 USD/ano)
- [ ] Criar conta de desenvolvedor Google (25 USD uma vez)
- [ ] Submeter para Apple App Store
- [ ] Submeter para Google Play Store
- [ ] Configurar domínio customizado (opcional)
