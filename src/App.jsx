import { useContext, useEffect, useState } from "react";
import "./App.css";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./Utils/firebase"
import { Type } from "./Utils/action.type";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => { 
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
