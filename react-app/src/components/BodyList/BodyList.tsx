import { Container } from "./styles";

type Props = {
  children: JSX.Element;
}

export const BodyList = (props: Props) => {

  const {children} = props;
  return (
    <Container>
      {children}
    </Container>
  );
}