import { useState } from "react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { saveResponse } from "@app/lib/entries";

export default function RealOrFake({
  image,
  isReal = false,
  text,
  isAnsweredCallback,
  nextCallback,
  doneCallback,
  imgStyling = "",
  imgAspectRatio,
}: {
  image: StaticImageData;
  isReal: boolean;
  text: string;
  isAnsweredCallback: (arg0: boolean) => void;
  nextCallback: () => void;
  doneCallback: () => void;
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
      const isCorrect = isReal;

      const filename = image.src;
      const seen = localStorage.getItem(filename) === "seen";
      if (!seen) {
        saveResponse(isCorrect, filename).then(() => {});
        localStorage.setItem(filename, "seen");
      }

      setBelievesReal(true);
      isAnsweredCallback(isCorrect);
    }
    if (believe === "fake") {
      const isCorrect = !isReal;

      const filename = image.src;
      const seen = localStorage.getItem(filename) === "seen";
      if (!seen) {
        saveResponse(isCorrect, filename).then(() => {});
        localStorage.setItem(filename, "seen");
      }

      setBelievesFake(true);
      isAnsweredCallback(isCorrect);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1, transition: { duration: 1.1 } }}
      exit={{ opacity: 0.5 }}
    >
      <h1 className="my-6 text-center text-xl md:text-2xl">
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
        className={imgStyling + ` aspect-[${imgAspectRatio}] mx-auto w-[100%]`}
      >
        <Image
          src={image}
          alt=""
          className={
            "mx-auto rounded-md border-[1.5px] border-solid border-white/90 " +
            imgStyling
          }
        />
      </div>
      <div className="mx-auto my-4 mb-6 flex max-w-[400px] flex-row items-center justify-around">
        <button
          className="bg-secondary rounded-md px-8 py-2 text-lg hover:cursor-pointer"
          onClick={isAnswered ? () => {} : () => handleAnswer("real")}
        >
          <b>Real</b>
        </button>
        <button
          className="bg-accent rounded-md px-8 py-2 text-lg hover:cursor-pointer"
          onClick={isAnswered ? () => {} : () => handleAnswer("fake")}
        >
          <b>Fake</b>
        </button>
      </div>
      {isAnswered && (
        <Dialog open={isDialogOpen}>
          <DialogContent className="bg-card border-white/20 [&>button:last-child]:hidden">
            <DialogHeader>
              <DialogTitle
                className={
                  (believesReal ? isReal : !isReal)
                    ? "text-green-500 " + " text-center text-xl font-bold"
                    : "text-red-500" + " text-center text-xl font-bold"
                }
              >
                {believesReal
                  ? isReal
                    ? "Correct."
                    : "Wrong!"
                  : !isReal
                    ? "Correct."
                    : "Wrong!"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {believesReal || believesFake ? text : null}
              <div className="mx-auto flex flex-row gap-10">
                <button
                  onClick={nextCallback}
                  className="bg-card mx-auto mt-2 max-w-[100px] rounded-md border-2 border-solid border-white/30 px-6 py-1.5 hover:cursor-pointer"
                >
                  Next
                </button>
                <button
                  onClick={doneCallback}
                  className="bg-card mx-auto mt-2 rounded-md border-2 border-solid border-white/30 px-6 py-1.5 text-nowrap hover:cursor-pointer"
                >
                  I&apos;m done
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}
