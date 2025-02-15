import { Button } from "flowbite-react";
import { FC, PropsWithChildren } from "react";

interface Props {}

const ButtonComponent: FC<
  PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...otherProps }) => {
  return <Button {...otherProps}>{children}</Button>;
};

export default ButtonComponent;
