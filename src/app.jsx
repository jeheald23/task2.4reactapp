import React, { useState } from 'react';
import LoginView from './components/login-view/login-view';
import MainView from './components/main-view/main-view';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoggedIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? <MainView /> : <LoginView onLoggedIn={handleLoggedIn} />}
    </div>
  );
};

export default App;

