import { useState } from "react";

export default function useStep(initialStep = "landing") {
  const [step, setStep] = useState(initialStep);

  /* ================================
     NAVIGATION FUNCTIONS
  ================================= */

  const goTo = (nextStep) => {
    setStep(nextStep);
  };

  const reset = () => {
    setStep(initialStep);
  };

  return {
    step,
    goTo,
    reset,
  };
}