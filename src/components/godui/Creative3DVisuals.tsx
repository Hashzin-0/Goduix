import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';

type ThreeRenderSettings = { geometryScale?: number; modelScale?: number; rotationSpeed?: number; cameraDistance?: number; cameraFov?: number; ambientIntensity?: number; keyLightIntensity?: number; metalness?: number; roughness?: number; wireframe?: boolean; exposure?: number; fluidAmplitude?: number; fluidSpeed?: number; pixelRatio?: number };
type BaseProps = { accent?: string; label?: string } & ThreeRenderSettings;
const frame = 'relative isolate w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080b13] text-white shadow-xl';
const fieldLabel = 'text-[11px] uppercase tracking-[.16em] text-white/50';
function VisualHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="relative z-10 px-4 pt-4 sm:px-5"><p className={fieldLabel}>{eyebrow}</p><h3 className="mt-1 text-base font-semibold tracking-tight">{title}</h3><p className="mt-1 max-w-xl text-xs leading-relaxed text-white/55">{description}</p></div>;
}

type SceneKind = 'product' | 'diorama' | 'hologram' | 'fluid';
function ThreeScene({ kind, accent = '#67e8f9', label, geometryScale = 1, rotationSpeed = 0.0025, cameraDistance = 7.6, cameraFov = 35, ambientIntensity = 2.2, keyLightIntensity = 3.2, metalness = 0.3, roughness = 0.25, wireframe = false, exposure = 1.1, fluidAmplitude = 0.16, fluidSpeed = 1, pixelRatio = 1.5 }: { kind: SceneKind; accent?: string; label: string } & ThreeRenderSettings) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const host = hostRef.current; if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, Math.max(0.75, Math.min(2, pixelRatio))));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = exposure;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(cameraFov, host.clientWidth / Math.max(1, host.clientHeight), .1, 100);
    camera.position.set(0, 2.6, cameraDistance);
    const root = new THREE.Group(); scene.add(root);
    let fluidGeometry: THREE.PlaneGeometry | null = null;
    let fluidBase: Float32Array | null = null;
    scene.add(new THREE.HemisphereLight(0xdceeff, 0x15192e, ambientIntensity));
    const key = new THREE.DirectionalLight(0xffffff, keyLightIntensity); key.position.set(4, 7, 5); scene.add(key);
    const rim = new THREE.PointLight(new THREE.Color(accent), 20, 14); rim.position.set(-3, 2, -2); scene.add(rim);
    const mat = (color: string, materialMetalness = metalness, materialRoughness = roughness) => new THREE.MeshStandardMaterial({ color, metalness: materialMetalness, roughness: materialRoughness, wireframe });
    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, position: [number, number, number], scale?: [number, number, number]) => { const mesh = new THREE.Mesh(geometry, material); mesh.position.set(...position); if (scale) mesh.scale.set(...scale); mesh.castShadow = true; mesh.receiveShadow = true; root.add(mesh); return mesh; };
    if (kind === 'product') {
      add(new THREE.CylinderGeometry(.76, .83, 1.75, 64, 1, false), mat('#dbeafe', .72, .18), [0, .05, 0]);
      add(new THREE.CylinderGeometry(.36, .38, .3, 48), mat('#94a3b8', .85, .16), [0, 1.05, 0]);
      add(new THREE.CylinderGeometry(.3, .3, .34, 48), mat('#111827', .72, .22), [0, 1.35, 0]);
      add(new THREE.TorusGeometry(.62, .035, 12, 72), mat(accent, .55, .2), [0, .18, .74]).rotation.x = Math.PI / 2;
      add(new THREE.BoxGeometry(.88, .52, .06), mat(accent, .2, .3), [0, .08, .79]);
      add(new THREE.TorusGeometry(.18, .035, 12, 48), mat('#ffffff', .7, .2), [0, 1.55, 0]);
    } else if (kind === 'diorama') {
      add(new THREE.BoxGeometry(4.3, .3, 3.4), mat('#1e293b', .15, .7), [0, -.85, 0]);
      add(new THREE.BoxGeometry(1.15, 1.2, 1.05), mat('#d1d5db', .1, .8), [-.85, -.1, -.25]);
      add(new THREE.ConeGeometry(.86, .85, 4), mat(accent, .15, .45), [-.85, .93, -.25]).rotation.y = Math.PI / 4;
      add(new THREE.BoxGeometry(.8, .85, .8), mat('#475569', .15, .65), [.65, -.28, -.6]);
      add(new THREE.BoxGeometry(.8, .7, .8), mat('#64748b', .15, .65), [.65, -.35, .35]);
      for (let i = 0; i < 5; i++) { const x = -1.6 + i * .78; add(new THREE.CylinderGeometry(.045, .055, .55, 8), mat('#a16207', .05, .9), [x, -.28, 1.05]); add(new THREE.SphereGeometry(.27, 12, 10), mat(i % 2 ? '#34d399' : '#86efac', .05, .8), [x, .08, 1.05]); }
      add(new THREE.TorusGeometry(.4, .045, 8, 48), mat('#fbbf24', .55, .2), [1.3, .3, .65]).rotation.x = Math.PI / 2;
    } else if (kind === 'fluid') {
      fluidGeometry = new THREE.PlaneGeometry(4.4, 3.2, 80, 60);
      fluidGeometry.rotateX(-Math.PI / 2);
      fluidBase = (fluidGeometry.attributes.position.array as Float32Array).slice();
      const surface = add(fluidGeometry, new THREE.MeshStandardMaterial({ color: accent, metalness: .48, roughness: .2, side: THREE.DoubleSide }), [0, -.2, 0]);
      surface.receiveShadow = true;
      add(new THREE.TorusGeometry(1.45, .018, 8, 96), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: .55, wireframe }), [0, -.12, 0]).rotation.x = Math.PI / 2;
      add(new THREE.TorusGeometry(1.9, .012, 8, 96), new THREE.MeshBasicMaterial({ color: '#a5f3fc', transparent: true, opacity: .28, wireframe }), [0, -.14, 0]).rotation.x = Math.PI / 2;
    } else {
      const geometry = new THREE.IcosahedronGeometry(1.35, 3);
      const wire = new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: .8 });
      add(geometry, wire, [0, 0, 0]);
      const points = new THREE.Points(geometry, new THREE.PointsMaterial({ color: '#ffffff', size: .035, sizeAttenuation: true })); root.add(points);
      for (let i = 0; i < 3; i++) { const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8 + i * .16, .012, 6, 100), new THREE.MeshBasicMaterial({ color: i % 2 ? '#a78bfa' : accent, transparent: true, opacity: .75 })); ring.rotation.set(.4 + i * .65, .3 + i * .35, i * .45); root.add(ring); }
    }
    const floor = new THREE.Mesh(new THREE.CircleGeometry(2.7, 64), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: .07 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -1.03; scene.add(floor);
    let frameId = 0, dragging = false, lastX = 0, lastY = 0, rotateX = -.08, rotateY = .18;
    root.scale.setScalar(Math.max(0.25, Math.min(3, geometryScale)));
    const startedAt = performance.now();
    const render = () => { if (kind === 'fluid' && fluidGeometry && fluidBase && !reducedMotion) { const position = fluidGeometry.attributes.position as THREE.BufferAttribute; const t = (performance.now() - startedAt) * .001; for (let i = 0; i < position.count; i++) position.setY(i, Math.sin(fluidBase[i * 3] * 1.8 + t * fluidSpeed) * Math.cos(fluidBase[i * 3 + 2] * 1.5 - t * .7 * fluidSpeed) * fluidAmplitude); position.needsUpdate = true; fluidGeometry.computeVertexNormals(); } if (!dragging && !reducedMotion) rotateY += rotationSpeed; root.rotation.y = rotateY; root.rotation.x = rotateX; renderer.render(scene, camera); if (!reducedMotion) frameId = requestAnimationFrame(render); };
    render();
    const resize = () => { if (!host) return; camera.aspect = host.clientWidth / Math.max(1, host.clientHeight); camera.updateProjectionMatrix(); renderer.setSize(host.clientWidth, host.clientHeight); if (reducedMotion) renderer.render(scene, camera); };
    const observer = new ResizeObserver(resize); observer.observe(host);
    const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; renderer.domElement.setPointerCapture?.(e.pointerId); };
    const move = (e: PointerEvent) => { if (!dragging) return; rotateY += (e.clientX - lastX) * .008; rotateX = Math.max(-.8, Math.min(.8, rotateX + (e.clientY - lastY) * .006)); lastX = e.clientX; lastY = e.clientY; if (reducedMotion) { root.rotation.set(rotateX, rotateY, 0); renderer.render(scene, camera); } };
    const up = () => { dragging = false; };
    const wheel = (e: WheelEvent) => { camera.position.z = Math.max(4.5, Math.min(10, camera.position.z + e.deltaY * .005)); camera.updateProjectionMatrix(); if (reducedMotion) renderer.render(scene, camera); };
    renderer.domElement.addEventListener('pointerdown', down); renderer.domElement.addEventListener('pointermove', move); window.addEventListener('pointerup', up); renderer.domElement.addEventListener('wheel', wheel, { passive: true });
    return () => { cancelAnimationFrame(frameId); observer.disconnect(); renderer.domElement.removeEventListener('pointerdown', down); renderer.domElement.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); renderer.domElement.removeEventListener('wheel', wheel); scene.traverse(object => { if (object instanceof THREE.Mesh || object instanceof THREE.Points) { object.geometry.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach(material => material.dispose()); } }); renderer.dispose(); renderer.domElement.remove(); };
  }, [kind, accent, reducedMotion, geometryScale, rotationSpeed, cameraDistance, cameraFov, ambientIntensity, keyLightIntensity, metalness, roughness, wireframe, exposure, fluidAmplitude, fluidSpeed, pixelRatio]);
  return <section className={frame}><VisualHeader eyebrow="3D / WEBGL SCENE" title={label} description="Cena Three.js real, com geometria, materiais, iluminação, rotação por arraste e zoom pela roda ou gesto equivalente."/><div ref={hostRef} className="h-72 w-full cursor-grab touch-pan-y active:cursor-grabbing" role="img" aria-label={label}/><p className="px-4 pb-3 text-[10px] text-white/40">Arraste para orbitar · role para aproximar</p></section>;
}
export function ProductObject3D(props: BaseProps) { return <ThreeScene kind="product" accent={props.accent ?? '#67e8f9'} label={props.label ?? 'Vitrine de objeto 3D'} {...props}/>; }
export function Diorama3D(props: BaseProps) { return <ThreeScene kind="diorama" accent={props.accent ?? '#4ade80'} label={props.label ?? 'Diorama 3D'} {...props}/>; }
export function Holographic3D(props: BaseProps) { return <ThreeScene kind="hologram" accent={props.accent ?? '#a78bfa'} label={props.label ?? 'Holograma geométrico 3D'} {...props}/>; }
export function FluidSurface3D(props: BaseProps) { return <ThreeScene kind="fluid" accent={props.accent ?? '#67e8f9'} label={props.label ?? 'Superfície fluida 3D'} {...props}/>; }


export function UploadedModelViewer3D({ accent = '#67e8f9', label = 'Visualizador de modelo 3D', modelScale = 1, rotationSpeed = 0.0015, cameraDistance = 4.5, cameraFov = 40, ambientIntensity = 2.2, keyLightIntensity = 3, exposure = 1.1, pixelRatio = 1.5, wireframe = false }: BaseProps) {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !modelUrl) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { setError('Este navegador não disponibilizou WebGL.'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, Math.max(0.75, Math.min(2, pixelRatio))));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = exposure;
    host.replaceChildren(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(cameraFov, host.clientWidth / Math.max(1, host.clientHeight), .01, 1000);
    camera.position.set(0, 1.3, cameraDistance);
    scene.add(new THREE.HemisphereLight(0xe2efff, 0x20243a, ambientIntensity));
    const key = new THREE.DirectionalLight(0xffffff, keyLightIntensity); key.position.set(4, 7, 5); scene.add(key);
    const rim = new THREE.PointLight(new THREE.Color(accent), 14, 18); rim.position.set(-3, 2, -2); scene.add(rim);
    const root = new THREE.Group(); scene.add(root);
    let model: THREE.Object3D | null = null, raf = 0, dragging = false, lastX = 0, lastY = 0, rotX = 0, rotY = 0;
    let cancelled = false;
    setLoaded(false); setError('');
    import('three/addons/loaders/GLTFLoader.js').then(({ GLTFLoader }) => {
      if (cancelled) return;
      const loader = new GLTFLoader();
      loader.load(modelUrl, gltf => {
        if (cancelled) { gltf.scene.traverse(object=>{if(object instanceof THREE.Mesh){object.geometry.dispose();const mats=Array.isArray(object.material)?object.material:[object.material];mats.forEach(m=>m.dispose());}}); return; }
        model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const maxAxis = Math.max(size.x,size.y,size.z) || 1;
        model.scale.setScalar((2.2/maxAxis) * Math.max(0.1, Math.min(4, modelScale)));
        model.position.sub(center.multiplyScalar(2.2/maxAxis));
        root.add(model);
        setLoaded(true);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) renderer.render(scene,camera);
      }, undefined, () => setError('Não foi possível abrir este GLB. Verifique se o arquivo é válido e tente novamente.'));
    }).catch(() => setError('Não foi possível iniciar o carregador GLB.'));
    const floor = new THREE.GridHelper(4, 20, new THREE.Color(accent), new THREE.Color('#334155')); floor.position.y = -1.15; scene.add(floor);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw = () => { if (!dragging && !reduce && model) rotY += rotationSpeed; root.rotation.set(rotX,rotY,0); if (wireframe && model) model.traverse(object => { if (object instanceof THREE.Mesh) { const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach(material => { if ('wireframe' in material) (material as THREE.MeshStandardMaterial).wireframe = true; }); } }); renderer.render(scene,camera); if (!reduce) raf=requestAnimationFrame(draw); };
    draw();
    const resize=()=>{camera.aspect=host.clientWidth/Math.max(1,host.clientHeight);camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight);if(reduce)renderer.render(scene,camera);};
    const observer=new ResizeObserver(resize);observer.observe(host);
    const down=(e:PointerEvent)=>{dragging=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);};
    const move=(e:PointerEvent)=>{if(!dragging)return;rotY+=(e.clientX-lastX)*.008;rotX=Math.max(-1,Math.min(1,rotX+(e.clientY-lastY)*.006));lastX=e.clientX;lastY=e.clientY;if(reduce){root.rotation.set(rotX,rotY,0);renderer.render(scene,camera);}};
    const up=()=>{dragging=false;};
    const wheel=(e:WheelEvent)=>{camera.position.z=Math.max(1.8,Math.min(10,camera.position.z+e.deltaY*.004));camera.updateProjectionMatrix();if(reduce)renderer.render(scene,camera);};
    renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);window.addEventListener('pointerup',up);renderer.domElement.addEventListener('wheel',wheel,{passive:true});
    return()=>{cancelled=true;cancelAnimationFrame(raf);observer.disconnect();renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);renderer.domElement.removeEventListener('wheel',wheel);scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Points){object.geometry.dispose();const mats=Array.isArray(object.material)?object.material:[object.material];mats.forEach(m=>m.dispose());}});renderer.dispose();renderer.domElement.remove();URL.revokeObjectURL(modelUrl);};
  },[modelUrl,accent,modelScale,rotationSpeed,cameraDistance,cameraFov,ambientIntensity,keyLightIntensity,exposure,pixelRatio,wireframe]);
  const onFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    if (!file.name.toLowerCase().endsWith('.glb')) { setError('Selecione um arquivo .glb autocontido.'); event.target.value=''; return; }
    setError(''); setLoaded(false); setFileName(file.name); setModelUrl(URL.createObjectURL(file));
  };
  return <section className={frame}><VisualHeader eyebrow="3D / GLB MODEL VIEWER" title={label} description="Carregue um modelo GLB real do seu dispositivo. Nenhum modelo fictício é inserido automaticamente."/>
    <div ref={hostRef} className="mt-3 h-72 w-full cursor-grab touch-pan-y active:cursor-grabbing" role="img" aria-label={label}/>
    <div className="flex flex-wrap items-center gap-3 border-t border-white/10 p-4">
      <input ref={inputRef} type="file" accept=".glb,model/gltf-binary" onChange={onFile} className="sr-only" aria-label="Selecionar arquivo GLB"/>
      <button type="button" onClick={()=>inputRef.current?.click()} className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/15">Carregar arquivo GLB</button>
      <span className="min-w-0 flex-1 truncate text-xs text-white/50">{fileName || 'Nenhum modelo carregado'}</span>
      {loaded && <span className="text-xs text-emerald-300" role="status">Modelo carregado</span>}
    </div>
    {error && <p className="px-4 pb-3 text-xs text-rose-300" role="alert">{error}</p>}
  </section>;
}
