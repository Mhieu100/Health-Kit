import React from "react";

import { AuthProvider } from "./context/AuthContext";
import AppContent from "./navigation";

const App = () => {
 
  return (
    <AuthProvider>
      <AppContent/>
    </AuthProvider>
  );
};

export default App;
