import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  getCurrentUser,
} from "./utils/firebase/firebase.utils";
import { Navigation } from "./routes/navigation/navigation.component";
import { Authentication } from "./routes/auth/auth.component";
import { Home } from "./routes/home/home.component";
import { Shop } from "./routes/shop/shop.component";
import { Checkout } from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  // the user is needed at the entire application
  useEffect(() => {
    getCurrentUser().then(console.log);

    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }

    //   dispatch(setCurrentUser(user));
    // });

    // this runs when the component unmounts
    // return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* whatever starts with 'shop/' will be routed to the Shop component, which will have it's own routes inside */}
        <Route path="shop/*" element={<Shop />} />{" "}
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
