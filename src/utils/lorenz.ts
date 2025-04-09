export interface LorenzParams {
    sigma: number;
    rho: number;
    beta: number;
    dt: number;
    steps: number;
    initial: [number, number, number];
  }
  
  export function calculateLorenz({
    sigma,
    rho,
    beta,
    dt,
    steps,
    initial,
  }: LorenzParams): [number, number, number][] {
    const result: [number, number, number][] = [];
    let [x, y, z] = initial;
  
    for (let i = 0; i < steps; i++) {
      const dx = sigma * (y - x);
      const dy = x * (rho - z) - y;
      const dz = x * y - beta * z;
  
      x += dx * dt;
      y += dy * dt;
      z += dz * dt;
  
      result.push([x, y, z]);
    }
  
    return result;
  }