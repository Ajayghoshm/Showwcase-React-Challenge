import { useEffect, useState } from "react";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import useSWR from "swr";
import useDebounce from "./useDebounce";
import InputCustom from "./Input";
import SelectCustom from "./Select";
import CustomButton from "./Button";
import CustomDatePicker from "./DatePicker";
import { Institution, Education, EducationItems } from "../types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "70%",
    width: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 100,
  },
};

type ModalProps = {
  isModalOpen: boolean;
  changeModalState: Function;
  onModalSubmit: Function;
};

const EducationModal = ({
  isModalOpen,
  changeModalState,
  onModalSubmit,
}: ModalProps) => {
  const [degree, setDegree] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [typedInputValue, setTypedInputValue] = useState<string>();
  const [selectedInstitue, setSelectedInstitute] = useState<Institution>({
    label: "",
    value: "",
  });
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [achivementInputValue, setAchivementValue] = useState<string>();
  const [achivements, setAchivements] = useState<string[]>([]);

  const fetcher = (...args: any) =>
    fetch(...args).then((res) => {
      return res.json();
    });

  const debouncedSearch = useDebounce(typedInputValue, 500);
  const { data } = useSWR(
    () =>
      debouncedSearch
        ? `http://universities.hipolabs.com/search?name=${debouncedSearch}`
        : null,
    fetcher
  );

  const onInstituteSelect = (value: Institution) => {
    setSelectedInstitute(value);
  };

  useEffect(() => {
    console.debug("data", data);
    if (data && data.length !== 0) {
      let labeledData = data.map((item: any) => {
        return { label: item.name, value: item.name };
      });
      setSelectOptions(labeledData);
    } else {
      setSelectOptions([]);
    }
  }, [data]);

  const onInstituteChange = (value: string) => {
    console.debug("value", value);
    setTypedInputValue(value);
  };

  const addAchievemnts = () => {
    let achievementList = [...achivements];
    achievementList.push(achivementInputValue);
    setAchivements(achievementList);
    setAchivementValue("");
  };

  const onEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addAchievemnts();
    }
  };

  const removeAchivements = (index: number) => {
    let achievementList = [...achivements];
    achievementList.splice(index, 1);
    setAchivements(achievementList);
  };

  const onsubmit = () => {
    let currentEducationModal: Education = {
      degree: degree,
      field: field,
      grade: grade,
      university: selectedInstitue?.label,
      achivements: achivements,
      startDate: startDate,
      endDate: endDate,
    };
    onModalSubmit(currentEducationModal);
  };
  return (
    <Modal
      isOpen={isModalOpen}
      style={customStyles}
      onRequestClose={changeModalState}
    >
      <div className="flex justify-center p-4 text-xl font-semibold">
        Add new Education
      </div>
      <div className="w-full space-y-4">
        <div className="flex justify-between">
          <label>Degree</label>
          <InputCustom
            value={degree}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDegree(e.target.value)
            }
          ></InputCustom>
        </div>
        <div className="flex justify-between">
          <label>Field of Study</label>
          <InputCustom
            value={field}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setField(e.target.value)
            }
          ></InputCustom>
        </div>
        <div className="flex justify-between">
          <label>Grade</label>
          <InputCustom
            value={grade}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGrade(e.target.value)
            }
          ></InputCustom>
        </div>
        <div className="flex justify-between">
          <label>Institution</label>
          <SelectCustom
            value={selectedInstitue}
            onInputChange={(value: any) => onInstituteChange(value)}
            options={selectOptions}
            onChange={onInstituteSelect}
          />
        </div>
        <div className="flex justify-between">
          <label>Start Date</label>
          <div>
            <CustomDatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              customInput={<InputCustom></InputCustom>}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <label>End Date</label>
          <div>
            <CustomDatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              customInput={<InputCustom />}
            />
          </div>
        </div>
        <div className="flex flex-col items-end justify-end">
          {achivements.map((item: string, index: number) => {
            return (
              <div key={index} className="space-x-1">
                <span>{item}</span>
                <span
                  onClick={() => removeAchivements(index)}
                  className="p-1 text-xs text-red-400 bg-red-200 rounded-full cursor-pointer"
                >
                  X
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between">
          <label>Achivements</label>
          <div className="space-x-1">
            <InputCustom
              value={achivementInputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAchivementValue(e.target.value)
              }
              onKeyDown={onEnterClick}
            />
            <span className="text-gray-500">↵</span>
          </div>
        </div>
        <div className="flex justify-end">
          <CustomButton label="Submit" onClick={() => onsubmit()} />
        </div>
      </div>
    </Modal>
  );
};

export default EducationModal;
