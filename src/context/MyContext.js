import { createContext, useState } from 'react';

const MyContext = createContext();

export function MyProvider({ children }) {
  const [value, setValue] = useState("Hello, from Techbro!!");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyContext;
