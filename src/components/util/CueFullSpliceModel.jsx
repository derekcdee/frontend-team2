import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function CueFullSpliceModel(props) {
  const { nodes, materials } = useGLTF('/FullSpliceModel.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ferrule.geometry}
        material={materials['High Gloss Plastic']}
        position={[0, 97.833, 171.136]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 941.157, 15]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shaft_Collar_Ring.geometry}
        material={materials['Mother of Pearl']}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shaft_Collar.geometry}
        material={materials['Metalic Paint']}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shaft.geometry}
        material={materials['Maple-Birdseye']}
        position={[0, 97.833, 0.61]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 769.062, 15]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tip.geometry}
        material={materials['Composite Rubber']}
        position={[0, 97.833, 58.233]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 827.78, 15]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bumper.geometry}
        material={materials['Composite Rubber']}
        position={[0, 97.833, 707.089]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[10, 1.768, 10]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Butt_Cap.geometry}
        material={materials['Composite Rubber']}
        position={[0, 97.833, -36.13]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15.78, 736.5, 15.78]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Joint_Collar.geometry}
        material={materials.Jewelry}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Joint_Collar_Ring.geometry}
        material={materials['Mother of Pearl']}
        position={[0, 97.833, 0.497]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 720.002, 15]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Butt_Cap_Ring.geometry}
        material={materials['Mother of Pearl']}
        position={[0, 97.833, 650.912]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[22.84, 720.002, 22.84]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.JMCC_Logo.geometry}
        material={materials['JMCC White Logo']}
        position={[0.182, 111.457, 686.798]}
        scale={[12.5, 1, 12.5]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Handle.geometry}
        material={materials['Ebony-Gaboon']}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[16, 736.5, 16]}
        frustumCulled={false}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Forearm.geometry}
        material={materials['Maple-Birdseye']}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
        frustumCulled={false}
      />
    </group>
  )
}

useGLTF.preload('/FullSpliceModel.glb')
