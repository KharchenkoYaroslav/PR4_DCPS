import './styles/App.scss';
import { useState } from 'react';
import { LorenzParams, calculateLorenz } from './utils/lorenz';
import InputForm from './components/InputForm';
import LorenzCanvas from './components/LorenzCanvas';

function App() {
  const [lines, setLines] = useState<
    { params: LorenzParams; data: [number, number, number][]; color: string }[]
  >([]);

  const handleAddTrajectory = (params: LorenzParams, color: string) => {
    const data = calculateLorenz(params);
    setLines((prev) => [...prev, { params, data, color }]);
  };

  return (
    <div className="app">
      <h1>Аттрактор Лоренца</h1>
      <InputForm onAdd={handleAddTrajectory} />
      <LorenzCanvas lines={lines} />
    </div>
  );
}

export default App;

