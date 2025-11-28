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
}: {
  image: string;
  isReal: boolean;
  text: string;
  isAnsweredCallback: (arg0: boolean) => void;
  nextCallback: () => void;
  imgStyling?: string;
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
      <h1 className="text-center my-6 text-2xl">
        Is this image <b>real</b> or <b>AI generated?</b>
      </h1>
      <img src={image} className={"mx-auto " + imgStyling} />
      <div className="flex flex-row justify-around items-center my-4 mb-6 max-w-[400px] mx-auto">
        <button
          className="px-8 py-2 bg-green-500 rounded-md text-lg"
          onClick={isAnswered ? () => {} : () => handleAnswer("real")}
        >
          <b>Real</b>
        </button>
        <button
          className="px-8 py-2 bg-red-500 rounded-md text-lg"
          onClick={isAnswered ? () => {} : () => handleAnswer("fake")}
        >
          <b>Fake</b>
        </button>
      </div>
      {isAnswered && (
        <Dialog open={isDialogOpen}>
          <DialogContent className="bg-black/90">
            <DialogHeader>
              <span
                className={
                  (believesReal ? isReal : !isReal)
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {believesReal
                  ? isReal
                    ? "Correct."
                    : "Wrong!"
                  : !isReal
                    ? "Correct."
                    : "Wrong!"}
              </span>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {believesReal || believesFake ? text : null}
              <button
                onClick={nextCallback}
                className="px-6 py-1.5 bg-gray-500 max-w-[100px] rounded-md mx-auto"
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
