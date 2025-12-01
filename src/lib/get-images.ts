"use server";
import { imageInfo } from "@app/app/page";
import Fake1 from "@public/fake1.jpg";
import Fake2 from "@public/fake2.jpg";
import Fake3 from "@public/fake3.jpg";
import Real1 from "@public/real1.jpg";
import shuffle from "./shuffle";

const images: Array<imageInfo> = [
  {
    image: Fake1,
    infoText: "This image was generated with Google's Nano Banana Pro.",
    styling: "max-h-[76vh] w-auto m-8",
    aspectRatio: "9/16",
    isReal: false,
  },
  {
    image: Fake2,
    infoText: "This image was generated with Google's Nano Banana Pro.",
    styling: "max-h-[60vh] w-auto m-4",
    aspectRatio: "4/3",
    isReal: false,
  },
  {
    image: Fake3,
    infoText: "This image was generated with Google's Nano Banana Pro.",
    styling: "max-h-[70vh] w-auto m-4",
    aspectRatio: "9/16",
    isReal: false,
  },
  {
    image: Real1,
    infoText: "This is just a selfie from unsplash.com.",
    styling: "max-h-[70vh] w-auto m-4",
    aspectRatio: "3/4",
    isReal: true,
  },
];

export async function getImages() {
  return shuffle(images);
}
