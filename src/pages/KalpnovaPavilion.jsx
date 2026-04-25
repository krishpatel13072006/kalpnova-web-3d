import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { portfolioItems } from '../data/portfolio';

export default function KalpnovaPavilion() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Reset window scroll on mount
    window.scrollTo(0, 0);

    let scene, camera, renderer, animationId;
    const museum = new THREE.Group();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdce5ed);
    scene.fog = new THREE.Fog(0xdce5ed, 10, 300);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1';
    renderer.domElement.style.outline = 'none';

    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);
    scene.add(museum);

    // Setup Managers
    const manager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(manager);
    const logoUrl = 'https://i.postimg.cc/GhmVGQ8D/download.png';
    const logoTex = loader.load(logoUrl);

    const tiledLogoTex = loader.load(logoUrl);
    tiledLogoTex.wrapS = tiledLogoTex.wrapT = THREE.RepeatWrapping;
    tiledLogoTex.repeat.set(3, 3);

    const brandWallMat = new THREE.MeshStandardMaterial({ map: tiledLogoTex, color: 0xffffff, roughness: 0.5 });
    const whiteWallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2 });
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });

    const createWall = (w, h, d, x, y, z, mat = whiteWallMat) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      m.receiveShadow = true;
      m.castShadow = true;
      museum.add(m);
      return m;
    };

    // Architecture
    createWall(1, 20, 160, -40, 5, -30);
    createWall(1, 20, 160, 40, 5, -30);
    createWall(81, 20, 1, 0, 5, -110);
    createWall(30, 20, 1, -25, 5, 50);
    createWall(30, 20, 1, 25, 5, 50);
    createWall(1, 20, 50, 0, 5, 0, brandWallMat); // Center Divider
    createWall(81, 1, 161, 0, 15, -30, ceilingMat); // Roof

    function addEntranceLogo(x, z) {
      const geom = new THREE.PlaneGeometry(16, 8);
      const mat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, 7, z);
      museum.add(mesh);
    }
    addEntranceLogo(-25, 50.6); // Left Entrance Logo
    addEntranceLogo(25, 50.6);  // Right Entrance Logo

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 160), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -5, -30);
    floor.receiveShadow = true;
    museum.add(floor);

    // Krushak Portfolio Data
    const krusakProject = portfolioItems.find(p => p.id === 12);
    const krusakImages = krusakProject.gallery.slice(0, 6);
    const mainKrusakBanner = krusakProject.image || krusakProject.heroImage;

    // Exhibits - 3 on each side
    const addExhibit = (x, z, ry, imgUrl) => {
      const group = new THREE.Group();
      loader.load(imgUrl, (texture) => {
        const ratio = texture.image.width / texture.image.height;
        const h = 12; // Slightly smaller to fit 3 comfortably
        const w = h * ratio;
        const p = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            roughness: 0.4
          })
        );
        group.add(p);
      });
      group.position.set(x, 2.5, z);
      group.rotation.y = ry;
      museum.add(group);
    };

    // Left Wall
    addExhibit(-39.4, 30, Math.PI / 2, krusakImages[0]);
    addExhibit(-39.4, -20, Math.PI / 2, krusakImages[1]);
    addExhibit(-39.4, -70, Math.PI / 2, krusakImages[2]);

    // Right Wall
    addExhibit(39.4, 30, -Math.PI / 2, krusakImages[3]);
    addExhibit(39.4, -20, -Math.PI / 2, krusakImages[4]);
    addExhibit(39.4, -70, -Math.PI / 2, krusakImages[5]);

    // Main End Screen (7th Image) - Krushak Logo
    const krusakLogoUrl = '/clients/krushak.webp';
    loader.load(krusakLogoUrl, (texture) => {
      const planeWidth = 50; // Prominent logo size
      const planeHeight = 25;
      const imageAspect = texture.image.width / texture.image.height;

      // Calculate dimensions to preserve logo aspect ratio
      let finalW, finalH;
      if (imageAspect > (planeWidth / planeHeight)) {
        finalW = planeWidth;
        finalH = planeWidth / imageAspect;
      } else {
        finalH = planeHeight;
        finalW = planeHeight * imageAspect;
      }

      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(finalW, finalH),
        new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 0.2
        })
      );
      screen.position.set(0, 5, -109.3); // Slightly in front of wall
      museum.add(screen);
    });

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(50, 100, 50);
    sun.castShadow = true;
    scene.add(sun);
    [[-20, 0], [20, 0], [0, -80]].forEach(([x, z]) => {
      const s = new THREE.PointLight(0xffffff, 0.8, 50);
      s.position.set(x, 10, z);
      museum.add(s);
    });

    const cam = { x: 0, y: 150, z: 200, rx: -1.2, ry: 0 };
    const targetCam = { x: 0, y: 150, z: 200, rx: -1.2, ry: 0 };

    let targetScale = 0.1;
    let targetPosZ = -150;

    const lerp = (start, end, t) => start + (end - start) * t;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(window.scrollY / (scrollHeight || 1), 1));

      const t = progress * 35; // Increased range for longer hallway

      targetScale = t < 4 ? lerp(0.1, 1, t / 4) : 1;
      targetPosZ = t < 4 ? lerp(-150, 0, t / 4) : 0;

      if (t < 4) {
        targetCam.y = lerp(150, 1.5, t / 4);
        targetCam.z = lerp(200, 120, t / 4);
        targetCam.rx = lerp(-1.2, 0, t / 4);
        targetCam.x = 0; targetCam.ry = 0;
      } else if (t < 7) {
        const p = (t - 4) / 3;
        targetCam.z = lerp(120, 40, p);
        targetCam.x = 0; targetCam.ry = 0;
      } else if (t < 11) {
        const p = (t - 7) / 4;
        targetCam.z = 40;
        targetCam.x = lerp(0, -20, p);
        targetCam.ry = lerp(0, Math.PI / 2.2, p);
      } else if (t < 16) {
        const p = (t - 11) / 5;
        targetCam.x = -20; targetCam.ry = Math.PI / 2.2;
        targetCam.z = lerp(40, -80, p); // Now views all 3 left images
      } else if (t < 21) {
        const p = (t - 16) / 5;
        targetCam.z = -80;
        targetCam.x = lerp(-20, 20, p);
        targetCam.ry = lerp(Math.PI / 2.2, -Math.PI / 2.2, p);
      } else if (t < 26) {
        const p = (t - 21) / 5;
        targetCam.x = 20; targetCam.ry = -Math.PI / 2.2;
        targetCam.z = lerp(-80, 40, p); // Now views all 3 right images
      } else if (t < 30) {
        const p = (t - 26) / 4;
        targetCam.x = lerp(20, 0, p);
        targetCam.ry = lerp(-Math.PI / 2.2, 0, p);
        targetCam.z = lerp(40, -40, p);
      } else {
        const p = Math.min(1, (t - 30) / 5);
        targetCam.x = 0; targetCam.ry = 0;
        targetCam.z = lerp(-40, -100, p);
      }

      const prompt = document.getElementById('scroll-prompt');
      if (prompt) {
        prompt.style.opacity = progress > 0.02 ? '0' : '1';
      }
    };

    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      museum.scale.setScalar(museum.scale.x + (targetScale - museum.scale.x) * 0.05);
      museum.position.z += (targetPosZ - museum.position.z) * 0.05;

      cam.x += (targetCam.x - cam.x) * 0.05;
      cam.y += (targetCam.y - cam.y) * 0.05;
      cam.z += (targetCam.z - cam.z) * 0.05;
      cam.rx += (targetCam.rx - cam.rx) * 0.05;
      cam.ry += (targetCam.ry - cam.ry) * 0.05;

      camera.position.set(cam.x, cam.y, cam.z);
      camera.rotation.order = 'YXZ';
      camera.rotation.x = cam.rx;
      camera.rotation.y = cam.ry;

      renderer.render(scene, camera);
    };
    animate();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const content = entry.target.querySelector('.kalp-content');
        if (content) {
          content.style.opacity = entry.isIntersecting ? '1' : '0';
          content.style.transform = entry.isIntersecting ? 'translateX(0)' : 'translateX(-50px)';
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.kalp-section').forEach(sec => observer.observe(sec));

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
      }
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  const contentStyle = {
    maxWidth: '420px', padding: '3rem', background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)', borderRadius: '0.5rem', borderLeft: '6px solid #ea580c',
    opacity: 0, transform: 'translateX(-50px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  return (
    <div style={{ background: '#dce5ed', fontFamily: 'sans-serif' }}>
      <button onClick={() => window.location.href = '/insidekalpnova'} style={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, padding: '12px 30px', background: '#ea580c', color: 'white', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', border: 'none' }}>⟵ BACK TO HUB</button>
      <div className="fixed top-28 left-6 md:left-10 z-[40] font-bold tracking-[0.4em] text-slate-800 uppercase text-xs">Kalpnova // Integrated Pavilion</div>

      <div
        id="scroll-prompt"
        className="fixed top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[45] font-black md:text-7xl lg:text-8xl text-5xl text-black tracking-[0.2em] uppercase transition-opacity duration-700 pointer-events-none whitespace-nowrap w-max"
      >
        SCROLL DOWN
      </div>

      <div ref={mountRef} />

      <div id="kalp-scroll-container" className="relative z-10 pointer-events-none">
        <section className="kalp-section flex items-center px-[10%]" style={{ height: '300vh' }}>
          <div className="kalp-content pointer-events-auto" style={contentStyle}>
            <span className="text-orange-600 font-bold text-[0.6rem] tracking-widest uppercase mb-2 block">The Entrance</span>
            <h1 className="font-heading text-5xl font-bold mb-4 tracking-tighter text-slate-900 uppercase">The Hub</h1>
            <p className="text-slate-600 leading-relaxed text-lg">Approach the monolith. A single architectural statement. Scroll to proceed.</p>
          </div>
        </section>
        <section className="kalp-section flex items-center px-[10%]" style={{ height: '400vh' }}>
          <div className="kalp-content pointer-events-auto" style={contentStyle}>
            <span className="text-orange-600 font-bold text-[0.6rem] tracking-widest uppercase mb-2 block">Wing A // Logic</span>
            <h1 className="font-heading text-4xl font-bold mb-4 tracking-tight text-slate-900 uppercase">Lateral Analysis</h1>
            <p className="text-slate-600 leading-relaxed">Structural foundation of the digital experience.</p>
          </div>
        </section>
        <section className="kalp-section flex items-center px-[10%]" style={{ height: '400vh' }}>
          <div className="kalp-content pointer-events-auto" style={contentStyle}>
            <span className="text-orange-600 font-bold text-[0.6rem] tracking-widest uppercase mb-2 block">Wing B // Pulse</span>
            <h1 className="font-heading text-4xl font-bold mb-4 tracking-tight text-slate-900 uppercase">Creative Flow</h1>
            <p className="text-slate-600 leading-relaxed">Where branding dictates the light and rhythm.</p>
          </div>
        </section>
        <section className="kalp-section flex items-center px-[10%]" style={{ height: '400vh' }}>
          <div className="kalp-content pointer-events-auto" style={contentStyle}>
            <span className="text-orange-600 font-bold text-[0.6rem] tracking-widest uppercase mb-2 block">Main Atrium</span>
            <h1 className="font-heading text-4xl font-bold mb-4 tracking-tight text-slate-900 uppercase">Unified Sync</h1>
            <p className="text-slate-600 leading-relaxed">The final destination where all streams unite.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
