# Guia de Deploy — Faz o B.O.M.

## 📱 Opção 1: Publicar como PWA (Recomendado para começar)

### Passo 1: Deploy na Vercel (Grátis)

A forma mais rápida de colocar seu app online é usar a Vercel:

1. Acesse [vercel.com](https://vercel.com) e crie uma conta
2. Clique em "New Project" e conecte seu repositório GitHub
3. Selecione o projeto `faz-o-bom`
4. Vercel detectará automaticamente que é um Vite + Node.js
5. Clique em "Deploy"

**Resultado:** Seu app estará disponível em `https://faz-o-bom.vercel.app`

### Passo 2: Instalar como App no Mobile

**iOS (iPhone/iPad):**
- Abra o app em Safari
- Clique no botão "Compartilhar" (ícone de seta para cima)
- Selecione "Adicionar à Tela Inicial"
- O app aparecerá como um ícone nativo

**Android:**
- Abra o app no Chrome
- Clique no menu (⋮) no canto superior direito
- Selecione "Instalar app"
- O app será instalado como um aplicativo nativo

---

## 🍎 Opção 2: Publicar na Apple App Store

### Requisitos:
- Conta de desenvolvedor Apple ($99/ano)
- Mac com Xcode instalado
- Certificado de assinatura Apple

### Passo 1: Criar Conta de Desenvolvedor

1. Acesse [developer.apple.com](https://developer.apple.com)
2. Clique em "Account"
3. Faça login com sua Apple ID
4. Vá para "Membership" e compre a conta de desenvolvedor ($99/ano)

### Passo 2: Gerar Certificados

1. No Xcode, vá para **Preferences > Accounts**
2. Selecione sua conta Apple
3. Clique em "Manage Certificates"
4. Clique em "+" para criar um novo certificado
5. Selecione "iOS App Development"

### Passo 3: Preparar o App

Para converter o PWA em um app nativo iOS, você pode usar:

**Opção A: Capacitor (Recomendado)**

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap open ios
```

Isso abrirá o Xcode onde você pode fazer o build final.

**Opção B: Usar um serviço como Convertkit ou PWABuilder**

- Acesse [pwabuilder.com](https://pwabuilder.com)
- Cole a URL do seu app
- Clique em "Build My PWA"
- Selecione "App Stores"
- Siga as instruções para gerar o arquivo `.ipa`

### Passo 4: Submeter para a App Store

1. Abra o **App Store Connect** ([appstoreconnect.apple.com](https://appstoreconnect.apple.com))
2. Clique em "My Apps"
3. Clique em "+" para criar um novo app
4. Preencha os detalhes:
   - **Nome do App:** Faz o B.O.M.
   - **ID do Bundle:** com.mozesgomes.fazoobom
   - **SKU:** FAZOOBOM2026
   - **Plataforma:** iOS
5. Vá para **Versão** e preencha:
   - **Descrição:** Proteja seus direitos autorais registrando seus shows e trilhas sonoras para o ECAD.
   - **Palavras-chave:** música, ECAD, direitos autorais, shows, trilhas
   - **Categoria:** Música
   - **Classificação:** 4+
6. Faça upload das screenshots (5 obrigatórias)
7. Faça upload do ícone do app (1024x1024)
8. Clique em "Enviar para análise"

**Tempo de análise:** 1-3 dias

---

## 🤖 Opção 3: Publicar no Google Play Store

### Requisitos:
- Conta Google Play Developer ($25, uma vez)
- Arquivo `.aab` (Android App Bundle)

### Passo 1: Criar Conta de Desenvolvedor

1. Acesse [play.google.com/console](https://play.google.com/console)
2. Clique em "Create account"
3. Pague a taxa de $25
4. Preencha suas informações

### Passo 2: Gerar Certificado de Assinatura

```bash
keytool -genkey -v -keystore faz-o-bom.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias faz-o-bom
```

Guarde este arquivo em local seguro!

### Passo 3: Preparar o App com Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap open android
```

No Android Studio:
1. Vá para **Build > Generate Signed Bundle / APK**
2. Selecione "Android App Bundle"
3. Selecione o keystore que você criou
4. Clique em "Next" e "Finish"

### Passo 4: Submeter para o Google Play

1. Acesse [play.google.com/console](https://play.google.com/console)
2. Clique em "Create app"
3. Preencha os detalhes:
   - **Nome:** Faz o B.O.M.
   - **Categoria:** Música
   - **Tipo:** App
4. Vá para **Versão de produção > Criar versão**
5. Faça upload do arquivo `.aab`
6. Preencha:
   - **Descrição:** Proteja seus direitos autorais registrando seus shows e trilhas sonoras para o ECAD.
   - **Notas da versão:** Versão 1.0 - Lançamento inicial
7. Faça upload das screenshots (2-8 obrigatórias)
8. Faça upload do ícone (512x512)
9. Clique em "Enviar para análise"

**Tempo de análise:** 1-3 horas

---

## 📊 Checklist Pré-Deploy

Antes de publicar, verifique:

- [ ] Logo e ícones do app estão corretos
- [ ] Descrição do app está clara e atrativa
- [ ] Screenshots mostram as principais funcionalidades
- [ ] Política de privacidade está disponível
- [ ] Termos de serviço estão disponíveis
- [ ] App funciona offline (PWA)
- [ ] App funciona em iOS e Android
- [ ] Câmera e upload de arquivos funcionam
- [ ] E-mails são enviados corretamente
- [ ] Banco de dados está sincronizado

---

## 🔐 Segurança e Privacidade

### Política de Privacidade

Crie um arquivo `PRIVACY_POLICY.md`:

```markdown
# Política de Privacidade — Faz o B.O.M.

## Dados Coletados

- Email do usuário (para autenticação)
- Fotos de shows (armazenadas no Supabase)
- Dados de trilhas sonoras (armazenados no banco de dados)
- Arquivos de cue-sheets e contratos

## Como Usamos os Dados

- Para permitir que você registre e gerencie seus shows e trilhas
- Para enviar relatórios por e-mail
- Para melhorar o app

## Compartilhamento de Dados

Seus dados NÃO são compartilhados com terceiros, exceto quando você escolhe enviar um relatório por e-mail.

## Retenção de Dados

Seus dados são mantidos enquanto sua conta estiver ativa. Você pode solicitar a exclusão a qualquer momento.

## Contato

Para dúvidas sobre privacidade, entre em contato: [seu-email@exemplo.com]
```

### Termos de Serviço

Crie um arquivo `TERMS_OF_SERVICE.md` com os termos legais do seu app.

---

## 💰 Monetização (Opcional)

### Opção 1: Versão Gratuita + Premium

Adicione um paywall no app:

```typescript
// Exemplo com Stripe
const premium = await stripe.subscriptions.create({
  customer: userId,
  items: [{ price: 'price_xxxxx' }],
});
```

### Opção 2: Anúncios

Integre Google AdMob:

```typescript
import { AdMob } from '@capacitor-community/admob';

await AdMob.initialize({
  requestIdForAndroid: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
});
```

### Opção 3: Compra Única

Venda o app por um preço fixo ($0.99, $2.99, etc.)

---

## 📞 Suporte

Se tiver dúvidas sobre o deploy, consulte:

- [Vercel Docs](https://vercel.com/docs)
- [Apple Developer Docs](https://developer.apple.com/documentation/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Capacitor Docs](https://capacitorjs.com/docs)

---

**Boa sorte com o lançamento! 🚀**
