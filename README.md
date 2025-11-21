# **Sniply — Modern URL Shortener**

A fast, modern URL shortener built with **React (Vite)** + **Tailwind** + **ShadCN UI** + **Supabase**.
Create clean short links, track analytics, and manage everything from a beautiful dashboard.

---

## 🚀 Features

- 🔗 Create short URLs & custom aliases
- 🧑‍💼 Auth (login/signup with profile picture)
- 📊 Analytics: clicks, device, location
- 🎨 Modern UI using Tailwind + ShadCN
- 📱 Responsive dashboard
- 🧾 QR code generation
- 🗑 URL management (copy, delete, filter)

---

## 🛠 Tech Stack

- React (Vite)
- TailwindCSS + ShadCN UI
- Supabase (Auth, Database, Storage)
- React Router
- Lucide Icons

---

## 📦 Installation

```bash
git clone <repo-url>
cd sniply
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_KEY=your_anon_key
VITE_APP_BASE_URL=http://localhost:5173
```

---

## ▶️ Scripts

```bash
npm run dev        # start project
npm run build      # production build
npm run preview    # preview production build
```

---

## 📁 Folder Structure

```
src/
  components/
  pages/
  db/
  hooks/
  Context.jsx
  main.jsx
```

---

## 🌐 Deployment (Vercel)

1. Push repo to GitHub
2. Import into Vercel
3. Add environment variables
4. Deploy

## 📄 License

MIT © Aniket
