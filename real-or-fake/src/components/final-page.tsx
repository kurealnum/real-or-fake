import { motion } from "motion/react";

export default function FinalPage({
  totalCorrect,
  totalQuestions,
}: {
  totalCorrect: number;
  totalQuestions: number;
}) {
  const timesPlayed = Number(localStorage.getItem("timesPlayed") ?? 0);
  localStorage.setItem("timesPlayed", String(timesPlayed + 1));

  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1, transition: { duration: 1.4 } }}
      exit={{ opacity: 0.5 }}
      className="flex flex-col justify-center h-[100vh]"
    >
      <div className="w-[90%] max-w-[550px] mx-auto gap-6 flex flex-col">
        <p>
          You guessed correctly on {totalCorrect} out of {totalQuestions}{" "}
          questions.
        </p>
        <p>
          {totalCorrect === totalQuestions
            ? timesPlayed > 0
              ? "That's pretty impressive... but we know you've been here before :)"
              : "That's pretty impressive, but most people wouldn't be able to guess that accurately."
            : "Isn't this cause for concern?"}
        </p>
        <p>
          Generative AI is becoming increasingly harder to detect, and large
          tech companies refuse to do anything about it.
        </p>
        <p>
          That's where <b>we</b> come in.
        </p>
        <p>
          We, Oscar Gaske and Benjamin Grunwerg, intend to solve this problem.
        </p>
        <p>Because you don't trust what you see, do you?</p>
      </div>
    </motion.div>
  );
}
