import styled from "styled-components";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import EducationModal from "../components/Modal";
import CustomButton from "../components/Button";
import MainComponent from "../components/MainEducationSection";
import Sidebar from "../components/Sidebar";
import { Education, EducationItems } from "../types";
import { SAMPLE_EDUCATION_LIST } from "../constants";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 3fr;
  gap: 100px;
`;

Modal.setAppElement("body");

const EducationDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [educationList, setEducationList] = useState<EducationItems>(
    SAMPLE_EDUCATION_LIST
  );

  const [selectedEducation, setSelectedEducation] = useState<Education>();

  useEffect(() => {
    if (educationList.length > 0) {
      setSelectedEducation(educationList[0]);
    }
  }, [educationList]);

  const changeModalState = () => {
    setIsModalOpen((state) => !state);
  };

  const onSelectedEducationChange = (item: Education) => {
    setSelectedEducation(item);
  };

  const ModalSubmit = (value: Education) => {
    setEducationList((state) => {
      let educationList = [...state];
      educationList.unshift(value);
      return educationList;
    });
    changeModalState();
  };

  return (
    <div className="bg-gray-100">
      <Flex>
        <div className="text-2xl">Education Dashboard</div>
        <CustomButton
          label=" Add new Education"
          onClick={() => changeModalState()}
        />
      </Flex>
      <Grid>
        <Sidebar
          educationList={educationList}
          onSelectedEducationChange={onSelectedEducationChange}
          selectedEducation={selectedEducation}
        />
        <MainComponent selectedEducation={selectedEducation} />
      </Grid>
      <EducationModal
        changeModalState={changeModalState}
        isModalOpen={isModalOpen}
        onModalSubmit={ModalSubmit}
      />
    </div>
  );
};

export default EducationDashboard;
