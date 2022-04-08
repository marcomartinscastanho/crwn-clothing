import { Routes, Route } from "react-router-dom";
import { Navigation } from "./routes/navigation/navigation.component";
import { Authentication } from "./routes/auth/auth.component";
import { Home } from "./routes/home/home.component";
import { Shop } from "./routes/shop/shop.component";
import { Checkout } from "./routes/checkout/checkout.component";

const App = () => {
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
