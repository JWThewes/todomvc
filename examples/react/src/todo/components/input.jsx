import { useCallback, useState } from "react";
import Input from "@cloudscape-design/components/input";

const sanitize = (string) => {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
};

const hasValidMin = (value, min) => {
    return value.length >= min;
};

export function InputComponent({ onSubmit, placeholder, label, defaultValue, onBlur }) {
    const [value, setValue] = useState(defaultValue || "");

    const handleBlur = useCallback(() => {
        if (onBlur)
            onBlur();
    }, [onBlur]);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.detail.key === "Enter") {
                const trimmedValue = value.trim();

                if (!hasValidMin(trimmedValue, 2))
                    return;

                onSubmit(sanitize(trimmedValue));
                setValue("");
            }
        },
        [onSubmit, value]
    );

    return (
        <Input
            value={value}
            onChange={({ detail }) => setValue(detail.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            ariaLabel={label}
            onBlur={handleBlur}
            autoFocus
        />
    );
}
