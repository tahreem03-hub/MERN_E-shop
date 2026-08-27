import React from "react";
import Lottie from "react-lottie-player";
import animationData from "../../assets/animations/loading.json";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie
        loop
        play
        animationData={animationData}
        style={{ width: 300, height: 300 }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
    </div>
  );
};

export default Loader;