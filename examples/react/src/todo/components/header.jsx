import { useCallback } from "react";
import { Input } from "./input";
import { useTheme } from "../theme-context";

import { ADD_ITEM } from "../constants";

export function Header({ dispatch }) {
    const addItem = useCallback((title) => dispatch({ type: ADD_ITEM, payload: { title } }), [dispatch]);
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header" data-testid="header">
            <h1>todos</h1>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Input onSubmit={addItem} label="New Todo Input" placeholder="What needs to be done?" />
        </header>
    );
}
