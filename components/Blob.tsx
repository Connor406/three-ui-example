import { Sphere } from '@react-three/drei'
import { GroupProps, useFrame, useThree } from '@react-three/fiber'
import { Physics, useSphere } from '@react-three/cannon'
import { Depth, Displace, Fresnel, LayerMaterial } from 'lamina'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { MathUtils, Mesh, Vector3 } from 'three'
import { Displace as DisplaceType } from 'lamina/vanilla'
import { DisplaceProps } from 'lamina/types'

export default function Blob({
  // setLoaded,
  displaceProps,
  ...props
}: GroupProps & {
  displaceProps?: DisplaceProps
  // setLoaded: any
}) {
  const ref = useRef<Mesh>(null!)
  const rand = useMemo(() => Math.random(), [])
  const strength = useRef(0.05)
  const displaceRef = useRef<DisplaceType & { strength: number; offset: Vector3 }>(null!)

  useFrame(({ clock, mouse }, dt) => {
    console.log(mouse)
    ref.current.position.y = Math.sin(clock.elapsedTime + rand * 100) * 0.1 - 0.2

    if (displaceRef.current.strength !== strength.current) {
      displaceRef.current.strength = MathUtils.lerp(
        displaceRef.current.strength, //
        strength.current,
        0.1
      )
    }

    if (strength.current > 0) {
      displaceRef.current.offset.x += 0.3 * dt
    }
  })

  // useLayoutEffect(() => {
  //   setLoaded(true)
  // }, [])

  return (
    <group {...props}>
      <Physics gravity={[10, -50, 50]} defaultContactMaterial={{ restitution: 0.5 }}>
        <Sphere
          castShadow
          onPointerEnter={() => (strength.current = 0.8)}
          onPointerLeave={() => (strength.current = 0.05)}
          ref={ref}
          args={[0.4, 128, 128]}
        >
          <LayerMaterial
            color={'#ffffff'}
            lighting={'physical'}
            transmission={1}
            roughness={0.1}
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
            {/* <Fresnel
              color={'#fefefe'}
              bias={-0.3430000000000002}
              intensity={3.8999999999999946}
              power={3.3699999999999903}
              factor={1.119999999999999}
              mode={'screen'}
            /> */}
          </LayerMaterial>
        </Sphere>
      </Physics>
    </group>
  )
}

// function Mouse() {
//   const { viewport } = useThree()
//   const [, api] = useSphere(() => ({ type: 'Kinematic', args: [6] }))
//   return useFrame((state) => {
//     api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 7)
//   })
// }
