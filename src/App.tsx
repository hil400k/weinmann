import Weinmann from './components/Weinmann.tsx';
import AppContextProvider from './providers/AppContextProvider.tsx';

function App() {
  return (
      <AppContextProvider>
        <Weinmann />
      </AppContextProvider>
  )
}

export default App
