import { colors } from "../../assets/styles/styles";

type Props = {
  text: string;
};

const style: React.CSSProperties = {
  fontSize: '23px',
  color: colors.$grey90
}

export const PageTitle = (props: Props) => {
  const {text} = props;
  return (
    <label style={style}>{text}</label>
  )
};