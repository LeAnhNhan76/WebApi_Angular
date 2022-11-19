import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Product from "../Product/Product";
import ProductCategory from "../ProductCategory/ProductCategory";

const containerStyle : React.CSSProperties = {
  margin: '10px',
  border: '1px solid'
}

const AppBody = () => {
  return (
    <>
      {/* <Container fixed style={containerStyle}>
        
      </Container>
       */}
       <div style={containerStyle}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/productcategories" element={<ProductCategory />} />
          </Routes>
       </div>
    </>
  )
};

export default AppBody;
