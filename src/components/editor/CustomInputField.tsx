import { classnames } from "@/lib/utils";
import React, { ChangeEvent } from "react";

interface CustomInputProps {
  customInput: string;
  setCustomInput: (value: string) => void;
}

const CustomInputField: React.FC<CustomInputProps> = ({ customInput, setCustomInput }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCustomInput(e.target.value);
  };

  return (
    <>
      <textarea
        rows={5}
        value={customInput}
        onChange={handleChange}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-full z-10 rounded-md shadow-sm px-4 py-2 transition duration-200 bg-white mt-2"
        )}
      ></textarea>
    </>
  );
};

export default CustomInputField;
