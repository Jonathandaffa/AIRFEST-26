/* ============================================
   Logo3DViewer — Logo AIRFEST yang bisa
   diputar 3D dengan mouse drag
   Menggunakan Three.js + @react-three/fiber
   Logo ditampilkan sebagai plane dengan texture
   ============================================ */
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './Logo3DViewer.css';

/* Komponen plane yang menampilkan logo sebagai texture */
function LogoPlane() {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, 'public/assets/Logo.png');

  /* Auto-rotate pelan saat idle */
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      /* Subtle breathing effect */
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        emissive={new THREE.Color('#00f5ff')}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

export default function Logo3DViewer() {
  return (
    <div className="logo-3d-viewer">
      {/* Instruksi */}
      <div className="logo-3d-hint">🖱️ Drag to rotate</div>

      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Pencahayaan */}
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00f5ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ff00aa" />

        {/* Logo yang bisa di-drag */}
        <LogoPlane />

        {/* OrbitControls: drag untuk rotate, scroll untuk zoom */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2.5}
          maxDistance={7}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}