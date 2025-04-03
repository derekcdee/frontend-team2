import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CueModelOne(props) {
  const { nodes, materials } = useGLTF('/CueModel_v1.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ferrule.geometry}
        material={materials['Material.002']}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shaft_Collar_Ring.geometry}
        material={materials.Black}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shaft_Collar.geometry}
        material={materials['Material.003']}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shaft_of_Cue.geometry}
        material={materials.Canarywood}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tip.geometry}
        material={materials.Black}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bumper_Part_2.geometry}
        material={materials.Black}
        position={[0, 97.833, 743.219]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[10, 1.768, 10]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bumper_Part1.geometry}
        material={materials.Black}
        position={[0, 97.833, 739]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[14, 2.5, 14]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Butt_Cap_1.geometry}
        material={nodes.Butt_Cap_1.material}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Butt_Sleeve.geometry}
        material={materials.Purpleheart}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Forearm.geometry}
        material={materials.Canarywood}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Handle.geometry}
        material={materials['Ebony-Striped']}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Joint_Collar.geometry}
        material={materials['Light Brown']}
        position={[0, 97.833, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 736.5, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Joint_Collar_Ring.geometry}
        material={materials.Black}
        position={[0, 97.833, 0.497]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 720.002, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Butt_Cap_Ring.geometry}
        material={materials.Black}
        position={[0, 97.833, 687.009]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[21.85, 720.002, 21.85]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Handle_Ring_1.geometry}
        material={materials.Black}
        position={[0, 97.833, 620.745]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[21.009, 720.002, 21.009]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Handle_Ring_2.geometry}
        material={materials.Black}
        position={[0, 97.833, 268.568]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[17.648, 720.002, 17.648]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Joint_Pin.geometry}
        material={materials['Material.005']}
        position={[0, 97.833, -19.839]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[2.5, 1, 2.5]}
      />
    </group>
  )
}

useGLTF.preload('/CueModel_v1.glb')
