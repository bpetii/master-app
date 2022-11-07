import { useState } from "react"

export function useMultistepForm(steps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function back() {
        setCurrentStepIndex(i => {
          if (currentStepIndex <= 0) return i;
          return i-1
        });
    }

   function next() {
    if (currentStepIndex >= steps.length -1) return ;
    setCurrentStepIndex(i => {
      if (currentStepIndex >= steps.length -1) return ;
      return i+1
    });

    }

    function goTo(index) {
        setCurrentStepIndex(index);
    }

    return {
        steps: steps, 
        currentStepIndex: currentStepIndex,
        step: steps[currentStepIndex],
        isFirstStep: currentStepIndex ===0,
        isLastStep: currentStepIndex === steps.length -1,
        back, 
        next,
        goTo
    }
}