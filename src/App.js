import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";
import OwnerForm from "./components/OwnerForm.component";
import CreateOwner from "./pages/CreateOwner.page.js"
import CreateHolding from "./pages/CreateHolding.page";

// Creating a new query-client which we will use
// in our QueryClientProvider that can be accessed 
// from anywhere in the app.
const queryClient = new QueryClient();



function App() {
  return (
    // We are wrapping our whole app with QueryClientProvider so that 
    // our queryClient is accessible through out the app from any page
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
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;