import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Depth, Fresnel, LayerMaterial, Noise } from 'lamina'
import { useSphere } from '@react-three/cannon'

export default function Bunny(props: any) {
  const model = useGLTF('/lighting_bunny_copy.gltf') as any
  const group = useRef()

  const [ref] = useSphere(() => ({}))

  return (
    // @ts-ignore
    <group ref={group} dispose={null}>
      {/* @ts-ignore */}
      <mesh ref={ref} scale={0.01} castShadow receiveShadow geometry={model?.nodes?.Bunny.geometry}>
        {/* @ts-ignore */}
        <LayerMaterial color={'#718EFF'} lighting={'physical'} envMapIntensity={0.3}>
          <Depth
            near={1.14}
            far={0.5}
            origin={[0, -0.43700000000000017, 0]}
            colorA={'#7d97fe'}
            colorB={'#ebebeb'}
          />
          <Depth
            far={1.7}
            origin={[0, 1, 0]}
            colorA={'#5688ee'}
            colorB={'#fefefe'}
            alpha={0.7}
            mode={'multiply'}
          />
          <Depth
            near={1.14}
            far={0.9449999999999992}
            origin={[0.5200000000000002, -0.2900000000000002, -0.18999999999999995]}
            colorA={'#f1f1f1'}
            colorB={'#fe7ef5'}
            alpha={0.7}
            mode={'multiply'}
          />
          <Fresnel color={'#f77f7f'} mode={'screen'} />
          <Noise
            colorA={'#fefefe'}
            colorB={'#a8a8a8'}
            colorC={'#fefefe'}
            colorD={'#fefefe'}
            alpha={0.59}
            scale={0.016999999999999977}
            offset={[0, 0, 0]}
            name={'noise'}
            mode={'subtract'}
          />
        </LayerMaterial>
      </mesh>
    </group>
  )
}

useGLTF.preload('/lighting_bunny_copy.gltf')
