import { forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";

type ProfileInfoDropdownProps = MotionProps & {
    className?: string;
};

const ProfileInfoDropdownBase = forwardRef<HTMLDivElement, ProfileInfoDropdownProps>(
    ({ className }, ref) => {
        return (
            <div
                className={`md:hidden absolute top-full right-0 w-[40%] md:w-[20%] bg-pink-200 border-1 border-pink-400 shadow-lg rounded-b-md p-2 z-50 ${className ?? ""}`}
                ref={ref}
            >   
                <ul className="space-y-2 text-pink-800 text-sm">
                    <li>
                        John Doe
                    </li>
                    <li className="overflow-ellipsis">
                        john.doe@example.com
                    </li>
                    <li>
                        User
                    </li>
                </ul>
            </div>
        );
    }
);

ProfileInfoDropdownBase.displayName = "ProfileInfoDropdown";

export const ProfileInfoDropdown = motion(ProfileInfoDropdownBase);
