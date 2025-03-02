import { ReactNode } from "react";

type buttonComponentPropsT = {
    disabled? : boolean;
    children : ReactNode;
    styles? : string;
    type? : "submit" | "reset" | "button"
    onClick? : () => void
}

export default function Button({
        disabled = false, 
        styles = '',
        children,
        type = 'submit',
        onClick = () =>{}
    } : buttonComponentPropsT) {
    return (
    <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={`w-full text-center p-2 bg-mid-purple font-bold text-white rounded-lg
         cursor-pointer ${styles}`}
    >
        {children}
    </button>
  )
}
