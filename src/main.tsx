import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store.ts";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Provider } from "react-redux";
import { render } from "react-dom"; 

ReactDOM.createRoot(document.getElementById("root")!).render(
 
    <Provider store={store}>
      <App />
    </Provider>
 
);
