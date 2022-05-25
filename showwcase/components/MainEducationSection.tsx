import * as dayjs from "dayjs";
import styled from "styled-components";
import { Education } from "../types";
dayjs().format();

const MainContent = styled.div`
  background-color: #eeeeee;
  height: 90vh;
  border-radius: 10px;
`;

type MainComponenrProps = {
  selectedEducation: Education | any;
};

const MainComponent = ({ selectedEducation }: MainComponenrProps) => {
  return (
    <MainContent>
      <div className="p-4">
        {selectedEducation && (
          <div className="px-2 space-y-2">
            <div className="space-x-2 text-lg font-bold capitalize">
              <span>{selectedEducation.degree}</span> -
              <span>{selectedEducation.university}</span>
            </div>
            <div className="space-x-1 text-sm font-semibold">
              <span>
                {dayjs(selectedEducation.startDate).format("DD/MM/YYYY")}
              </span>
              <span>-</span>
              <span>
                {dayjs(selectedEducation.endDate).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="pl-1">
              <div className="font-semibold capitalize">achievements</div>
              <ul className="pl-4">
                {selectedEducation.achivements.length !== 0 ? (
                  <>
                    {selectedEducation.achivements.map((item, index) => {
                      return (
                        <li className="italic" key={index}>
                          <span>&#8226;</span> {item}
                        </li>
                      );
                    })}
                  </>
                ) : (
                  <div>No achivements</div>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </MainContent>
  );
};

export default MainComponent;
