import { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Checkbox from "@cloudscape-design/components/checkbox";

import { Item } from "./item";
import classnames from "classnames";

import { TOGGLE_ALL } from "../constants";

export function Main({ todos, dispatch }) {
    const { pathname: route } = useLocation();

    const visibleTodos = useMemo(
        () =>
            todos.filter((todo) => {
                if (route === "/active")
                    return !todo.completed;

                if (route === "/completed")
                    return todo.completed;

                return todo;
            }),
        [todos, route]
    );

    const allCompleted = useMemo(() => visibleTodos.length > 0 && visibleTodos.every((todo) => todo.completed), [visibleTodos]);

    const toggleAll = useCallback((e) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.detail.checked } }), [dispatch]);

    return (
        <main className="main" data-testid="main">
            {visibleTodos.length > 0 ? (
                <div className="toggle-all-container">
                    <Checkbox checked={allCompleted} onChange={toggleAll} data-testid="toggle-all">
                        Toggle All
                    </Checkbox>
                </div>
            ) : null}
            <ul className={classnames("todo-list")} data-testid="todo-list">
                {visibleTodos.map((todo, index) => (
                    <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} />
                ))}
            </ul>
        </main>
    );
}
