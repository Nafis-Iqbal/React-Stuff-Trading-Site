import { forwardRef } from "react";

export const EditButton = ({className, onClick, children} : {className?: string, onClick: () => void, children?: React.ReactNode}) => {
    return (
        <button className={`hover:outline-1 cursor-pointer ${className}`} onClick={() => onClick()}>
            <img src="/edit_icon.png" alt="edit_icon" width={20} height={20} />
            {children}
        </button>
    );
}

interface CustomCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelStyle?: string;
    error?: string;
    className?: string;
}

export const CustomCheckboxInput = forwardRef<HTMLInputElement, CustomCheckboxProps>((props, ref) => {
    const {
        className,
        label,
        labelStyle,
        error,
        ...rest
    } = props;

    return (
        <div className={`relative flex flex-col space-y-2 group ${className}`}>
            <label className={`inline-flex items-center space-x-2 cursor-pointer ${labelStyle}`}>
                <input
                    type="checkbox"
                    className={`form-checkbox h-4 w-4 text-green-500 bg-gray-700 border-gray-600 rounded-sm focus:ring-green-500`}
                    ref={ref}
                    {...rest}
                />
                {label && <span className="text-pink-700 font-semibold">{label}</span>}
            </label>

            {error && (
                <div className="absolute right-0 mt-1 text-xs text-white bg-red-500 p-1 rounded shadow z-10">
                    {error}
                </div>
            )}
        </div>
    );
});

CustomCheckboxInput.displayName = "CustomCheckboxInput";