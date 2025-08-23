import {priority, statusEnum, role} from "./Enums";

declare global{
    interface BasicButtonProps<T>
    {
        buttonText: string;
        buttonColor: string;
        textColor?: string;
        onClick: (value?: T | undefined) => void;
        customStyle?: string;
        children?: React.ReactNode;
        value?: T;
    }

    interface CreateTagModalProps
    {
        isOpen: boolean;
        onClose: () => void;
        onSubmit: () => void;
        onSuccess: (data: Tag) => void;
        onFailure: () => void;
    }

    interface EditUserInfoModalProps
    {
        isOpen: boolean;
        defaultUserInfo: User;
        onClose: () => void;
        onSubmit: () => void;
        onSuccess: (data: User) => void;
        onFailure: () => void;
    }
}