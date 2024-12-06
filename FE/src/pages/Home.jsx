import React from "react";

const Home = () => {
  const generateSampleData = () => {
    const sampleData = Array.from({ length: 100 }, (_, i) => i + 1);
    return sampleData.map((item) => <h1 key={item}>Item {item}</h1>);
  };

  return <div className="pt-16">{generateSampleData()}</div>;
};

export default Home;
