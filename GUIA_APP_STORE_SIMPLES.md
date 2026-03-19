# 🍎 Guia Simples: Como Publicar na Apple App Store

## ⚠️ IMPORTANTE: O que você precisa

Antes de começar, você precisa ter:

1. **Conta de Desenvolvedor Apple** ($99 USD por ano)
   - Acesse: https://developer.apple.com
   - Clique em "Account"
   - Faça login com sua Apple ID
   - Compre a conta de desenvolvedor

2. **Um Mac** (computador Apple)
   - Precisa ter o Xcode instalado (é grátis na App Store)

3. **Seu app pronto** (você já tem!)

---

## 📋 PASSO 1: Preparar o App

Seu app já está pronto! Mas precisamos convertê-lo em um formato que a Apple aceita.

### Opção A: Usar o PWABuilder (MAIS FÁCIL - Recomendado)

1. Acesse: https://www.pwabuilder.com
2. Cole a URL do seu app: `https://faz-o-bom.vercel.app`
3. Clique em "Build My PWA"
4. Clique em "App Stores"
5. Selecione "iOS"
6. Clique em "Generate"
7. Baixe o arquivo `.ipa`

**Pronto! Você tem o arquivo do app.**

### Opção B: Usar Capacitor (Mais técnico)

Se você sabe usar terminal, use este método. Caso contrário, use a Opção A.

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap open ios
```

Isso abrirá o Xcode. Clique em "Build" e depois "Archive" para gerar o arquivo.

---

## 📱 PASSO 2: Criar o App na App Store Connect

1. Acesse: https://appstoreconnect.apple.com
2. Clique em "My Apps"
3. Clique no botão "+" para criar um novo app
4. Selecione "New App"
5. Preencha assim:

| Campo | O que colocar |
|-------|--------------|
| **Platform** | iOS |
| **Name** | Faz o B.O.M. |
| **Primary Language** | Portuguese (Brazil) |
| **Bundle ID** | com.mozesgomes.fazoobom |
| **SKU** | FAZOOBOM2026 |
| **User Access** | Full Access |

6. Clique em "Create"

---

## 🖼️ PASSO 3: Adicionar Informações do App

### Aba "App Information"

1. **Categoria Principal:** Música
2. **Subcategoria:** Outro
3. **Classificação de Conteúdo:** 4+
4. **Copyright:** © 2026 Moses Gomes
5. **Informações de Contato:** Seu e-mail
6. **Website:** (deixe em branco ou coloque seu site)
7. **Privacy Policy URL:** https://faz-o-bom.vercel.app/privacy

### Aba "Pricing and Availability"

1. **Preço:** Escolha um:
   - **Gratuito** (recomendado para começar)
   - **$0.99** (se quiser cobrar)
   - **$2.99** (preço mais comum)

2. **Disponibilidade:** Selecione "Worldwide" (disponível em todo mundo)

---

## 📸 PASSO 4: Adicionar Screenshots e Ícone

### Screenshots (5 obrigatórias)

Você precisa de 5 imagens do seu app funcionando. Tamanho: **1170 x 2532 pixels**

Dicas:
- Tire screenshots do seu app no celular
- Mostre as principais telas (Home, Novo Show, Histórico, etc.)
- Adicione texto descritivo em cada screenshot

### Ícone do App

- Tamanho: **1024 x 1024 pixels**
- Use a logo que foi criada para você
- Formato: PNG ou JPG

---

## 📝 PASSO 5: Preencher Descrição

### "Version Release Notes"

```
Versão 1.0 - Lançamento Inicial

Registre seus shows e trilhas sonoras para proteger seus direitos autorais junto ao ECAD.

Funcionalidades:
- Registre shows com fotos e detalhes
- Registre trilhas sonoras com documentos
- Gere relatórios consolidados
- Envie relatórios por e-mail
- Acesso total ao seu histórico
```

### "Description" (Descrição Longa)

```
Faz o B.O.M. - Boletim de Ocorrência Musical

Proteja seus direitos autorais!

O Faz o B.O.M. é um app para músicos, compositores e produtores que desejam registrar e documentar seus shows e trilhas sonoras para envio ao ECAD e associações de direitos autorais.

FUNCIONALIDADES PRINCIPAIS:

📋 Registro de Shows
- Data, local e responsável
- Categoria de execução
- Instrumento utilizado
- Repertório completo
- Fotos do evento

🎬 Registro de Trilhas Sonoras
- Nome da trilha e compositor
- Coautores
- Tipo de obra
- Categoria de execução
- Veículo de exibição
- Upload de cue-sheets e contratos

📊 Relatórios
- Consolidação por período
- Seleção de registros
- Envio por e-mail
- Termo de responsabilidade

🔐 Segurança
- Autenticação segura
- Seus dados protegidos
- Controle total da sua conta

COMO USAR:

1. Crie sua conta
2. Registre seus shows e trilhas
3. Adicione fotos e documentos
4. Gere relatórios
5. Envie para o ECAD

Desenvolvido por Moses Gomes
```

---

## 🚀 PASSO 6: Enviar para Análise

1. Vá para a aba "Build"
2. Clique no "+" para adicionar o build
3. Selecione o arquivo `.ipa` que você baixou
4. Preencha as informações de teste:
   - Email: seu-email@exemplo.com
   - Senha: uma senha de teste
   - Nome do testador: Seu Nome

5. Clique em "Save"
6. Volte para a aba "Version Release"
7. Clique em "Submit for Review"
8. Responda as perguntas sobre conteúdo
9. Clique em "Submit"

**Pronto! Seu app foi enviado para análise!**

---

## ⏱️ Quanto tempo leva?

- **Análise:** 1 a 3 dias (geralmente 24 horas)
- **Aprovação:** Se tudo estiver certo, seu app aparece na App Store
- **Rejeição:** Se houver problemas, a Apple avisa o que corrigir

---

## ❌ Motivos comuns de rejeição

1. **Privacidade:** Certifique-se de que tem uma política de privacidade
2. **Funcionamento:** O app precisa funcionar perfeitamente
3. **Conteúdo:** Não pode ter conteúdo adulto ou violento
4. **Bugs:** Não pode ter erros ou crashes

---

## 💡 Dicas Importantes

- ✅ Teste seu app no iPhone antes de enviar
- ✅ Certifique-se de que o app funciona offline
- ✅ Adicione uma política de privacidade clara
- ✅ Use screenshots profissionais
- ✅ Escreva uma descrição clara e atraente
- ✅ Escolha um ícone memorável

---

## 📞 Precisa de ajuda?

Se tiver dúvidas:

1. Acesse: https://developer.apple.com/support
2. Ou envie um e-mail para: support@apple.com

---

**Boa sorte com seu app! 🎵**
