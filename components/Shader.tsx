import { useRef, useState, useMemo } from 'react'
import { Plane } from '@react-three/drei'
import { Displace as DisplaceType } from 'lamina/vanilla'
import { DisplaceProps } from 'lamina/types'
import { Canvas, useFrame } from '@react-three/fiber'
import { Depth, Displace, Fresnel, LayerMaterial } from 'lamina'
import { MathUtils, Mesh, Vector3 } from 'three'
import vertex from '@/shaders/vertex.glsl'
import fragment from '@/shaders/fragment.glsl'

export default function Shader(props: any) {
  const ref = useRef<any>(null!)
  const rand = useMemo(() => Math.random(), [])
  const strength = useRef(0.5)
  const displaceRef = useRef<DisplaceType & { strength: number; offset: Vector3 }>(null!)

  useFrame(({ clock, mouse }, dt) => {
    console.log(Math.sin(mouse.x))
    ref.current.rotation.x = mouse.y / 4 //Math.sin(clock.elapsedTime + rand * 100) * 0.1 - 0.2
    ref.current.rotation.y = mouse.x / 4 //Math.sin(clock.elapsedTime + rand * 100) * 0.1 - 0.2
    ref.current.position.x = Math.sin(mouse.x)

    if (displaceRef.current.strength !== strength.current) {
      displaceRef.current.strength = MathUtils.lerp(
        displaceRef.current.strength, //
        strength.current,
        0.1
      )
    }

    if (strength.current > 0) {
      displaceRef.current.offset.x += 1 / ((Math.sin(mouse.x) || 0.001) * 1000)
    }
  })

  return (
    <mesh {...props} ref={ref} scale={1}>
      <Plane
        args={[3, 3, 1]}
        position={[0, 0, -1]}
        castShadow
        // onPointerEnter={() => (strength.current = 0.8)}
        // onPointerLeave={() => (strength.current = 0.5)}
        ref={ref}
        // args={[0.4, 128, 128]}
      >
        <LayerMaterial
          color={'#ffffff'}
          lighting={'physical'}
          transmission={1}
          roughness={0.6}
          thickness={2}
        >
          <Depth
            near={0.4854}
            far={0.7661999999999932}
            origin={[-0.4920000000000004, 0.4250000000000003, 0]}
            colorA={'#ff8b38'}
            colorB={'#eff97e'}
          />
          <Displace ref={displaceRef} strength={0} scale={6} offset={[0, 0, 0]} />
          <Fresnel
            color={'#fefefe'}
            bias={-0.3430000000000002}
            intensity={3.8999999999999946}
            power={3.3699999999999903}
            factor={1.119999999999999}
            mode={'screen'}
          />
        </LayerMaterial>
      </Plane>
      <Material />
    </mesh>
  )
}

function Material() {
  return <meshStandardMaterial color={'cyan'} />
}
