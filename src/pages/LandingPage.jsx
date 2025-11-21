import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) {
      // same behavior as your original code, no extra functionality
      navigate(`/auth?createNew=${longUrl}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 pb-16 pt-10 md:px-6 lg:pt-16">
        {/* Hero Section */}
        <header className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="mb-3 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-300">
            The only URL shortener you&apos;ll ever need
          </span>

          <h1 className="text-balance text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            The only{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              URL Shortener
            </span>{" "}
            you&apos;ll ever need.
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            Turn messy, impossible-to-remember links into clean, trackable,
            branded URLs in seconds. Snip, share, and analyze your links with a
            single platform.
          </p>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 md:justify-start">
            <li className="rounded-full bg-slate-900/70 px-3 py-1">
              🔗 Custom aliases
            </li>
            <li className="rounded-full bg-slate-900/70 px-3 py-1">
              📊 Click analytics
            </li>
            <li className="rounded-full bg-slate-900/70 px-3 py-1">
              🛡️ Secure redirects
            </li>
          </ul>
        </header>

        {/* Form + Banner Card */}
        <section className="grid gap-8 md:grid-cols-[1.2fr,1fr] md:items-center">
          {/* Form Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/60 sm:p-6">
            <h2 className="mb-2 text-sm font-semibold text-slate-200">
              Shorten a link in seconds
            </h2>
            <p className="mb-4 text-xs text-slate-400">
              Paste your long URL below and we&apos;ll handle the rest.
            </p>
            <form
              onSubmit={handleShorten}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://your-super-long-link-goes-here.com/..."
                className="h-11 flex-1 border-slate-700 bg-slate-900/80 text-sm placeholder:text-slate-500"
                required
              />
              <Button
                className="h-11 w-full sm:w-auto"
                type="submit"
                variant="default"
              >
                Shorten now
              </Button>
            </form>
            <p className="mt-3 text-[11px] text-slate-500">
              You&apos;ll be asked to sign in so you can manage and track your
              links.
            </p>
          </div>

          {/* Hero Image Card */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-sky-500/5 to-indigo-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/60">
              <img
                src="/hero-url-shortener.png"
                alt="Visualization of links being shortened and tracked"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <div className="mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-100 sm:text-xl">
                Frequently asked questions
              </h3>
              <p className="text-xs text-slate-400 sm:text-sm">
                Everything you need to know about using our URL shortener.
              </p>
            </div>
          </div>

          <Accordion
            type="multiple"
            collapsible
            className="w-full divide-y divide-slate-800"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="text-left text-sm font-medium text-slate-100">
                How does the Sniply URL shortener work?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-300">
                When you enter a long URL, Sniply generates a unique shortened
                link. Anyone visiting that short link is securely redirected to
                your original URL, while we track clicks and insights in the
                background.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="text-left text-sm font-medium text-slate-100">
                Do I need an account to use the app?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-300">
                Yes. Creating an account lets you manage all your links, view
                analytics, edit or disable links, and customize your short URLs
                with branded aliases.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="text-left text-sm font-medium text-slate-100">
                What analytics are available for my shortened URLs?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-300">
                You can see total clicks, referrers, countries, and device
                breakdowns (mobile vs desktop) for each short link, helping you
                understand how and where your links are performing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
