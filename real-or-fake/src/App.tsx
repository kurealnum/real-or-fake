import RealOrFake from "./components/real-or-fake";
import Fake1 from "./assets/fake1.jpg";
import Fake2 from "./assets/fake2.jpg";
import Fake3 from "./assets/fake3.jpg";
import { useState } from "react";
import FinalPage from "./components/final-page";
import { motion } from "motion/react";

export default function App() {
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [index, setIndex] = useState(0);

  function isAnsweredCallback(isAnswered: boolean, wasCorrect: boolean) {
    if (wasCorrect) {
      setCorrect(correct + 1);
    }

    setAnswered(true);
  }

  function resetPage() {
    setAnswered(false);
  }

  function nextCallback() {
    setIndex(index + 1);
    resetPage();
  }

  const totalQuestions = 3;
  const screens = [
    <RealOrFake
      key={0}
      image={Fake1}
      isReal={false}
      text="This image was generated with Google's Nano Banana Pro."
      isAnsweredCallback={isAnsweredCallback}
      nextCallback={nextCallback}
    />,

    <RealOrFake
      key={1}
      image={Fake2}
      isReal={false}
      text="Another picture generated with Google's Nano Banana Pro model."
      isAnsweredCallback={isAnsweredCallback}
      nextCallback={nextCallback}
    />,

    <RealOrFake
      key={2}
      image={Fake3}
      isReal={false}
      text="Another picture generated with Google's Nano Banana Pro model."
      isAnsweredCallback={isAnsweredCallback}
      nextCallback={nextCallback}
    />,
  ];

  if (index == totalQuestions) {
    return <FinalPage totalCorrect={correct} totalQuestions={totalQuestions} />;
  }

  return (
    <div className="flex flex-col justify-center h-[100vh]">
      {screens[index]}
    </div>
  );
}
