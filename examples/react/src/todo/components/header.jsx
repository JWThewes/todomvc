import { useCallback } from "react";
import CloudscapeHeader from "@cloudscape-design/components/header";
import { Input } from "./input";
import { useTheme } from "../theme-context";

import { ADD_ITEM } from "../constants";

export function Header({ dispatch }) {
    const addItem = useCallback((title) => dispatch({ type: ADD_ITEM, payload: { title } }), [dispatch]);
    const { theme, toggleTheme } = useTheme();

    return (
        <CloudscapeHeader variant="h1" actions={<Input onSubmit={addItem} label="New Todo Input" placeholder="What needs to be done?" />}>
            todos
            <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </CloudscapeHeader>
    );
}
