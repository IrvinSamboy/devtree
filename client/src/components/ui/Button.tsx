import { ReactNode } from "react";

type buttonComponentPropsT = {
    disabled? : boolean;
    children : ReactNode;
    styles? : string;
}

export default function Button({
        disabled = false, 
        styles = '',
        children
    } : buttonComponentPropsT) {
    return (
    <button
        disabled={disabled}
        className={`w-full text-center p-2 bg-mid-purple font-bold text-white rounded-lg
         cursor-pointer ${styles}`}
    >
        {children}
    </button>
  )
}
