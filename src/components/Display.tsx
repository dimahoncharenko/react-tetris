import { StyledDisplay } from "./styles/StyledDisplay";

type Props = {
  message: string;
};

export const Display = ({ message }: Props) => (
  <StyledDisplay>{message}</StyledDisplay>
);
