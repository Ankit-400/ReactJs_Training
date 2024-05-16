import { useState } from "react";

export function useInput(defaultValue, validationFn) {
    const [value, setValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);
    const valueIsValid = validationFn(value);

    function handleInputChange(e) {
        setValue(e.target.value);
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true);
    }

    return {
        value: value,
        handleInputBlur,
        handleInputChange,
        hasError: didEdit && !valueIsValid
    }
}