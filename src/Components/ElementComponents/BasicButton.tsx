import React from 'react';

const BasicButton = <T extends unknown>({
    buttonText,
    onClick,
    customStyle,
    value,
}: BasicButtonProps<T>) => {

    return(
        <button 
            className={`md:px-2 md:py-2 rounded-md md:rounded-sm ${customStyle}`}
            onClick={
                () => {
                    if(value) onClick(value);
                    else onClick();
                }
            }
        >
            {buttonText}
        </button>
    );
};

export default BasicButton;