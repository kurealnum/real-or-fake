"use client";
import RealOrFake from "@app/components/real-or-fake";
import { useState } from "react";
import FinalPage from "@app/components/final-page";
import shuffle from "@app/lib/shuffle";
import Fake1 from "@public/fake1.jpg";
import Fake2 from "@public/fake2.jpg";
import Fake3 from "@public/fake3.jpg";
import Real1 from "@public/real1.jpg";
import { imageInfo } from "@app/app/page";

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

export default function Main() {
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  function isAnsweredCallback(wasCorrect: boolean) {
    setTotalAnswered(totalAnswered + 1);
    if (wasCorrect) {
      setCorrect(correct + 1);
    }
  }

  function nextCallback() {
    setIndex(index + 1);
  }

  function doneCallback() {
    setIndex(totalQuestions);
  }

  const totalQuestions = images.length;

  const screens = shuffle(images).map((data) => (
    <RealOrFake
      key={data.image.src}
      image={data.image}
      isReal={data.isReal}
      text={data.infoText}
      isAnsweredCallback={isAnsweredCallback}
      nextCallback={nextCallback}
      doneCallback={doneCallback}
      imgStyling={data.styling}
      imgAspectRatio={data.aspectRatio}
    />
  ));

  if (index == totalQuestions) {
    return <FinalPage totalCorrect={correct} totalQuestions={totalAnswered} />;
  }

  return (
    <div className="flex h-screen flex-col justify-center overflow-clip">
      {screens[index]}
    </div>
  );
}
