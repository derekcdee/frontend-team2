
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function StandardCue_v2(props) {
  const { nodes, materials } = useGLTF('/StandardCue_v2-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Ferrule.geometry} material={materials.PaletteMaterial001} position={[0, 97.833, 397.256]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 941.157, 15]} />
      <mesh geometry={nodes.Shaft_Collar_Ring.geometry} material={materials.PaletteMaterial002} position={[0, 97.833, -10.981]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 777.387, 15]} />
      <mesh geometry={nodes.Shaft_Collar.geometry} material={materials.PaletteMaterial003} position={[0, 97.833, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 736.5, 15]} />
      <mesh geometry={nodes.Shaft.geometry} material={materials['Maple-Birdseye']} position={[0, 97.833, -4.029]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 530.387, 15]} />
      <mesh geometry={nodes.Tip.geometry} material={materials.PaletteMaterial004} position={[0, 97.833, 284.353]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 827.78, 15]} />
      <mesh geometry={nodes.Forearm.geometry} material={materials['Bubinga-Figured']} position={[0, 97.833, -2.047]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 785.575, 15]} />
      <mesh geometry={nodes.Handle.geometry} material={materials['Pig Black']} position={[0, 97.833, 74.957]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 594.272, 15]} />
      <mesh geometry={nodes.Joint_Collar.geometry} material={materials.PaletteMaterial005} position={[0, 97.833, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 736.5, 15]} />
      <mesh geometry={nodes.JMCC_Logo.geometry} material={materials['JMCC White Logo']} position={[0.182, 110.736, 686.798]} scale={[12.5, 1, 12.5]} />
    </group>
  )
}

useGLTF.preload('/StandardCue_v2-transformed.glb')
