import { Container } from "./styles";

type Props = {
  children: JSX.Element | string;
}

export const HeaderList = (props: Props) => {
  const {children} = props;

  return (
    <Container>
      {children}
    </Container>
  )
}