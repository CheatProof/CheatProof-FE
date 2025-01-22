import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./store";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Provider } from "react-redux";
 
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
 
  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>

);

