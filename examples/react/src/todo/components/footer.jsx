import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";

import Link from "@cloudscape-design/components/link";
import Button from "@cloudscape-design/components/button";

import { REMOVE_COMPLETED_ITEMS } from "../constants";

export function Footer({ todos, dispatch }) {
    const { pathname: route } = useLocation();

    const activeTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);

    const removeCompleted = useCallback(() => dispatch({ type: REMOVE_COMPLETED_ITEMS }), [dispatch]);

    if (todos.length === 0)
        return null;

    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">{`${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`}</span>
            <ul className="filters" data-testid="footer-navigation">
                <li>
                    <Link href="#/" className={classnames({ selected: route === "/" })}>
                        All
                    </Link>
                </li>
                <li>
                    <Link href="#/active" className={classnames({ selected: route === "/active" })}>
                        Active
                    </Link>
                </li>
                <li>
                    <Link href="#/completed" className={classnames({ selected: route === "/completed" })}>
                        Completed
                    </Link>
                </li>
            </ul>
            <Button disabled={activeTodos.length === todos.length} onClick={removeCompleted}>
                Clear completed
            </Button>
        </footer>
    );
}