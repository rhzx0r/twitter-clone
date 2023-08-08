import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
  // rightIcon?: boolean;
  // rightAction?: () => void;

  rightContent?: {
    icon: IconType;
    action: () => void;
  };
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow, rightContent }) => {

  const router = useRouter();

  const { icon: RightIcon, action: rightAction } = rightContent || {};

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="items-center grid grid-cols-3 gap-4 content-between">
        {showBackArrow && (
          <BiArrowBack 
            onClick={handleBack}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-white text-xl justify-center flex font-semibold">{label}</h1>
        {RightIcon && rightAction && (
          <div className="flex justify-end hover:opacity-70 transition " >
            <RightIcon onClick={rightAction} color="white" size={25} className="cursor-pointer"/>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default Header;