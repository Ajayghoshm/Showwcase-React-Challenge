type ButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const CustomButton = ({ label, ...props }: ButtonProps) => {
  return (
    <button className="p-2 text-white bg-blue-500 rounded-md" {...props}>
      {label}
    </button>
  );
};

export default CustomButton;
