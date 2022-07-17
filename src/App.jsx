import React, { useState } from "react";
import jwtDecode from 'jwt-decode'
import "./App.css";
import { CartProvider } from "react-use-cart";

// rq
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// routes
import { ApplicationRouter } from "./Routes";
import { Header } from "./components/layout/Header.jsx";
import { UserContext } from "./UserContext";

const queryClient = new QueryClient();

const App = () => {

  const [user, setUser] = useState(null);

  let token;

  if (!user) {
    try {
      const jwt = localStorage.getItem("token");
      token = jwt
      const loggedInUser = jwtDecode(jwt);
      setUser(loggedInUser);
    } catch (error) {

    }
  }

  if (user) {
    token = localStorage.getItem("token");
  }


  // useEffect(() => {

  //   try {
  //     const jwt = localStorage.getItem("token");
  //     setUser(jwtDecode(jwt));
  //   } catch (error) {

  //   }
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser, token }} >
        <Header />
        <ReactQueryDevtools initialIsOpen={false} />
        <CartProvider
          id="jamie"
          onItemAdd={(item) => {
            alert(`Item ${item.id} added!`);
          }}
          onItemUpdate={(item) => alert(`Item ${item.id} updated.!`)}
          onItemRemove={() => alert(`Item removed!`)}
        >
          <ApplicationRouter />
        </CartProvider>
      </UserContext.Provider >
    </QueryClientProvider>
  );
};

export default App;
