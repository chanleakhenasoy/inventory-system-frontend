import { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  label: string;
  variant?: "update" | "save" | "delete" | "create";
}

const Button: FC<ButtonProps> = ({ onClick, label, variant = "create" }) => {
  const baseStyle = "px-6 py-1.5 text-[15px] text-white rounded-lg transition-colors";

  const styles = {
    update: "bg-[#26BD5D] hover:bg-green-400",
    save: "bg-[#2D579A] hover:bg-[#6499EF]",
    delete: "bg-[#EF2B2E] hover:bg-[#FB6365]",
    create: "bg-[#2D579A] hover:bg-[#6499EF]",
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
