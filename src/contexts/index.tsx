import { PropsWithChildren } from "react";
import ThemeProvider from "./theme";
import { TodoProvider } from "./todo";

export default function ContextManager({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <TodoProvider>{children}</TodoProvider>
    </ThemeProvider>
  );
}
