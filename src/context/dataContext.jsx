import { createContext ,useState} from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
   const [loading,setLoading]=useState(false);
    return (
        <DataContext.Provider value={{loading,setLoading}}>
            {children}
        </DataContext.Provider>
    )
};
export default DataContext;