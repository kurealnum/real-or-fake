import { useState } from "react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

export default function RealOrFake({
  image,
  isReal = false,
  text,
  isAnsweredCallback,
  nextCallback,
  imgStyling = "",
  imgAspectRatio,
}: {
  image: string;
  isReal: boolean;
  text: string;
  isAnsweredCallback: (arg0: boolean) => void;
  nextCallback: () => void;
  imgStyling?: string;
  imgAspectRatio: string;
}) {
  const [believesReal, setBelievesReal] = useState(false);
  const [believesFake, setBelievesFake] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnswered = believesFake || believesReal;

  function handleAnswer(believe: string) {
    setIsDialogOpen(true);

    if (believe === "real") {
      setBelievesReal(true);
      isAnsweredCallback(isReal);
    }
    if (believe === "fake") {
      setBelievesFake(true);
      isAnsweredCallback(!isReal);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1, transition: { duration: 1.1 } }}
      exit={{ opacity: 0.5 }}
    >
      <h1 className="text-center my-6 text-xl md:text-2xl">
        Is this image{" "}
        <span className="border-b-secondary border-b-solid border-b-4">
          real
        </span>{" "}
        or{" "}
        <span className="border-b-accent border-b-solid border-b-4">
          AI generated
        </span>
        ?
      </h1>
      <div
        className={imgStyling + ` aspect-[${imgAspectRatio}] w-[100%] mx-auto`}
      >
        <img
          src={image}
          className={
            "mx-auto border-white/90 border-solid border-[1.5px] rounded-md " +
            imgStyling
          }
        />
      </div>
      <div className="flex flex-row justify-around items-center my-4 mb-6 max-w-[400px] mx-auto">
        <button
          className="px-8 py-2 bg-secondary rounded-md text-lg hover:cursor-pointer"
          onClick={isAnswered ? () => {} : () => handleAnswer("real")}
        >
          <b>Real</b>
        </button>
        <button
          className="px-8 py-2 bg-accent rounded-md text-lg hover:cursor-pointer"
          onClick={isAnswered ? () => {} : () => handleAnswer("fake")}
        >
          <b>Fake</b>
        </button>
      </div>
      {isAnswered && (
        <Dialog open={isDialogOpen}>
          <DialogContent className="bg-card border-white/20 [&>button:last-child]:hidden">
            <DialogHeader>
              <h2
                className={
                  (believesReal ? isReal : !isReal)
                    ? "text-green-500 " + " text-center font-bold text-xl"
                    : "text-red-500" + " text-center font-bold text-xl"
                }
              >
                {believesReal
                  ? isReal
                    ? "Correct."
                    : "Wrong!"
                  : !isReal
                    ? "Correct."
                    : "Wrong!"}
              </h2>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {believesReal || believesFake ? text : null}
              <button
                onClick={nextCallback}
                className="px-6 py-1.5 bg-card max-w-[100px] rounded-md mx-auto border-white/30 border-solid border-2 mt-2 hover:cursor-pointer"
              >
                Next
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}
