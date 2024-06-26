import React from "react";

export type ButtonIconProps = React.HTMLAttributes<HTMLButtonElement>;

export const ButtonIcon: React.FC<ButtonIconProps> = (props) => (
  <button type="button" {...props} />
);
