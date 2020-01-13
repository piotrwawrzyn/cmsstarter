import { InputOnChangeData, ButtonProps } from "semantic-ui-react";

export * from "./User";
export * from "./Campaign";

export type onChangeSemantic = (
  event: React.ChangeEvent<HTMLInputElement>,
  data: InputOnChangeData
) => void;

export type btnOnClickSemantic = (
  event: React.MouseEvent<HTMLButtonElement>,
  data: ButtonProps
) => void;
