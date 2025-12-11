import React from 'react';
import { ItemProvider } from './context/ItemContext';
import ItemList from './components/ItemList';
import './App.css';

const App: React.FC = () => {
  return (
    <ItemProvider>
      <div className="App">
        <header className="App-header">
          <ItemList />
        </header>
      </div>
    </ItemProvider>
  );
};

export default App;