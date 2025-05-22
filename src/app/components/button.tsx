import { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  label: string;
  variant?: "update" | "delete" | "create";
}

const Button: FC<ButtonProps> = ({ onClick, label, variant = "create" }) => {
  const baseStyle = "px-5 py-1 text-[13px] text-white rounded-md transition-colors flex items-center font-bold";

  const styles = {
    update: "bg-[#26BD5D] hover:bg-green-400 cursor-pointer",
    delete: "bg-[#EF2B2E] hover:bg-[#FB6365] cursor-pointer",
    create: "bg-[#2D579A] hover:bg-[#6499EF] cursor-pointer",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyle} ${styles[variant]}`}
    >
      {label}
    </button>
  );
};

export default Button;
