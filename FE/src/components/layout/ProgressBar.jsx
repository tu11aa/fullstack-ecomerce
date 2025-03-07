import React, { useEffect } from "react";

const ProgressBar = ({ loadingTime = 3000 }) => {
  const [progress, setProgress] = React.useState(0);

  const SECONDS_PER_LOAD = 500;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= loadingTime) {
          clearInterval(timer);
          return prevProgress;
        }
        return prevProgress + SECONDS_PER_LOAD;
      });
    }, SECONDS_PER_LOAD);
  }, []);

  return (
    <progress
      className="h-1 w-full bg-gray-100 transition-all duration-500 ease-in-out"
      value={progress}
      max={loadingTime}
    />
  );
};

export default ProgressBar;
