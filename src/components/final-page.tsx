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
      <div className="w-[90%] max-w-[550px] mx-auto gap-3 flex flex-col">
        <p className="text-xl mb-16">
          You guessed correctly on{" "}
          <span
            className={
              totalCorrect === totalQuestions
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {totalCorrect} out of {totalQuestions}
          </span>{" "}
          questions.
        </p>
        <p>
          {totalCorrect === totalQuestions
            ? timesPlayed > 0
              ? "That's pretty impressive... but we know you've been here before :)"
              : "That's pretty impressive, but most people wouldn't be able to answer that accurately."
            : "Isn't this cause for concern?"}
        </p>
        <p className="mb-16">
          Generative AI is becoming increasingly harder to detect, and large
          tech companies refuse to do anything about it.
        </p>
        <p>That's where we come in.</p>
        <p>
          We're making a platform that treats authenticity as a feature of
          creation, not an afterthought of moderation.
        </p>
        <p>We're always open to chat.</p>
        <ul className="mb-16">
          <li>
            <b>Oscar</b> |{" "}
            <a href="mailto:oscar.gaske.cs@gmail.com" className="font-light">
              oscar.gaske.cs@gmail.com
            </a>
          </li>
          <li>
            <b>Ben</b> |{" "}
            <a className="font-light" href="mailto:benjamin.grunwerg@gmail.com">
              benjamin.grunwerg@gmail.com
            </a>
          </li>
        </ul>
        <p className="text-xl">
          <span className="border-b-secondary border-b-solid border-b-3">
            You
          </span>{" "}
          don't trust what{" "}
          <span className="border-b-accent border-b-solid border-b-3">
            you see
          </span>
          , do you?
        </p>
      </div>
    </motion.div>
  );
}
