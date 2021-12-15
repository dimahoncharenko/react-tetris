import { StyledDisplay } from "./styled/StyledDisplay";

type Props = {
  message: string;
};

const Display = ({ message }: Props) => {
  return <StyledDisplay>{message}</StyledDisplay>;
};

export default Display;
