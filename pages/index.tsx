import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Loader, OrbitControls } from '@react-three/drei'
import { Debug, Physics } from '@react-three/cannon'
import Blob from '@/components/Blob'
import Lighting from '@/components/Lighting'

function App() {
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
      {mounted && (
        <Canvas
          orthographic
          shadows
          camera={{
            position: [-674.32, 401.86, 878.18],
            near: -10000,
            far: 10000,
            zoom: 1.5 * 100,
          }}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 200ms ease-in-out',
          }}
        >
          <color args={['#cd3ae3']} attach="background" />

          <Suspense fallback={null}>
            <Blob position={[0, 1, 0]} scale={[2, 2, 2]} setLoaded={setLoaded} />
          </Suspense>
          <Lighting />

          <gridHelper args={[200, 100, '#1100ff', '#1100ff']} position={[0, -1.26, 0]} />
          <OrbitControls
            enablePan={false}
            minZoom={90}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minPolarAngle={0}
          />
        </Canvas>
      )}

      <Loader />
    </>
  )
}

export default App
