import { useState } from 'react';
import { LorenzParams } from '../utils/lorenz';
import '../styles/InputForm.scss';

interface InputFormProps {
  onAdd: (params: LorenzParams, color: string) => void;
}

const defaultParams: LorenzParams = {
  sigma: 10,
  rho: 28,
  beta: 8 / 3,
  dt: 0.01,
  steps: 5000,
  initial: [1, 1, 1],
};

export default function InputForm({ onAdd }: InputFormProps) {
  const [params, setParams] = useState<LorenzParams>(defaultParams);
  const [color, setColor] = useState<string>('#ff0000');

  const handleChange = (key: keyof LorenzParams, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: key === 'initial'
        ? value.split(',').map(Number) as [number, number, number]
        : key === 'steps'
        ? parseInt(value)
        : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(params, color);
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div>
        <label>Sigma:</label>
        <input type="number" step="0.01" value={params.sigma} onChange={(e) => handleChange('sigma', e.target.value)} />
      </div>
      <div>
        <label>Rho:</label>
        <input type="number" step="0.01" value={params.rho} onChange={(e) => handleChange('rho', e.target.value)} />
      </div>
      <div>
        <label>Beta:</label>
        <input type="number" step="0.01" value={params.beta} onChange={(e) => handleChange('beta', e.target.value)} />
      </div>
      <div>
        <label>dt:</label>
        <input type="number" step="0.001" value={params.dt} onChange={(e) => handleChange('dt', e.target.value)} />
      </div>
      <div>
        <label>Steps:</label>
        <input type="number" value={params.steps} onChange={(e) => handleChange('steps', e.target.value)} />
      </div>
      <div>
        <label>Initial [x,y,z]:</label>
        <input type="text" value={params.initial.join(',')} onChange={(e) => handleChange('initial', e.target.value)} />
      </div>
      <div>
        <label>Color:</label>
        <input className="input-form__color-picker" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <button type="submit">Додати траєкторію</button>
    </form>
  );
}