import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/ui/login";
import Signup from "@/components/ui/signup";
import { UrlState } from "@/Context";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("created");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          {longLink ? (
            <>
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Hold up!
              </span>{" "}
              Let&apos;s log you in first
            </>
          ) : (
            <>
              Welcome to{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Sniply
              </span>
            </>
          )}
        </h1>
        <p className="max-w-md text-sm text-slate-400">
          {longLink
            ? "We’ve got your link ready. Login or create an account to save and track it."
            : "Login to your existing account or create a new one to start shortening and tracking your links."}
        </p>

        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/60 sm:p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-slate-900/80">
              <TabsTrigger
                value="login"
                className="rounded-full data-[state=active]:bg-slate-800 data-[state=active]:text-slate-50"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-full data-[state=active]:bg-slate-800 data-[state=active]:text-slate-50"
              >
                Signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <Login />
            </TabsContent>
            <TabsContent value="signup" className="mt-4">
              <Signup />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
