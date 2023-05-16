import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";
import CreateOwner from "./pages/CreateOwner.page.js"
import CreateHolding from "./pages/CreateHolding.page";
import EditOwner from "./pages/EditOwner.page";
import EditHolding from "./pages/EditHolding.page";

const queryClient = new QueryClient();


function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route element={<PrivateRoute />}>
                <Route exact path="/" element={<Home />} />
              </Route>
              <Route exact path="/newowner" element={<CreateOwner />} />
              <Route exact path="/newholding" element={<CreateHolding />} />
              <Route exact path="/editowner/:id" element={<EditOwner />} />
              <Route exact path="/editholding/:id" element={<EditHolding />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;