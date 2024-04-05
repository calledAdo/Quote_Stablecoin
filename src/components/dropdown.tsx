import React from "react";
import { DropdownProps } from "@lib/interfaces";
import { Icon } from "@iconify/react";
import styled from "styled-components";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

export const DropDownView: React.FC<DropdownProps> = ({
  className,
  toggling,
  defaultOption,
  defaultImage,
  options,
  selectedOption,
  selectedImage,
  isOpen,
  onOptionClicked,
  ...props
}) => {
  return (
    <DropDownContainer className="w-fit bg-primary-200 rounded-3xl px-4 py-2" {...props}>
      <DropDownHeader onClick={toggling}>
        {selectedOption ? (
          <div className="flex flex-row items-center gap-x-2 ">
            <img className="w-10 h-10" src={selectedImage} />
            {selectedOption}
            <Icon icon={"simple-line-icons:arrow-down"} className="w-4 h-4" />
          </div>
        ) : (
          <div className="flex flex-row items-center gap-x-2 ">
            <img className="w-10 h-10" src={defaultImage} />
            {defaultOption}
            <Icon icon={"simple-line-icons:arrow-down"} className="w-4 h-4" />
          </div>
        )}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map((option) => (
              <ListItem
                className="flex flex-row"
                onClick={() => {onOptionClicked(option.coin, option.image); toggling()}}
                key={Math.random()}
              >
                <button className="flex flex-row items-center gap-x-2 mt-4">
                  <img className="w-10 h-10" src={option.image} />
                  {option.coin}
                </button>
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};
