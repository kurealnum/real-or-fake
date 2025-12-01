"use client";
import RealOrFake from "@app/components/real-or-fake";
import Fake1 from "@public/fake1.jpg";
import Fake2 from "@public/fake2.jpg";
import Fake3 from "@public/fake3.jpg";
import Real1 from "@public/real1.jpg";
import { useState } from "react";
import FinalPage from "@app/components/final-page";

export default function Page() {
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);

  function isAnsweredCallback(wasCorrect: boolean) {
    if (wasCorrect) {
      setCorrect(correct + 1);
    }
  }

  function nextCallback() {
    setIndex(index + 1);
  }

  const totalQuestions = 4;
  const screens = [
    <RealOrFake
      key={0}
      image={Fake1}
      isReal={false}
      text="This image was generated with Google's Nano Banana Pro."
      isAnsweredCallback={isAnsweredCallback}
      nextCallback={nextCallback}
      imgStyling="max-h-[76vh] w-auto m-8"
      imgAspectRatio="9/16"
    />,

    <RealOrFake
      key={1}
      image={Fake2}
      isReal={false}
      text="This was another image generated with Google's Nano Banana Pro model."
      isAnsweredCallback={isAnsweredCallback}
      nextCallback={nextCallback}
      imgStyling="max-h-[60vh] w-auto m-4"
      imgAspectRatio="4/3"
    />,

    <RealOrFake
      key={2}
      image={Fake3}
      isReal={false}
      text="Another image generated with Google's Nano Banana Pro model. (If you couldn't tell, Nano Banana Pro is one of the best image generation models as of November 2025)"
      isAnsweredCallback={isAnsweredCallback}
      nextCallback={nextCallback}
      imgStyling="max-h-[70vh] w-auto m-4"
      imgAspectRatio="9/16"
    />,

    <RealOrFake
      key={3}
      image={Real1}
      text="This is just a selfie from unsplash.com."
      isReal={true}
      isAnsweredCallback={isAnsweredCallback}
      nextCallback={nextCallback}
      imgStyling="max-h-[70vh] w-auto m-4"
      imgAspectRatio="3/4"
    />,
  ];

  if (index == totalQuestions) {
    return <FinalPage totalCorrect={correct} totalQuestions={totalQuestions} />;
  }

  return (
    <div className="flex flex-col justify-center h-[100vh] overflow-clip">
      {screens[index]}
    </div>
  );
}
