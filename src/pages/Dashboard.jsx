import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/ui/Error";
import { UrlState } from "@/Context";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/ApiUrls";
import { getClicksForUrls } from "@/db/ApiClicks";
import LinkCard from "@/components/LinkCard";
import CreateLink from "@/components/CreateLink";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnClicks();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#22d3ee" />
      )}

      {/* Header + Stats */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl">
            My Links
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your shortened URLs, track performance, and share them with
            the world.
          </p>
        </div>
        <div>
          <Button className="rounded-full px-4 py-2 text-sm">
            <CreateLink />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900/80 text-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Links Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-cyan-400">
              {urls?.length || 0}
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/80 text-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Total Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-indigo-400">
              {clicks?.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mt-2">
        <Input
          type="text"
          placeholder="Search your links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-slate-800 bg-slate-900/80 text-sm text-slate-100 placeholder:text-slate-500 pr-8"
        />
        <Filter className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>

      {error && <Error message={error.message} />}

      {/* Links list */}
      <div className="mt-2 flex flex-col gap-3">
        {(filteredUrls || []).length === 0 && !loading && (
          <p className="text-sm text-slate-500">
            You don&apos;t have any links yet. Create your first one to get
            started.
          </p>
        )}

        {(filteredUrls || []).map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
