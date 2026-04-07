import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

const visionData = [
  { title: "Nelumbo nucifera", sub: "Pink Lotus", img: "https://images.unsplash.com/photo-1502675135487-e971002a6adb?w=800", desc: "The architectural centerpiece of the aquatic gallery." },
  { title: "Canna indica", sub: "Indian Shot", img: "https://images.unsplash.com/photo-1501746734251-789a69076934?w=800", desc: "Vibrant vertical structures with saturated red pigments." },
  { title: "Zephyranthes", sub: "Rain Lily", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800", desc: "Symmetrical blooms appearing after sudden humidity shifts." },
  { title: "Nymphaea alba", sub: "Water Lily", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800", desc: "Classical floating biological form." },
  { title: "Iris laevigata", sub: "Rabbit Iris", img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800", desc: "Intricate purple structural patterns." },
  { title: "Eichhornia", sub: "Hyacinth", img: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800", desc: "Lavender blossoms with bulbous aquatic stems." },
  { title: "Nymphaea Blue", sub: "Blue Lotus", img: "https://images.unsplash.com/photo-1509316785289-025f5d846b35?w=800", desc: "Deep blue pigmentation captured in starlight." },
  { title: "Aquatic Flora A", sub: "Specimen 08", img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800", desc: "Micro-detail of floating green specimens." },
  { title: "Floating Moss", sub: "Specimen 09", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800", desc: "The foundation of the aquatic ecosystem." },
  { title: "Marsh Lily", sub: "Specimen 10", img: "https://images.unsplash.com/photo-1501004318641-72e5450bed24?w=800", desc: "Isolated beauty in the depths of the wetland." },
  { title: "Cattail Reed", sub: "Typha", img: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=800", desc: "The rhythmic vertical line of the shoreline." },
  { title: "Water Fern", sub: "Salvinia", img: "https://images.unsplash.com/photo-1508193638397-1c4334ac3a4a?w=800", desc: "Intricate fractal growth patterns in water." }
];

export default function Vision360() {
  const mountRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([{ sender: 'guide', text: 'Hello. I am the VISION neural guide. Ask me anything.' }]);
  const [chatInput, setChatInput] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [hudTitle, setHudTitle] = useState("Exhibition Hall");
  const [hudDesc, setHudDesc] = useState("A panoramic study of aquatic flora. Navigate the perimeter to view the high-contrast biological archive.");

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
      scene.fog = new THREE.Fog(0x000000, 2, 22);

      camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 0.1);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);
      const centerLight = new THREE.PointLight(0x10b981, 1, 20);
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
        const angle = (i / visionData.length) * Math.PI * 2;
        const x = Math.cos(angle) * 10;
        const z = Math.sin(angle) * 10;
        const y = (i % 2 === 0) ? 0.8 : -0.8;
        const width = (i % 3 === 0) ? 3 : 4.5; 
        const height = (i % 2 === 0) ? 4 : 3; 

        const geo = new THREE.PlaneGeometry(width, height);
        const mat = new THREE.MeshStandardMaterial({ 
          map: loader.load(item.img),
          side: THREE.DoubleSide,
          emissive: new THREE.Color(0x000000),
          emissiveIntensity: 0.3
        });
        
        const panel = new THREE.Mesh(geo, mat);
        panel.position.set(x, y, z);
        panel.lookAt(0, y, 0); 
        panel.userData = item;
        panels.push(panel);
        scene.add(panel);
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
        camera.rotation.y += (targetRotation - camera.rotation.y) * 0.05;
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

  const handleAskGuide = () => {
    if(!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'guide', text: "Neural archive confirms your query. The flora structure responds to environment shifts continuously." }]);
    }, 1000);
  };

  const analyzeSpecimen = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiAnalysis(`Biological architecture of ${selectedItem.title} indicates complex fractals. Pigmentation adapted for high-contrast visibility.`);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black text-white font-sans z-[99999]">
      <div ref={mountRef} className="absolute inset-0" />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10">
        {/* Top Nav */}
        <div className="flex justify-between items-center pointer-events-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold text-xl">V</div>
            <span className="tracking-[0.4em] font-bold text-xl md:text-2xl">VISION 为什么</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={() => window.location.href = '/insidekalpnova'} className="px-2 md:px-4 py-2 bg-black/70 backdrop-blur border border-white/10 text-[8px] md:text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
              ⟵ <span className="hidden md:inline">BACK TO HUB</span><span className="md:hidden">BACK</span>
            </button>
            <button onClick={() => setIsChatOpen(!isChatOpen)} className="px-2 md:px-4 py-2 bg-black/70 backdrop-blur border border-white/10 text-[8px] md:text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
              ✨ <span className="hidden md:inline">Ask Guide</span><span className="md:hidden">ASK</span>
            </button>
            <div className="text-[10px] tracking-[0.5em] text-gray-400 hidden xl:block uppercase">Drag to rotate</div>
          </div>
        </div>

        {/* AI Chat */}
        {isChatOpen && (
          <div className="absolute right-8 top-24 w-80 bg-black/80 backdrop-blur border border-white/10 p-6 rounded-sm pointer-events-auto">
            <h4 className="text-xs tracking-[0.3em] font-bold mb-4 flex justify-between">
              GUIDE ✨ <button onClick={() => setIsChatOpen(false)}>×</button>
            </h4>
            <div className="h-64 overflow-y-auto mb-4 text-[11px] text-gray-400 space-y-4">
              {chatHistory.map((msg, i) => (
                <p key={i}>
                  <span className={msg.sender === 'user' ? 'text-white font-bold' : 'text-emerald-400 font-bold'}>
                    {msg.sender === 'user' ? 'YOU: ' : 'GUIDE: '}
                  </span>
                  {msg.text}
                </p>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAskGuide()} type="text" placeholder="Ask..." className="flex-1 bg-black/50 border border-white/10 p-2 text-xs focus:outline-none focus:border-emerald-500" />
              <button onClick={handleAskGuide} className="bg-emerald-600 px-3 py-1 text-xs hover:bg-emerald-400">✨</button>
            </div>
          </div>
        )}

        {/* Info Panel */}
        <div className="flex justify-between items-end pointer-events-auto">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-4xl font-light tracking-tighter mb-2 italic">{hudTitle}</h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{hudDesc}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 pointer-events-auto">
          <div className="relative bg-black border border-white/10 max-w-4xl w-full p-10 rounded-sm flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <img src={selectedItem.img} alt={selectedItem.title} className="w-full h-80 object-cover border border-white/5 mb-4" />
              <button onClick={analyzeSpecimen} disabled={isAnalyzing} className="w-full py-4 border border-emerald-500/50 text-emerald-400 font-bold text-[10px] tracking-[0.4em] hover:bg-emerald-500 hover:text-white transition-all uppercase">
                {isAnalyzing ? '✨ CONSULTING NEURAL CORE...' : '✨ Deep AI Analysis'}
              </button>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight">{selectedItem.title}</h3>
              <p className="text-emerald-500 text-[10px] md:text-xs mb-4 md:mb-6 tracking-[0.3em] uppercase">{selectedItem.sub}</p>
              <p className="text-gray-400 mb-4 md:mb-8 leading-relaxed text-xs md:text-sm">{selectedItem.desc}</p>
              
              {aiAnalysis && (
                <div className="animate-fade-in">
                  <div className="h-px bg-white/10 w-full my-6"></div>
                  <h4 className="text-[10px] tracking-[0.3em] text-emerald-400 font-bold uppercase mb-4">✨ VISION Neural Insight</h4>
                  <p className="text-gray-300 text-sm leading-relaxed italic">{aiAnalysis}</p>
                </div>
              )}
              
              <button onClick={() => setSelectedItem(null)} className="mt-auto py-3 border border-white/10 text-gray-500 font-bold text-[10px] tracking-[0.4em] hover:text-white transition-all uppercase">Exit Archive</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
