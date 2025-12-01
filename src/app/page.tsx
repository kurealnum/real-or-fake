"use client";
import { StaticImageData } from "next/image";
import dynamic from "next/dynamic";

export interface imageInfo {
  image: StaticImageData;
  infoText: string;
  styling: string;
  aspectRatio: string;
  isReal: boolean;
}

const NoSSR = dynamic(() => import("@app/components/main"), { ssr: false });

export default function Page() {
  return <NoSSR />;
}
