import * as React from "react";
import { Check } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { languageOptions } from "@/lib/constants";
import { languageOptionsType } from "@/types";


interface LanguagePickerProps {
  onSelectChange: (selectedOption: string) => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = React.memo(({ onSelectChange }) => {
  const [label, setLabel] = React.useState(languageOptions[0].label);
  const handleChange = React.useCallback(
    (selectedValue: string) => {
      onSelectChange(selectedValue);
      setLabel(languageOptions.filter((option) => option.value === selectedValue)[0].label);

    },
    [onSelectChange]
  );

  return (
    <Select
      value={languageOptions[0].value} // default value
      onValueChange={handleChange}
      aria-label="Select language"
    >
      <SelectTrigger>
        <SelectValue>{label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.id} value={option.value}>
            <span className="absolute flex h-3.5 w-3.5 items-center justify-center">
              <Check className="h-4 w-4" />
            </span>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

LanguagePicker.displayName = "LanguagePicker"; // Add display name

export default LanguagePicker;