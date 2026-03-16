import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import classnames from "classnames";

import { REMOVE_COMPLETED_ITEMS } from "../constants";

export function Footer({ todos, dispatch }) {
    const { pathname: route } = useLocation();

    const activeTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);

    const removeCompleted = useCallback(() => dispatch({ type: REMOVE_COMPLETED_ITEMS }), [dispatch]);

    // prettier-ignore
    if (todos.length === 0)
        return null;

    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">{`${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`}</span>
            <SpaceBetween direction="horizontal" size="m">
                <Link href="#/" className={classnames({ selected: route === "/" })}>All</Link>
                <Link href="#/active" className={classnames({ selected: route === "/active" })}>Active</Link>
                <Link href="#/completed" className={classnames({ selected: route === "/completed" })}>Completed</Link>
            </SpaceBetween>
            <Button onClick={removeCompleted} disabled={activeTodos.length === todos.length}>
                Clear completed
            </Button>
        </footer>
    );
}
