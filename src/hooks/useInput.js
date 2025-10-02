import React, { useState } from "react";

export default function useInput(initValue) {
  const [value, setValue] = useState(initValue);

  const resetValue = () => setValue("");
  const setNewValue = (newValue) => setValue(newValue);

  const binding = {
    value: value,
    onChange: (e) => setValue(e.target.value),
  };

  return [value, binding, setNewValue, resetValue];
}
