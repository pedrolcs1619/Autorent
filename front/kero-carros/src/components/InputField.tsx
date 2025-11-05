import React, { useState } from "react";
import * as S from "../styles/components/InputFieldStyles";

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={S.container}>
      <label style={S.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{ ...S.input, ...(focused ? S.inputFocus : {}) }}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export default InputField;
