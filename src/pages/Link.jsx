import { Button } from "@/components/ui/button";
import { UrlState } from "@/Context";
import { getClicksForUrl } from "@/db/ApiClicks";
import { deleteUrl, getUrl } from "@/db/ApiUrls";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationStats from "@/components/ui/LocationStats";
import DeviceStats from "@/components/ui/DeviceStats";

const Link = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  const shortUrl = `http://localhost:5173/${link}`;

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width="100%" color="#22d3ee" />
      )}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left: link details */}
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6 lg:w-[40%]">
          <div className="space-y-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl">
              {url?.title}
            </h1>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="break-all text-lg font-semibold text-cyan-400 hover:underline sm:text-xl"
            >
              {shortUrl}
            </a>

            <a
              href={url?.original_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 break-all text-sm text-slate-300 hover:underline"
            >
              <LinkIcon className="h-4 w-4 text-slate-400" />
              {url?.original_url}
            </a>

            <span className="block text-xs font-light text-slate-500">
              Created on{" "}
              {url?.created_at && new Date(url.created_at).toLocaleString()}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="border-slate-700 bg-slate-900/70 text-xs text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy short URL
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 bg-slate-900/70 text-xs text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
              onClick={downloadImage}
            >
              <Download className="mr-2 h-4 w-4" />
              Download QR
            </Button>
            <Button
              variant="outline"
              className="border-red-700 bg-red-950/40 text-xs text-red-300 hover:border-red-500 hover:bg-red-900/60 hover:text-red-100"
              onClick={() => fnDelete()}
            >
              {loadingDelete ? (
                <BeatLoader size={6} color="#ffffff" />
              ) : (
                <>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete link
                </>
              )}
            </Button>
          </div>

          {/* QR Image */}
          <div className="mt-4 flex justify-center">
            <div className="overflow-hidden rounded-2xl ring-2 ring-cyan-500/80 ring-offset-2 ring-offset-slate-900">
              <img
                src={url?.qr}
                className="w-48 bg-slate-950 p-2 object-contain"
                alt="qr-code"
              />
            </div>
          </div>
        </div>

        {/* Right: stats */}
        <Card className="flex-1 border-slate-800 bg-slate-900/80 text-slate-100">
          <CardHeader className="border-b border-slate-800 pb-4">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Stats
            </CardTitle>
          </CardHeader>

          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6 pt-4">
              <Card className="border-slate-800 bg-slate-950/70">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">
                    Total Clicks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-indigo-400">
                    {stats?.length}
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <CardTitle className="text-sm font-semibold text-slate-200">
                  Location Data
                </CardTitle>
                <LocationStats stats={stats} />
              </div>

              <div className="space-y-3">
                <CardTitle className="text-sm font-semibold text-slate-200">
                  Device Info
                </CardTitle>
                <DeviceStats stats={stats} />
              </div>
            </CardContent>
          ) : (
            <CardContent className="pt-6 text-sm text-slate-400">
              {loadingStats === false
                ? "No statistics yet for this link. Share it to start collecting data."
                : "Loading statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
