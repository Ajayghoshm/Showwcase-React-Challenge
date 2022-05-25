import ReactDatePicker from "react-datepicker";
import InputCustom from "./Input";

const CustomDatePicker = ({ ...props }) => {
  return <ReactDatePicker customInput={<InputCustom />} {...props} />;
};

export default CustomDatePicker;
