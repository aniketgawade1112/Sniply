import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/ApiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title || "qr-code";

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  const shortUrl = `https://trimrr.in/${
    url?.custom_url ? url?.custom_url : url?.short_url
  }`;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-slate-100 shadow-md shadow-slate-950/50 md:flex-row md:items-start">
      {/* QR */}
      <div className="flex flex-col items-center gap-2 self-start">
        <div className="overflow-hidden rounded-xl ring-2 ring-cyan-500/70 ring-offset-2 ring-offset-slate-900">
          <img
            src={url?.qr}
            className="h-32 w-32 object-contain bg-slate-950"
            alt="qr-code"
          />
        </div>
        <span className="text-[10px] uppercase tracking-wide text-slate-500">
          QR for quick sharing
        </span>
      </div>

      {/* Link info */}
      <Link
        to={`/link/${url?.id}`}
        className="flex flex-1 flex-col gap-1 md:gap-2"
      >
        <span className="line-clamp-1 text-lg font-semibold tracking-tight hover:underline">
          {url?.title}
        </span>

        <span className="line-clamp-1 text-sm font-medium text-cyan-400 hover:underline">
          {shortUrl}
        </span>

        <span className="line-clamp-2 break-all text-xs text-slate-300">
          {url?.original_url}
        </span>

        <span className="mt-2 text-xs font-light text-slate-500">
          Created at {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1 md:flex-col md:items-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
          onClick={() => navigator.clipboard.writeText(shortUrl)}
          title="Copy short URL"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
          onClick={downloadImage}
          title="Download QR"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-red-400 hover:bg-red-950/60 hover:text-red-200"
          onClick={() => fnDelete().then(() => fetchUrls())}
          title="Delete link"
        >
          {loadingDelete ? (
            <BeatLoader size={5} color="#ffffff" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
