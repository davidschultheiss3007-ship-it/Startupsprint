import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Punkte gleichmäßig auf einer Kugel verteilen (Fibonacci-Sphere)
function fibonacciSphere(count, radius) {
  const points = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius))
  }
  return points
}

// Verbindungen zwischen nahe gelegenen Knoten – das "Netzwerk"
function buildEdges(points, maxDist) {
  const positions = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (points[i].distanceTo(points[j]) < maxDist) {
        positions.push(...points[i].toArray(), ...points[j].toArray())
      }
    }
  }
  return new Float32Array(positions)
}

function Network({ animate, nodeCount }) {
  const group = useRef()
  const hubs = useRef()

  const { nodes, edges, hubPositions } = useMemo(() => {
    const pts = fibonacciSphere(nodeCount, 1.6)
    const nodeArr = new Float32Array(pts.flatMap((p) => p.toArray()))
    // Einige Knoten als hervorgehobene "Partner" markieren
    const hubArr = new Float32Array(pts.filter((_, i) => i % 11 === 0).flatMap((p) => p.toArray()))
    return { nodes: nodeArr, edges: buildEdges(pts, 0.62), hubPositions: hubArr }
  }, [nodeCount])

  useFrame((state, delta) => {
    if (!animate || !group.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
    if (hubs.current) {
      hubs.current.material.size = 0.11 + Math.sin(state.clock.elapsedTime * 2) * 0.025
    }
  })

  return (
    <group ref={group} rotation={[0.3, 0, 0.1]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.045} sizeAttenuation transparent opacity={0.85} />
      </points>
      <points ref={hubs}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ff3b4f" size={0.11} sizeAttenuation transparent opacity={0.95} />
      </points>
    </group>
  )
}

/**
 * Rotierender 3D-Netzwerk-Globus (Three.js via React Three Fiber).
 * `active` pausiert das Rendering, wenn der Bereich nicht sichtbar ist (Akku/Performance).
 */
export default function NetworkGlobe({ active = true, reducedMotion = false }) {
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 768
  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 45 }}
      dpr={[1, isSmall ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={active && !reducedMotion ? 'always' : 'demand'}
      aria-hidden="true"
    >
      <Network animate={!reducedMotion} nodeCount={isSmall ? 140 : 220} />
    </Canvas>
  )
}
