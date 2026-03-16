import { memo, useState, useCallback } from "react";
import Checkbox from "@cloudscape-design/components/checkbox";
import Button from "@cloudscape-design/components/button";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";

export const Item = memo(function Item({ todo, dispatch, index }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;

    const toggleItem = useCallback((e) => dispatch({ type: TOGGLE_ITEM, payload: { id } }), [dispatch]);
    const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM, payload: { id } }), [dispatch]);
    const updateItem = useCallback((id, title) => dispatch({ type: UPDATE_ITEM, payload: { id, title } }), [dispatch]);

    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    const handleUpdate = useCallback(
        (title) => {
            if (title.length === 0)
                removeItem(id);
            else
                updateItem(id, title);

            setIsWritable(false);
        },
        [id, removeItem, updateItem]
    );

    return (
        <li className={completed ? "completed" : ""} data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <Checkbox checked={completed} onChange={toggleItem} data-testid="todo-item-toggle" />
                        <span data-testid="todo-item-label" onDoubleClick={handleDoubleClick} style={{ cursor: "pointer" }}>
                            {title}
                        </span>
                        <Button iconName="close" variant="icon" onClick={removeItem} data-testid="todo-item-button" />
                    </>
                )}
            </div>
        </li>
    );
});
