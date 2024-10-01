import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./store";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
 
    <Provider store={store}>
      <App />
    </Provider>

);
