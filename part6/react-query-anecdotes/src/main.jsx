import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
const queryClient = new QueryClient();
import { NotificationContextProvider } from "./NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationContextProvider>
);
