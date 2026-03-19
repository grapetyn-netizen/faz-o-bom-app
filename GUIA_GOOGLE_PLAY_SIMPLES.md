# 🤖 Guia Simples: Como Publicar no Google Play Store

## ⚠️ IMPORTANTE: O que você precisa

Antes de começar, você precisa ter:

1. **Conta Google Play Developer** ($25 USD - paga uma única vez)
   - Acesse: https://play.google.com/console
   - Clique em "Create account"
   - Pague a taxa de $25

2. **Seu app pronto** (você já tem!)

3. **Um computador** (Windows, Mac ou Linux)

---

## 📋 PASSO 1: Preparar o App

Seu app já está pronto! Mas precisamos convertê-lo em um formato que o Google aceita.

### Opção A: Usar o PWABuilder (MAIS FÁCIL - Recomendado)

1. Acesse: https://www.pwabuilder.com
2. Cole a URL do seu app: `https://faz-o-bom.vercel.app`
3. Clique em "Build My PWA"
4. Clique em "App Stores"
5. Selecione "Android"
6. Clique em "Generate"
7. Baixe o arquivo `.aab` (Android App Bundle)

**Pronto! Você tem o arquivo do app.**

### Opção B: Usar Capacitor (Mais técnico)

Se você sabe usar terminal, use este método. Caso contrário, use a Opção A.

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap open android
```

Isso abrirá o Android Studio. Clique em "Build" e depois "Build Bundle(s)" para gerar o arquivo `.aab`.

---

## 📱 PASSO 2: Criar o App no Google Play Console

1. Acesse: https://play.google.com/console
2. Clique em "Create app"
3. Preencha assim:

| Campo | O que colocar |
|-------|--------------|
| **App name** | Faz o B.O.M. |
| **Default language** | Portuguese (Brazil) |
| **App or game** | App |
| **Free or paid** | Free (recomendado para começar) |
| **Declarations** | Marque as caixas de acordo com seu app |

4. Clique em "Create app"

---

## 🖼️ PASSO 3: Adicionar Informações do App

### Seção "App Details"

1. **Category:** Music
2. **Content rating:** Preencha o questionário (é rápido)
3. **Target audience:** Everyone
4. **Privacy policy:** https://faz-o-bom.vercel.app/privacy

### Seção "Store listing"

1. **Short description (80 caracteres):**
```
Registre seus shows e trilhas para proteger seus direitos autorais.
```

2. **Full description (4000 caracteres):**
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
- Fotos do evento (mínimo 3)

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

3. **Screenshots (2-8 obrigatórias):**
   - Tamanho: **1080 x 1920 pixels**
   - Mostre as principais telas do app
   - Adicione texto descritivo

4. **Feature graphic (1024 x 500 pixels):**
   - Use a logo do app
   - Adicione o nome "Faz o B.O.M."

5. **Icon (512 x 512 pixels):**
   - Use a logo que foi criada para você

---

## 🔐 PASSO 4: Configurar Segurança

### Content rating questionnaire

1. Clique em "Content rating"
2. Preencha o questionário (leva 5 minutos)
3. Selecione as categorias que se aplicam ao seu app
4. Clique em "Save"

### Privacy policy

1. Clique em "Privacy policy"
2. Cole a URL: `https://faz-o-bom.vercel.app/privacy`
3. Clique em "Save"

---

## 📦 PASSO 5: Enviar o App

### Seção "Releases"

1. Clique em "Create new release"
2. Selecione "Production"
3. Clique em "Browse files"
4. Selecione o arquivo `.aab` que você baixou
5. Preencha "Release notes":

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

6. Clique em "Save"
7. Clique em "Review release"
8. Clique em "Start rollout to Production"
9. Clique em "Confirm rollout"

**Pronto! Seu app foi enviado!**

---

## ⏱️ Quanto tempo leva?

- **Análise:** 1 a 3 horas (geralmente bem rápido)
- **Aprovação:** Se tudo estiver certo, seu app aparece no Google Play
- **Rejeição:** Se houver problemas, o Google avisa o que corrigir

---

## ❌ Motivos comuns de rejeição

1. **Privacidade:** Certifique-se de que tem uma política de privacidade
2. **Funcionamento:** O app precisa funcionar perfeitamente
3. **Conteúdo:** Não pode ter conteúdo adulto ou violento
4. **Permissões:** Não peça permissões desnecessárias

---

## 💡 Dicas Importantes

- ✅ Teste seu app no Android antes de enviar
- ✅ Certifique-se de que o app funciona offline
- ✅ Adicione uma política de privacidade clara
- ✅ Use screenshots profissionais
- ✅ Escreva uma descrição clara e atraente
- ✅ Escolha um ícone memorável
- ✅ Comece com "Free" (grátis) para ganhar usuários

---

## 🎯 Próximos Passos Após Aprovação

1. **Monitorar avaliações:** Leia o feedback dos usuários
2. **Corrigir bugs:** Se encontrar problemas, corrija e atualize
3. **Adicionar recursos:** Com o tempo, adicione novas funcionalidades
4. **Monetizar:** Depois de ganhar usuários, considere adicionar anúncios ou versão paga

---

## 📞 Precisa de ajuda?

Se tiver dúvidas:

1. Acesse: https://support.google.com/googleplay
2. Ou envie um e-mail para: support@google.com

---

**Boa sorte com seu app! 🎵**
