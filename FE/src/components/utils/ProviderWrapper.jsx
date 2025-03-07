import React from "react";

const ProviderWrapper = ({ providers, children }) => {
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export default ProviderWrapper;
