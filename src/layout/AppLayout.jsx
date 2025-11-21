import Header from "@/components/ui/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Top Navigation */}
      <Header />

      {/* Main Body */}
      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-950/80 py-6 text-center text-sm text-slate-400 backdrop-blur">
        <p>
          Made with ❤️ by{" "}
          <span className="font-medium text-cyan-400">Aniket</span>
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
