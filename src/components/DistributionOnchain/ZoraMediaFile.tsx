"use client";

import { Label } from "@/components/ui/label";
import getIpfsLink from "@/lib/ipfs/getIpfsLink";

const ZoraMediaFile = ({ mediaFile, label = "Media File:" }: any) => (
  <div className="grid w-full items-center gap-2">
    <Label htmlFor="mediaFile">{label}</Label>
    {mediaFile && (
      <a target="_blank" href={getIpfsLink(mediaFile)}>
        view file
      </a>
    )}
  </div>
);

export default ZoraMediaFile;
