import React from 'react'
import { useGLTF } from '@react-three/drei'

export function FullSpliceCue_v1(props) {
  const { nodes, materials } = useGLTF('/FullSpliceCue_v1-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Ferrule.geometry} material={materials.Material} position={[0.068, 97.727, -759.004]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 806.706, 15]} />
      <mesh geometry={nodes.Shaft_Collar_Ring.geometry} material={materials['Mother of Pearl']} position={[0, 97.833, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 736.5, 15]} />
      <mesh geometry={nodes.Shaft_Collar.geometry} material={materials['BioMed Clear Material 2']} position={[0, 97.833, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 736.5, 15]} />
      <mesh geometry={nodes.Shaft.geometry} material={materials['Maple-Birdseye']} position={[0, 97.833, 0.61]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 769.062, 15]} />
      <mesh geometry={nodes.Tip.geometry} material={materials['Composite Rubber']} position={[0, 97.833, 58.233]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 827.78, 15]} />
      <mesh geometry={nodes.Joint_Collar.geometry} material={materials.Wenge} position={[0, 97.833, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[15, 736.5, 15]} />
      <mesh geometry={nodes.JMCC_Logo.geometry} material={materials['JMCC White Logo']} position={[0.182, 111.457, 686.798]} scale={[12.5, 1, 12.5]} />
      <mesh geometry={nodes.Handle.geometry} material={materials['Walnut-Black']} position={[0, 97.833, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[16, 736.5, 16]} />
    </group>
  )
}

useGLTF.preload('/FullSpliceCue_v1-transformed.glb')
