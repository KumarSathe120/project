// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {
    email: '',
    role: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = { email: '', role: '' };
    },
  },
});

export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;

// index.js (or main.js)
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// App.js
import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import CustomerDashboard from './pages/CustomerDashboard';
import GuideDashboard from './pages/GuideDashboard';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <LoginPage />;

  switch (user.role) {
    case 'customer':
      return <CustomerDashboard />;
    case 'guide':
      return <GuideDashboard />;
    default:
      return <div>No dashboard found</div>;
  }
}

export default App;

// LoginPage.js (only important change shown)
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

const dispatch = useDispatch();
// ...
// if (Object.keys(validationErrors).length === 0) {
//   dispatch(login({ email, role }));
// }
// ...
