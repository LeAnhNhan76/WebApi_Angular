import { MainLayout } from "./assets/styles/layouts";
import AppBody from "./views/AppBody/AppBody";
import AppHeader from "./views/AppHeader/AppHeader";
import NavbarLeft from "./views/NavbarLeft/NavbarLeft";

function App() {
  return (
    <div className="App">
      <MainLayout.Container>
        <MainLayout.LeftSide>
          <NavbarLeft />
        </MainLayout.LeftSide>
        <MainLayout.RightSide>
          <AppHeader />
          <AppBody />
        </MainLayout.RightSide>
      </MainLayout.Container>
    </div>
  );
}

export default App;
