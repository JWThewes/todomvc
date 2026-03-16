import React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "./todo/app";
import { ThemeProvider } from "./todo/theme-context";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";
import "@cloudscape-design/global-styles/index.css";

render(
    <HashRouter>
        <ThemeProvider>
            <Routes>
                <Route path="*" element={<App />} />
            </Routes>
        </ThemeProvider>
    </HashRouter>,
    document.getElementById("root")
);
