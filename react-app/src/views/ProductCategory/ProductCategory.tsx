import { BodyList } from "../../components/BodyList/BodyList";
import { HeaderList } from "../../components/HeaderList/HeaderList";
import { Content } from "./Content/Content";
import { Header } from "./Header/Header";

const ProductCategory = () => {
  return (
    <>
      <HeaderList>
        <Header />
      </HeaderList>
      <BodyList>
        <Content/>
      </BodyList>
    </>
  );
}

export default ProductCategory;