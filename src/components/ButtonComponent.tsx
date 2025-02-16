import { Button, Badge } from "flowbite-react";
import { FC, PropsWithChildren } from "react";

const ButtonComponent: FC<
  PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...otherProps }) => {
  return (
    <>
      <Button {...otherProps}>{children}</Button>
      {/* <Badge>1</Badge> */}
    </>
  );
};

export default ButtonComponent;
