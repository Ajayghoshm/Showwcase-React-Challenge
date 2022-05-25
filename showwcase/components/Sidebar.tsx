import styled from "styled-components";
import { EducationItems } from "../types";

const SidebarStyled = styled.div`
  background-color: #eeeeee;
  height: 90vh;
  border-radius: 10px;
`;

type SidebarProps = {
  educationList: EducationItems;
  onSelectedEducationChange: Function;
};

const Sidebar = ({
  educationList,
  onSelectedEducationChange,
}: SidebarProps) => {
  return (
    <SidebarStyled>
      <div className="flex flex-col items-center ">
        <div className="py-2 font-bold text-blue-500">Your Education</div>
        {educationList.map((item) => {
          return (
            <div className="p-2 capitalize cursor-pointer" key={item.degree}>
              <div onClick={() => onSelectedEducationChange(item)}>
                {item.degree}
              </div>
            </div>
          );
        })}
      </div>
    </SidebarStyled>
  );
};

export default Sidebar;
