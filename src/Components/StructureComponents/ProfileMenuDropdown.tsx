import { forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";

type ProfileInfoDropdownProps = MotionProps & {
    className?: string;
    userInfo: User;
};

const ProfileInfoDropdownBase = forwardRef<HTMLDivElement, ProfileInfoDropdownProps>(
    ({ className, userInfo }, ref) => {
        return (
            <div
                className={`md:hidden absolute top-full right-0 w-[40%] md:w-[20%] bg-pink-200 border-1 border-pink-400 shadow-lg rounded-b-md p-2 z-50 ${className ?? ""}`}
                ref={ref}
            >   
                <ul className="space-y-2 text-pink-800 text-sm">
                    <li>
                        {userInfo.user_name}
                    </li>
                    <li className="overflow-ellipsis">
                        {userInfo.email}
                    </li>
                    <li className="text-emerald-500">
                        {userInfo.role}
                    </li>
                    <li className="text-yellow-600">
                        {userInfo.credits ?? 10}$
                    </li>
                </ul>
            </div>
        );
    }
);

ProfileInfoDropdownBase.displayName = "ProfileInfoDropdown";

export const ProfileInfoDropdown = motion(ProfileInfoDropdownBase);
