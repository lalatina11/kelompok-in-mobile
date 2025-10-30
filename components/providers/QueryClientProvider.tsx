import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import type React from "react";

interface Props {
  children: React.ReactNode;
}

const QueryClientProvider: React.FC<Props> = ({ children }) => {
  const client = new QueryClient();
  return (
    <TanstackQueryClientProvider client={client}>
      {children}
    </TanstackQueryClientProvider>
  );
};

export default QueryClientProvider;
