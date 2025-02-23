import Loader from "../utils/Loader";

type buttonComponentPropsT = {
    isLoading : boolean;
    message : string;
    styles : string;
}

export default function button({isLoading, message, styles} : buttonComponentPropsT) {
    return (
    <button
        disabled={isLoading}
        className={`w-full text-center p-2 bg-mid-purple font-bold text-white rounded-lg
         cursor-pointer ${styles}`}
    >
        {isLoading ? <Loader /> : message}
    </button>
  )
}
