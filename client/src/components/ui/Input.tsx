import { cn } from "../utils/utils";

interface inputPropsI {
  errorMessage?: string;
  styles?: string;
  placeHolder?: string;
  label?: string;
  labelStyle?: string
  type?: React.HTMLInputTypeAttribute;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[];
}

export default function Input({
  errorMessage = "",
  styles = "",
  placeHolder = "",
  label = "",
  labelStyle = "",
  type = "text",
  onChange = () => {},
  value
}: inputPropsI) {
  return (
    <div className="flex flex-col space-y-1">
      {label&& <label htmlFor="" className={cn(labelStyle)}>{label}</label>}
      <input
        className={
            cn(`bg-transparent w-full p-1.5 rounded-lg
                outline-none border-1
              border-gray-400 focus:border-black
              ${errorMessage && "border-red-500"}`, styles)
        }
        type={type}
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
