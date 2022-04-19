import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
// import dynamic from 'next/dynamic'
import Blob from '@/components/Blob'
import Lighting from '@/components/Lighting'
import { Canvas } from '@react-three/fiber'
import { Loader, OrbitControls } from '@react-three/drei'
import { Debug, Physics } from '@react-three/cannon'
import Shader from '@/components/Shader'

// const Bunny = dynamic(() => import('@/components/Bunny'))

function App() {
  const [loaded, setLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 })

  useLayoutEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  return (
    <>
      <Canvas
        orthographic
        shadows
        camera={{
          position: [0.25, -0.25, 1],
          fov: 75,
          aspect: dimensions.width / dimensions.height,
          near: 0.1,
          far: 100,
          zoom: 1.5 * 100,
        }}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 200ms ease-in-out',
        }}
      >
        <Suspense fallback={null}>
          <Physics>
            {/* <Blob position={[0, 1, 0]} scale={[2, 2, 2]} /> */}
            {/* <Bunny /> */}
            <Shader />
          </Physics>
        </Suspense>
        <Lighting />

        <OrbitControls enableDamping />
      </Canvas>

      <Loader />
    </>
  )
}

export default App
