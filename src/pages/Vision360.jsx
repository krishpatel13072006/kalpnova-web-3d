import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { portfolioItems } from '../data/portfolio';

const visionData = portfolioItems.slice(0, 15).map(item => ({
  title: item.title,
  sub: item.client,
  img: item.image || item.heroImage,
  desc: item.brandOverview || item.type,
  id: item.id,
  appUrl: item.appUrl
}));

export default function Vision360() {
  const mountRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [hudTitle, setHudTitle] = useState("Project Archive");
  const [hudDesc, setHudDesc] = useState("A panoramic study of Kalpnova's creative work. Navigate the perimeter to view the high-contrast portfolio archive.");

  useEffect(() => {
    let scene, camera, renderer, animationId;
    let targetRotation = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let dragDistance = 0;
    const panels = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      // Pushed fog back significantly to remove blurriness at a distance
      scene.fog = new THREE.Fog(0x000000, 10, 50);

      camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 0.1);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);
      const centerLight = new THREE.PointLight(0xffffff, 2, 30);
      scene.add(centerLight);

      const railPoints = [];
      for(let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        railPoints.push(new THREE.Vector3(Math.cos(angle) * 9, -1.5, Math.sin(angle) * 9));
      }
      const railGeo = new THREE.BufferGeometry().setFromPoints(railPoints);
      const railMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });
      scene.add(new THREE.Line(railGeo, railMat));

      const loader = new THREE.TextureLoader();
      visionData.forEach((item, i) => {
        loader.load(item.img, (texture) => {
          const ratio = texture.image.width / texture.image.height;
          // Standardize height and calculate width based on aspect ratio
          const h = 4;
          const w = h * ratio;

          const geo = new THREE.PlaneGeometry(w, h);
          const mat = new THREE.MeshStandardMaterial({ 
            map: texture,
            side: THREE.DoubleSide,
            emissive: new THREE.Color(0xffffff),
            emissiveIntensity: 0.5
          });
          
          const angle = (i / visionData.length) * Math.PI * 2;
          const radius = 18; // Slightly more radius for wider panels
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = (i % 2 === 0) ? 0.8 : -0.8;

          const panel = new THREE.Mesh(geo, mat);
          panel.position.set(x, y, z);
          panel.lookAt(0, y, 0); 
          panel.userData = item;
          panels.push(panel);
          scene.add(panel);
        });
      });

      const onMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        if (isDragging) {
          const deltaX = event.clientX - previousMouseX;
          dragDistance += Math.abs(deltaX);
          targetRotation += deltaX * 0.003;
        }
        previousMouseX = event.clientX;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(panels);
        
        panels.forEach(p => p.material.emissive.setHex(0x000000));
        if (intersects.length > 0) {
          document.body.style.cursor = 'pointer';
          const p = intersects[0].object;
          p.material.emissive.setHex(0x10b981);
          setHudTitle(p.userData.title);
          setHudDesc(p.userData.desc);
        } else {
          document.body.style.cursor = 'default';
        }
      };

      const onMouseDown = (event) => {
        isDragging = true;
        dragDistance = 0;
        previousMouseX = event.clientX;
      };

      const onMouseClick = () => {
        if (dragDistance > 5) return;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(panels);
        if (intersects.length > 0) {
          setSelectedItem(intersects[0].object.userData);
          setAiAnalysis('');
        }
      };

      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      const onTouchStart = (event) => {
        isDragging = true;
        dragDistance = 0;
        previousMouseX = event.touches[0].clientX;
      };

      const onTouchMove = (event) => {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

        if (isDragging) {
          const deltaX = touch.clientX - previousMouseX;
          dragDistance += Math.abs(deltaX);
          targetRotation += deltaX * 0.003;
        }
        previousMouseX = touch.clientX;

        // Visual feedback for touch is hard, but we can update HUD
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(panels);
        if (intersects.length > 0) {
          const p = intersects[0].object;
          setHudTitle(p.userData.title);
          setHudDesc(p.userData.desc);
        }
      };

      const handleTouchEnd = () => {
        isDragging = false;
        if (dragDistance < 10) onMouseClick(); // Treat small drag as click
      };

      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', () => isDragging = false);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('click', onMouseClick);
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('resize', onWindowResize);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        // Smoother rotation with higher lerp factor
        camera.rotation.y += (targetRotation - camera.rotation.y) * 0.1;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', () => isDragging = false);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('click', onMouseClick);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('resize', onWindowResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
      };
    };

    const cleanup = init();
    return () => {
      if(cleanup) cleanup();
      if(mountRef.current && mountRef.current.firstChild) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);




  return (
    <div className="fixed inset-0 w-full h-screen h-[100dvh] overflow-hidden bg-black text-white  z-[99999]">
      <div ref={mountRef} className="absolute inset-0 will-change-transform" />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10">
        {/* Top Nav */}
        <div className="flex justify-between items-center pointer-events-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold text-xl">V</div>
            <span className="tracking-[0.4em] font-bold text-xl md:text-2xl uppercase">Vision</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={() => window.location.href = '/insidekalpnova'} className="px-2 md:px-4 py-2 bg-black/70 backdrop-blur border border-white/10 text-[8px] md:text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
              ⟵ <span className="hidden md:inline">BACK TO HUB</span><span className="md:hidden">BACK</span>
            </button>
            <div className="text-[10px] tracking-[0.5em] text-gray-400 hidden xl:block uppercase">Drag to rotate</div>
          </div>
        </div>

        {/* AI Chat */}


        {/* Info Panel */}
        <div className="flex justify-between items-end pointer-events-auto">
          <div className="max-w-md">
            <h2 className="font-heading text-2xl md:text-4xl font-light tracking-tighter mb-2 italic uppercase">{hudTitle}</h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{hudDesc}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 pointer-events-auto cursor-pointer"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative bg-black border border-white/10 max-w-5xl w-full p-8 md:p-12 rounded-sm flex flex-col md:flex-row gap-8 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-3/5">
              <img 
                src={selectedItem.img} 
                alt={selectedItem.title} 
                className="w-full h-auto max-h-[70vh] object-contain border border-white/5 cursor-zoom-in" 
                onClick={() => window.open(selectedItem.img, '_blank')}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="font-heading text-2xl md:text-4xl font-bold mb-2 tracking-tight uppercase">{selectedItem.title}</h3>
              <p className="text-[#ff6b2b] text-[10px] md:text-xs mb-4 md:mb-6 tracking-[0.3em] uppercase">{selectedItem.sub}</p>
              <p className="text-gray-400 mb-8 leading-relaxed text-xs md:text-sm">{selectedItem.desc}</p>
              
              {selectedItem.appUrl && (
                <a 
                  href={selectedItem.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-8 inline-flex items-center justify-center gap-3 py-4 bg-[#ff6b2b] text-white font-bold text-[10px] tracking-[0.4em] hover:bg-white hover:text-[#ff6b2b] transition-all uppercase rounded-sm"
                >
                  Download App
                </a>
              )}

              <button onClick={() => setSelectedItem(null)} className="mt-auto py-3 border border-white/10 text-gray-500 font-bold text-[10px] tracking-[0.4em] hover:text-white transition-all uppercase">Exit Archive</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

