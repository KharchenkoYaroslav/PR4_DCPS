import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import '../styles/LorenzCanvas.scss';
import { useRef } from 'react';

type LorenzLineProps = {
  data: [number, number, number][];
  color: string;
};

const LorenzLine: React.FC<LorenzLineProps> = ({ data, color }) => {
  const points = data.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
    />
  );
};

function Axes() {
  const { camera } = useThree();
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      const scale = camera.position.length() / 100; // Фактора масштабу
      ref.current.scale.set(scale, scale, scale); // Масштабуємо осі
    }
  });

  const color = '#888';

  return (
    <group ref={ref}>
      <Line
        points={[
          [-65, 0, 0],
          [65, 0, 0],
        ]}
        color={color}
        lineWidth={1}
        dashed
        dashSize={2}
        gapSize={2}
      />
      <Text position={[65 + 2, 0, 0]} fontSize={4} color="white">
        X+
      </Text>

      <Line
        points={[
          [0, -55, 0],
          [0, 55, 0],
        ]}
        color={color}
        lineWidth={1}
        dashed
        dashSize={2}
        gapSize={2}
      />
      <Text position={[0, 55 + 2, 0]} fontSize={4} color="white">
        Y+
      </Text>

      <Line
        points={[
          [0, 0, -65],
          [0, 0, 65],
        ]}
        color={color}
        lineWidth={1}
        dashed
        dashSize={2}
        gapSize={2}
      />
      <Text position={[0, 0, 65 + 2]} fontSize={4} color="white">
        Z+
      </Text>
    </group>
  );
}


type LorenzCanvasProps = {
  lines: { data: [number, number, number][]; color: string }[];
};

const LorenzCanvas: React.FC<LorenzCanvasProps> = ({ lines }) => {
  return (
    <div className="lorenz-canvas-wrapper">
      <Canvas camera={{ position: [25, 25, 80], fov: 75 }}>
        <OrbitControls />
        <Axes />

        <group>
          {lines.map((line, index) => (
            <LorenzLine key={index} data={line.data} color={line.color} />
          ))}
        </group>
        
      </Canvas>
    </div>
  );
};

export default LorenzCanvas;