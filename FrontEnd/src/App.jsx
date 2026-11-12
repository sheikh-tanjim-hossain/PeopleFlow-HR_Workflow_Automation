import { Outlet, useNavigation } from "react-router";
import Foorter from "./component/Footer";
import GlobalSpinner from "./component/GlobalSpinner";
import Header from "./component/Header";

export default function App() {
  // loading
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <>
      <Header />
      <main className="w-full">
        {isNavigating && <GlobalSpinner />}
        <Outlet />
      </main>
      <Foorter />
    </>
  );
}
