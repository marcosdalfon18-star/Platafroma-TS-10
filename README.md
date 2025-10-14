# TS Plataforma Digital

Plataforma integral de gestión de recursos humanos con IA integrada.

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Copia el archivo `.env.example` a `.env.local` y configura las variables:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Firebase y Google AI:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id

# Google AI (Genkit)
GOOGLE_GENAI_API_KEY=tu-google-ai-api-key
```

### 2. Instalación

```bash
npm install
```

### 3. Desarrollo

```bash
npm run dev
```

### 4. Genkit (IA)

Para desarrollo con IA:

```bash
npm run genkit:dev
```

## 🔐 Autenticación

La aplicación usa Firebase Auth con los siguientes roles:
- **Consultor:** Acceso completo a todas las funcionalidades
- **Empresario:** Gestión de empresa y empleados  
- **Empleado:** Acceso a funcionalidades básicas
- **Gestor:** Gestión de nóminas y reportes

## 🏗️ Arquitectura

- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **Backend:** Firebase (Auth + Firestore)
- **IA:** Google Genkit con Gemini 2.5 Flash
- **UI:** Radix UI + Shadcn/ui

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas de la aplicación
├── components/            # Componentes reutilizables
├── contexts/             # Contextos de React
├── lib/                  # Utilidades y configuraciones
├── hooks/               # Custom hooks
└── ai/                  # Flujos de IA con Genkit
```
