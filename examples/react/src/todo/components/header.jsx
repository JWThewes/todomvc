import { useCallback } from "react";
import Header from "@cloudscape-design/components/header";
import { Input } from "./input";

import { ADD_ITEM } from "../constants";

export function HeaderComponent({ dispatch }) {
    const addItem = useCallback((title) => dispatch({ type: ADD_ITEM, payload: { title } }), [dispatch]);

    return (
        <Header variant="h1" data-testid="header">
            todos
            <Input onSubmit={addItem} label="New Todo Input" placeholder="What needs to be done?" />
        </Header>
    );
}
