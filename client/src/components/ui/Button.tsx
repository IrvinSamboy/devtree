import { ReactNode } from "react";

type buttonComponentPropsT = {
    disabled? : boolean;
    children : ReactNode;
    styles? : string;
    onClick? : () => void
}

export default function Button({
        disabled = false, 
        styles = '',
        children,
        onClick = () =>{}
    } : buttonComponentPropsT) {
    return (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`w-full text-center p-2 bg-mid-purple font-bold text-white rounded-lg
         cursor-pointer ${styles}`}
    >
        {children}
    </button>
  )
}
