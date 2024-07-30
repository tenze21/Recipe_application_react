import "./App.css";
import { useGlobalContext } from "./context";
import Search from "./components/Search";
import Modal from "./components/Modal";
import Favourites from "./components/Favourites";  
import Meals from "./components/Meals";

export default function App() {
  const { showModal, favourites } = useGlobalContext();
  return (
    <main>
      <Search />
      { favourites.length > 0 && <Favourites/> }
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}
