import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/navbar";
import { PicklesNew } from "./components/picklesnew";
import { CartDetails } from "./components/cartdetails";
import { useEffect, useState } from "react";
import { Cart } from "./components/cart";
import { NavbarTop } from "./components/navbarTop";
import pickles from "./data/pickles.json";

function AppContent({ cart, setCart, calculateTotalAmount }) {
  const location = useLocation(); // Now safely within Router context

  return (
    <div>
      <NavbarTop />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <PicklesNew
              cart={cart}
              handleAddToCart={(pickle) => {
                setCart((prevCart) => {
                  const existingItem = prevCart[pickle.name];
                  if (existingItem) {
                    return prevCart;
                  }
                  return {
                    ...prevCart,
                    [pickle.name]: { ...pickle, noOfItems: 1 },
                  };
                });
              }}
              handleIncreaseNoOfItems={(pickleName) =>
                setCart((prevCart) => {
                  const item = prevCart[pickleName];
                  if (item) {
                    return {
                      ...prevCart,
                      [pickleName]: { ...item, noOfItems: item.noOfItems + 1 },
                    };
                  } else {
                    const pickle = pickles.find((p) => p.name === pickleName);
                    if (pickle) {
                      return {
                        ...prevCart,
                        [pickleName]: { ...pickle, noOfItems: 1 },
                      };
                    }
                  }
                  return prevCart;
                })
              }
              handleDecreaseNoOfItems={(pickleName) =>
                setCart((prevCart) => {
                  const item = prevCart[pickleName];
                  if (item) {
                    if (item.noOfItems > 1) {
                      return {
                        ...prevCart,
                        [pickleName]: {
                          ...item,
                          noOfItems: item.noOfItems - 1,
                        },
                      };
                    } else {
                      const { [pickleName]: _, ...remainingCart } = prevCart;
                      return remainingCart;
                    }
                  }
                  return prevCart;
                })
              }
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCartItems={setCart} />}
        />
      </Routes>

      {location.pathname !== "/cart" && (
        <CartDetails
          className="sticky-bottom"
          cart={Object.values(cart)}
          totalAmount={calculateTotalAmount()}
        />
      )}
    </div>
  );
}

function App() {
  const [cart, setCart] = useState({});
  const calculateTotalAmount = () => {
    return Object.values(cart).reduce((total, item) => {
      if (item && item.price && item.noOfItems) {
        return total + item.price * item.noOfItems;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContent
        cart={cart}
        setCart={setCart}
        calculateTotalAmount={calculateTotalAmount}
      />
    </Router>
  );
}

export default App;
