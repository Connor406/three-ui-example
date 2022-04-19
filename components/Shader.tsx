import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import vertex from '@/shaders/vertex.glsl'
import fragment from '@/shaders/fragment.glsl'

export default function Shader(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<any>()

  useFrame(({ mouse }) => {
    console.log(mouse.x)
    ref.current.rotation.y = mouse.x
    ref.current.rotation.x = -mouse.y
  })

  return (
    <mesh {...props} ref={ref} scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <Material />
    </mesh>
  )
}

function Material() {
  return <meshStandardMaterial color={'cyan'} />
}
