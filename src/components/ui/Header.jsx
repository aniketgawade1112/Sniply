import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/Context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/ApiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logout);

  return (
    <>
      <nav className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-500 shadow-lg shadow-cyan-500/30">
              <img
                src="/logo.png"
                className="h-7 w-7 object-contain"
                alt="Sniply logo"
              />
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-100 sm:text-base">
              Sniply
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {!user ? (
              <Button
                onClick={() => navigate("/auth")}
                className="rounded-full px-4 py-2 text-sm"
              >
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:ring-ring flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-900/80 shadow-sm outline-none transition hover:border-cyan-400">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user?.user_metadata?.profile_pic}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xs font-semibold">
                      {user?.user_metadata?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "US"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border-slate-800 bg-slate-900/95 text-slate-100"
                >
                  <DropdownMenuLabel className="text-sm font-semibold text-slate-100">
                    {user?.user_metadata?.name || "Account"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex w-full items-center text-sm"
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      My Links
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-400 focus:bg-red-950/60 focus:text-red-200"
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>

      {loading && (
        <div className="w-full border-b border-slate-800 bg-slate-950">
          <BarLoader width={"100%"} color="#22d3ee" />
        </div>
      )}
    </>
  );
};

export default Header;
