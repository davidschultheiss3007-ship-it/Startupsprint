import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { sceneState } from '../motion'

const BG = '#F6F4EF'
const ACCENT = '#E8A13A'
const BASE = new THREE.Color('#D9D4CA')
const HIGHLIGHT = new THREE.Color('#F0B85E')

// Kleiner, fester Zufallsgenerator – jede Ladung sieht gleich aus.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (v: number) => {
  const x = clamp01(v)
  return x * x * (3 - 2 * x)
}
const band = (v: number, a: number, b: number) => smooth((v - a) / (b - a))

function gearGeometry() {
  const shape = new THREE.Shape()
  const teeth = 10
  const rOut = 0.42
  const rIn = 0.33
  for (let i = 0; i < teeth * 2; i++) {
    const a0 = (i / (teeth * 2)) * Math.PI * 2
    const a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2
    const r = i % 2 === 0 ? rOut : rIn
    if (i === 0) shape.moveTo(Math.cos(a0) * r, Math.sin(a0) * r)
    else shape.lineTo(Math.cos(a0) * r, Math.sin(a0) * r)
    shape.lineTo(Math.cos(a1) * r, Math.sin(a1) * r)
  }
  const hole = new THREE.Path()
  hole.absarc(0, 0, 0.12, 0, Math.PI * 2, true)
  shape.holes.push(hole)
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: false })
  geo.center()
  return geo
}

// Generische Sammlerstücke ohne Marken: Karte, Spielmodul, Scheibe, Reifen, Zahnrad, Würfel.
function makeGeometries() {
  return [
    new THREE.BoxGeometry(0.62, 0.88, 0.03),
    new THREE.BoxGeometry(0.9, 0.62, 0.16),
    new THREE.CylinderGeometry(0.42, 0.42, 0.06, 28).rotateX(Math.PI / 2),
    new THREE.TorusGeometry(0.3, 0.12, 10, 24),
    gearGeometry(),
    new THREE.IcosahedronGeometry(0.34, 0),
  ]
}

type Item = {
  cloud: THREE.Vector3
  scatter: THREE.Vector3
  ringAngle: number
  ringRadius: number
  ringY: number
  rot: THREE.Euler
  spin: THREE.Vector2
  scale: number
  phase: number
  tint: number
}

// Vorne in der Mitte bleibt Platz für Text und Fundstück; nichts klebt an der Kamera.
function keepClear(v: THREE.Vector3, rand: () => number) {
  if (v.z > -0.8 && Math.abs(v.x) < 3.8 && Math.abs(v.y) < 3.4) v.z = -1.2 - rand() * 3.5
  v.z = Math.min(v.z, 2.6)
  return v
}

function makeItems(count: number, rand: () => number): Item[] {
  const items: Item[] = []
  for (let i = 0; i < count; i++) {
    const dir = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1)
    if (dir.lengthSq() < 0.01) dir.set(1, 0, 0)
    dir.normalize()
    const r = 2.4 + rand() * 5.6
    const cloud = keepClear(dir.clone().multiplyScalar(r), rand)
    cloud.y *= 0.8
    const scatter = keepClear(
      cloud
        .clone()
        .multiplyScalar(1.7 + rand() * 0.6)
        .add(new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(3)),
      rand,
    )
    items.push({
      cloud,
      scatter,
      ringAngle: rand() * Math.PI * 2,
      ringRadius: 2.3 + rand() * 1.9,
      ringY: (rand() - 0.5) * 0.9,
      rot: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
      spin: new THREE.Vector2((rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6),
      scale: 0.55 + rand() * 0.45,
      phase: rand() * Math.PI * 2,
      tint: (rand() - 0.5) * 0.12,
    })
  }
  return items
}

// Geglättete Scroll-Werte, damit nichts springt.
const smoothed = { hero: 0, problem: 0, steps: 0, gather: 0, px: 0, py: 0 }

function useSmoothedState() {
  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 5)
    smoothed.hero += (sceneState.hero - smoothed.hero) * k
    smoothed.problem += (sceneState.problem - smoothed.problem) * k
    smoothed.steps += (sceneState.steps - smoothed.steps) * k
    smoothed.gather += (sceneState.gather - smoothed.gather) * k
    const kp = 1 - Math.exp(-dt * 2.5)
    smoothed.px += (sceneState.pointer.x - smoothed.px) * kp
    smoothed.py += (sceneState.pointer.y - smoothed.py) * kp
  }, -1)
}

// Wo das Fundstück je nach Bildschirmformat steht.
function anchors(aspect: number) {
  const mobile = aspect < 0.85
  return {
    mobile,
    hero: mobile ? new THREE.Vector3(0.55, 2.25, 0.8) : new THREE.Vector3(2.7, -0.1, 1),
    lost: new THREE.Vector3(0.8, 0.6, -7),
    found: mobile ? new THREE.Vector3(0, 0.55, 1) : new THREE.Vector3(2.5, 0, 1.4),
    gather: mobile ? new THREE.Vector3(1.1, 3.1, -1.5) : new THREE.Vector3(2.8, 0, 0),
  }
}

const tmpObj = new THREE.Object3D()
const tmpVec = new THREE.Vector3()
const tmpColor = new THREE.Color()
const localCenter = new THREE.Vector3()
const gemTarget = new THREE.Vector3()

function Collectibles({ perKind, gemPos }: { perKind: number; gemPos: THREE.Vector3 }) {
  const geometries = useMemo(makeGeometries, [])
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.78, metalness: 0.05, flatShading: true }),
    [],
  )
  const groups = useMemo(() => {
    const rand = mulberry32(7)
    return geometries.map(() => makeItems(perKind, rand))
  }, [geometries, perKind])
  const meshes = useRef<Array<THREE.InstancedMesh | null>>([])
  const group = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    meshes.current.forEach((mesh, k) => {
      if (!mesh) return
      groups[k].forEach((it, i) => mesh.setColorAt(i, tmpColor.copy(BASE).offsetHSL(0, 0, it.tint)))
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    })
  }, [groups])

  useEffect(
    () => () => {
      geometries.forEach((g) => g.dispose())
      material.dispose()
    },
    [geometries, material],
  )

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const s = smoothed

    const scatterW = smooth(s.problem * 2.2) * (1 - band(s.steps, 0, 0.3))
    const scanW = band(s.steps, 0.3, 0.38) * (1 - band(s.steps, 0.64, 0.72))
    const ringW = smooth(s.gather)
    const scanRadius = ((s.steps - 0.33) / 0.33) * 10

    // Sanftes Pendeln statt Dauerdrehung, damit die Mitte frei bleibt.
    // In der Suchphase dreht die Wolke einmal mit dem Scrollen aus und zurück.
    const scanSpin = Math.sin(band(s.steps, 0.3, 0.66) * Math.PI) * 0.7
    g.rotation.y = Math.sin(t * 0.08) * 0.22 + scanSpin + s.px * 0.2
    g.rotation.x = -s.py * 0.12 + s.hero * 0.15

    g.updateMatrixWorld()
    localCenter.copy(gemPos)
    g.worldToLocal(localCenter)

    meshes.current.forEach((mesh, k) => {
      if (!mesh) return
      const items = groups[k]
      const updateColors = scanW > 0.001 || mesh.userData.lit
      for (let i = 0; i < items.length; i++) {
        const it = items[i]
        tmpVec.copy(it.cloud).lerp(it.scatter, scatterW)
        if (ringW > 0.001) {
          const a = it.ringAngle + t * 0.12
          const ring = tmpObj.position.set(
            localCenter.x + Math.cos(a) * it.ringRadius,
            localCenter.y + it.ringY + Math.sin(a) * it.ringRadius * 0.28,
            localCenter.z + Math.sin(a) * it.ringRadius,
          )
          tmpVec.lerp(ring, ringW)
        }
        tmpVec.y += Math.sin(t * 0.6 + it.phase) * 0.14
        tmpObj.position.copy(tmpVec)
        tmpObj.rotation.set(it.rot.x + t * it.spin.x, it.rot.y + t * it.spin.y, it.rot.z)
        tmpObj.scale.setScalar(it.scale)
        tmpObj.updateMatrix()
        mesh.setMatrixAt(i, tmpObj.matrix)

        // Such-Puls: Objekte leuchten kurz auf, wenn die Welle sie erreicht.
        if (updateColors) {
          const d = tmpVec.distanceTo(localCenter)
          const hit = scanW * Math.max(0, 1 - Math.abs(d - scanRadius) / 1.1)
          tmpColor.copy(BASE).offsetHSL(0, 0, it.tint).lerp(HIGHLIGHT, hit)
          mesh.setColorAt(i, tmpColor)
        }
      }
      mesh.userData.lit = scanW > 0.001
      mesh.instanceMatrix.needsUpdate = true
      if (updateColors && mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    })
  })

  return (
    <group ref={group}>
      {geometries.map((geo, k) => (
        <instancedMesh
          key={k}
          ref={(m) => {
            meshes.current[k] = m
          }}
          args={[geo, material, perKind]}
          frustumCulled={false}
        />
      ))}
    </group>
  )
}

function FoundObject({ gemPos }: { gemPos: THREE.Vector3 }) {
  const { camera, size } = useThree()
  const gem = useRef<THREE.Mesh>(null)
  const halo = useRef<THREE.Mesh>(null)
  const outline = useRef<THREE.LineSegments>(null)
  const sonar = useRef<THREE.Mesh>(null)

  const gemGeo = useMemo(() => new THREE.OctahedronGeometry(1, 0), [])
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1.08, 0)), [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const s = smoothed
    const a = anchors(size.width / size.height)

    const lostW = smooth(s.problem * 2.2)
    const foundW = band(s.steps, 0.64, 0.92)
    const wishW = band(s.steps, 0.02, 0.15) * (1 - band(s.steps, 0.8, 0.95))
    const scanW = band(s.steps, 0.3, 0.38) * (1 - band(s.steps, 0.64, 0.72))
    const gatherW = smooth(s.gather)

    gemTarget.copy(a.hero).lerp(a.lost, lostW).lerp(a.found, foundW).lerp(a.gather, gatherW)
    gemPos.lerp(gemTarget, 1 - Math.exp(-dt * 6))

    const baseScale = a.mobile ? 0.62 : 0.8
    const scale = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(baseScale, 0.22, lostW), baseScale * 1.15, foundW),
      baseScale * 0.85,
      gatherW,
    )

    if (gem.current) {
      gem.current.position.copy(gemPos)
      gem.current.position.y += Math.sin(t * 1.1) * 0.08
      sceneState.burst = Math.max(0, sceneState.burst - dt * 0.8)
      gem.current.rotation.y += dt * (0.5 + foundW * 0.8 + sceneState.burst * 9)
      gem.current.rotation.x = Math.sin(t * 0.5) * 0.25 + s.py * 0.3
      gem.current.rotation.z = s.px * 0.2
      gem.current.scale.setScalar(scale)
    }

    const haloW = Math.max(1 - lostW, foundW, gatherW)
    if (halo.current) {
      halo.current.position.copy(gemPos)
      halo.current.rotation.set(Math.PI / 2.4 + Math.sin(t * 0.4) * 0.1, t * 0.3, 0)
      halo.current.scale.setScalar(scale * 1.65)
      ;(halo.current.material as THREE.MeshBasicMaterial).opacity = 0.55 * haloW
    }

    if (outline.current) {
      outline.current.position.copy(a.found)
      outline.current.rotation.set(0, t * 0.25, 0)
      outline.current.scale.setScalar(baseScale * 1.15)
      ;(outline.current.material as THREE.LineBasicMaterial).opacity = 0.9 * wishW
      outline.current.visible = wishW > 0.001
    }

    if (sonar.current) {
      const r = clamp01((s.steps - 0.33) / 0.33) * 10
      sonar.current.position.copy(a.found)
      sonar.current.quaternion.copy(camera.quaternion)
      sonar.current.scale.setScalar(Math.max(0.01, r))
      ;(sonar.current.material as THREE.MeshBasicMaterial).opacity = 0.5 * scanW * (1 - r / 12)
      sonar.current.visible = scanW > 0.001
    }
  })

  return (
    <>
      <mesh ref={gem} geometry={gemGeo}>
        <meshPhysicalMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.18}
          roughness={0.12}
          metalness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.05}
          flatShading
        />
      </mesh>
      <mesh ref={halo}>
        <torusGeometry args={[1, 0.012, 8, 120]} />
        <meshBasicMaterial color={ACCENT} transparent depthWrite={false} />
      </mesh>
      <lineSegments ref={outline} geometry={edges}>
        <lineBasicMaterial color={ACCENT} transparent depthWrite={false} />
      </lineSegments>
      <mesh ref={sonar}>
        <ringGeometry args={[0.97, 1, 128]} />
        <meshBasicMaterial color={ACCENT} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

function Rig() {
  const { camera, gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.environmentIntensity = 0.55
    return () => {
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  useFrame(() => {
    const s = smoothed
    camera.position.x = s.px * 0.35
    camera.position.y = s.py * 0.25 - s.hero * 0.4
    camera.position.z = 10 - s.hero * 1.2 + band(s.steps, 0.3, 0.5) * 0.8 - band(s.steps, 0.6, 0.9) * 1
    camera.lookAt(0, 0, 0)
  })
  return null
}

function World() {
  const { size } = useThree()
  const [gemPos] = useState(() => anchors(size.width / size.height).hero.clone())
  const perKind = size.width < 700 ? 16 : 28
  useSmoothedState()
  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 7, 20]} />
      <hemisphereLight args={['#ffffff', '#d6ccbb', 1.6]} />
      <directionalLight position={[5, 8, 6]} intensity={1.8} />
      <directionalLight position={[-6, -2, 3]} intensity={0.5} color="#ffe2b8" />
      <Rig />
      <Collectibles perKind={perKind} gemPos={gemPos} />
      <FoundObject gemPos={gemPos} />
    </>
  )
}

export default function Scene({ onReady }: { onReady?: () => void }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 700
  return (
    <Canvas
      flat
      dpr={[1, mobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
    >
      <World />
    </Canvas>
  )
}
