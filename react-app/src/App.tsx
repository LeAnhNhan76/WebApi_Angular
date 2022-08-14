import { Link, Route, Routes } from 'react-router-dom';
import { MainLayout } from './assets/styles/styles';
import Home from './views/Home/Home';
import NavbarLeft from './views/NavbarLeft/NavbarLeft';
import Product from './views/Product/Product';
import ProductCategory from './views/ProductCategory/ProductCategory';

function App() {
  return (
    <div className="App">
      <MainLayout.Container>
        <MainLayout.LeftSide>
          <NavbarLeft />
        </MainLayout.LeftSide>
        <MainLayout.RightSide>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/productcategories" element={<ProductCategory />} />
          </Routes>
        </MainLayout.RightSide>
      </MainLayout.Container>
    </div>
  );
}

export default App;
