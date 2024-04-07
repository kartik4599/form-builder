import React from "react";
import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";

const FormElementSideBar = () => {
  return (
    <>
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </>
  );
};

export default FormElementSideBar;
