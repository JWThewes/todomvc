import { useCallback, useState } from "react";
import CloudscapeInput from "@cloudscape-design/components/input";

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

export function Input({ onSubmit, placeholder, label, defaultValue, onBlur }) {
    const [value, setValue] = useState(defaultValue || "");

    const handleBlur = useCallback(() => {
        if (onBlur)
            onBlur();
    }, [onBlur]);

    const handleChange = useCallback(
        (e) => {
            setValue(e.detail.value);
        },
        []
    );

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
        [value, onSubmit]
    );

    return (
        <CloudscapeInput
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={placeholder}
            ariaLabel={label}
            data-testid="text-input"
        />
    );
}