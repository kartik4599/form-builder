import { useContext } from "react";
import { DesignerContext } from "../context/DesignerContext";

export default () => {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner must be used within a Designer Context");
  }

  return context;
};
