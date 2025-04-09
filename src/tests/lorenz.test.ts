import { calculateLorenz, LorenzParams } from '../utils/lorenz';

describe('Lorenz Attractor Calculation', () => {
    const defaultParams: LorenzParams = {
      sigma: 10,
      rho: 28,
      beta: 8 / 3,
      dt: 0.01,
      steps: 1000,
      initial: [1, 1, 1],
    };
  
    it('should return a result with the correct length', () => {
      const result = calculateLorenz(defaultParams);
      expect(result).toHaveLength(defaultParams.steps);
    });
  
    it('should return a result with the correct structure', () => {
      const result = calculateLorenz(defaultParams);
      expect(result[0]).toEqual([expect.any(Number), expect.any(Number), expect.any(Number)]);
    });
  
    it('should return a different result for different initial conditions', () => {
      const newParams: LorenzParams = { ...defaultParams, initial: [1.1, 1, 1] };
      const result1 = calculateLorenz(defaultParams);
      const result2 = calculateLorenz(newParams);
      
      expect(result1).not.toEqual(result2);
    });
  
    it('should handle small step sizes correctly', () => {
      const smallStepParams: LorenzParams = { ...defaultParams, dt: 0.001 };
      const result = calculateLorenz(smallStepParams);
      expect(result).toHaveLength(smallStepParams.steps);
    });
  
    it('should handle zero steps correctly', () => {
      const zeroStepParams: LorenzParams = { ...defaultParams, steps: 0 };
      const result = calculateLorenz(zeroStepParams);
      expect(result).toHaveLength(0);
    });
  });
