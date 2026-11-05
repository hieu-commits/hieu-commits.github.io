import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';

(() => {
  const canvas = document.querySelector('#lanyardCanvas');
  const stage = document.querySelector('#signalCoreCard');
  if (!canvas || !stage) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.35, 10.4);
  scene.add(new THREE.HemisphereLight(0xd8efff, 0x10152d, 2.1));
  const key = new THREE.DirectionalLight(0xffffff, 3.1); key.position.set(-3, 5, 7); scene.add(key);
  const rim = new THREE.PointLight(0x56cfff, 22, 13); rim.position.set(3, 1, 4); scene.add(rim);
  const violet = new THREE.PointLight(0x9d7bff, 13, 11); violet.position.set(-3, -2, 3); scene.add(violet);

  const root = new THREE.Group(); scene.add(root);
  const anchor = new THREE.Vector3(0, 3.35, 0);
  const strapMat = new THREE.MeshStandardMaterial({ color: 0x12628f, metalness: 0.24, roughness: 0.62 });
  const strapHighlight = new THREE.MeshStandardMaterial({ color: 0x5bbbdc, metalness: 0.42, roughness: 0.36 });
  const metal = new THREE.MeshStandardMaterial({ color: 0xc8dce9, metalness: 0.94, roughness: 0.18 });
  const cardMat = new THREE.MeshPhysicalMaterial({ color: 0x102b48, metalness: 0.2, roughness: 0.32, clearcoat: 0.85, clearcoatRoughness: 0.2 });

  const w = 1.78, h = 2.62, d = 0.11, radius = 0.15;
  const shape = new THREE.Shape();
  shape.moveTo(-w/2+radius,-h/2); shape.lineTo(w/2-radius,-h/2);
  shape.quadraticCurveTo(w/2,-h/2,w/2,-h/2+radius); shape.lineTo(w/2,h/2-radius);
  shape.quadraticCurveTo(w/2,h/2,w/2-radius,h/2); shape.lineTo(-w/2+radius,h/2);
  shape.quadraticCurveTo(-w/2,h/2,-w/2,h/2-radius); shape.lineTo(-w/2,-h/2+radius);
  shape.quadraticCurveTo(-w/2,-h/2,-w/2+radius,-h/2);
  const hole = new THREE.Path(); hole.absellipse(0,h/2-0.17,0.105,0.075,0,Math.PI*2,true); shape.holes.push(hole);
  const bodyGeo = new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelSegments:4,steps:1,bevelSize:0.025,bevelThickness:0.025,curveSegments:16});
  bodyGeo.computeVertexNormals();
  const badge = new THREE.Group(); root.add(badge);
  const body = new THREE.Mesh(bodyGeo,cardMat); body.position.z=-d/2; badge.add(body);

  function makeFace(back=false) {
    const c=document.createElement('canvas'); c.width=900; c.height=1320;
    const x=c.getContext('2d');
    const g=x.createLinearGradient(0,0,900,1320);
    g.addColorStop(0,back?'#071321':'#0a1a2d'); g.addColorStop(.55,back?'#10243b':'#123653'); g.addColorStop(1,'#060e19');
    x.fillStyle=g; x.fillRect(0,0,900,1320);
    x.strokeStyle='rgba(119,213,244,.82)'; x.lineWidth=5; x.strokeRect(28,28,844,1264);
    x.fillStyle='#74dff5'; x.font='600 29px monospace'; x.fillText(back?'HIEU COMMITS / PROFILE':'HCMUS  /  STUDENT',66,92);
    x.fillStyle='rgba(180,154,255,.9)'; x.fillRect(66,126,768,5);
    if (!back) {
      // Portrait placeholder remains intentionally neutral until the image can be uploaded as a binary repository asset.
      x.fillStyle='#d9e8f2'; x.fillRect(105,175,690,660);
      const pg=x.createLinearGradient(105,175,795,835); pg.addColorStop(0,'#c5d7e4'); pg.addColorStop(1,'#718fa8');
      x.fillStyle=pg; x.fillRect(105,175,690,660);
      x.fillStyle='rgba(7,26,44,.15)'; x.fillRect(105,175,690,660);
      x.beginPath(); x.arc(450,405,130,0,Math.PI*2); x.fillStyle='#24435d'; x.fill();
      x.beginPath(); x.ellipse(450,730,235,205,0,Math.PI,Math.PI*2); x.fillStyle='#24435d'; x.fill();
      x.fillStyle='#f2f8ff'; x.font='700 52px Arial'; x.fillText('HUỲNH NHẬT HIẾU',66,930);
      x.fillStyle='#8ddff2'; x.font='bold 31px Arial'; x.fillText('KHOA HỌC MÁY TÍNH',66,1000);
      x.fillStyle='#c4d6e7'; x.font='26px Arial'; x.fillText('Trường Đại học Khoa học Tự nhiên',66,1070);
      x.fillText('– ĐHQG TP.HCM (HCMUS)',66,1114);
      x.fillStyle='#74dff5'; x.fillRect(66,1190,768,7);
    } else {
      x.fillStyle='#f0f7ff'; x.font='700 64px Arial'; x.fillText('HUỲNH NHẬT',66,270); x.fillText('HIẾU',66,350);
      x.fillStyle='#a8bfd8'; x.font='30px monospace'; x.fillText('COMPUTER SCIENCE',66,475);
      x.fillText('UNIVERSITY OF SCIENCE',66,560); x.fillText('VIETNAM NATIONAL UNIVERSITY',66,615); x.fillText('HO CHI MINH CITY',66,670);
      x.fillStyle='#74dff5'; x.fillRect(66,745,768,5);
      x.fillStyle='#e7f2ff'; x.font='700 42px Arial'; x.fillText('HIEU COMMITS',66,850);
      x.fillStyle='#9bb4d0'; x.font='26px monospace'; x.fillText('SOFTWARE  /  NETWORKS',66,930); x.fillText('CYBER SECURITY  /  CLOUD',66,980);
      x.fillStyle='#b49aff'; x.fillRect(66,1070,768,5);
      x.fillStyle='#9bb4d0'; x.font='25px monospace'; x.fillText('LEARN  ·  BUILD  ·  VERIFY',66,1150);
    }
    const tex=new THREE.CanvasTexture(c); tex.colorSpace=THREE.SRGBColorSpace; tex.anisotropy=renderer.capabilities.getMaxAnisotropy(); return tex;
  }

  const front=new THREE.Mesh(new THREE.PlaneGeometry(w-0.13,h-0.13),new THREE.MeshStandardMaterial({map:makeFace(false),roughness:0.68,metalness:0.04}));
  front.position.z=d/2+0.009; badge.add(front);
  const back=new THREE.Mesh(new THREE.PlaneGeometry(w-0.13,h-0.13),new THREE.MeshStandardMaterial({map:makeFace(true),roughness:0.62,metalness:0.06}));
  back.position.z=-d/2-0.009; back.rotation.y=Math.PI; badge.add(back);

  // Metal eyelet and snap hook connect the strap to the punched card opening.
  const eyelet=new THREE.Mesh(new THREE.TorusGeometry(0.14,0.027,14,40),metal);
  eyelet.position.set(0,h/2-0.16,0.025); eyelet.rotation.x=Math.PI/2; badge.add(eyelet);
  const connector=new THREE.Mesh(new THREE.TorusGeometry(0.09,0.02,12,32),metal);
  connector.position.set(0,h/2+0.045,0.015); connector.rotation.x=Math.PI/2; badge.add(connector);
  const hook=new THREE.Mesh(new THREE.TorusGeometry(0.105,0.025,12,36,Math.PI*1.72),metal);
  hook.position.set(0,h/2+0.17,0.01); hook.rotation.x=Math.PI/2; badge.add(hook);

  const strapGroup=new THREE.Group(); root.add(strapGroup);
  let strapMesh=null, stitchMesh=null, lastStrapX=NaN, lastStrapY=NaN;
  function tube(points,r,material,segments=48) { return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),segments,r,10,false),material); }
  function redrawStrap(force=false) {
    if(!force && Math.abs(lastStrapX-badge.position.x)<0.015 && Math.abs(lastStrapY-badge.position.y)<0.015) return;
    lastStrapX=badge.position.x; lastStrapY=badge.position.y;
    if(strapMesh){strapGroup.remove(strapMesh);strapMesh.geometry.dispose();}
    if(stitchMesh){strapGroup.remove(stitchMesh);stitchMesh.geometry.dispose();}
    const end=new THREE.Vector3(badge.position.x,badge.position.y+h/2+0.23,0.03);
    const mid=new THREE.Vector3(end.x*0.28,2.28,0.02);
    const points=[anchor,new THREE.Vector3(-0.06,2.95,0.02),new THREE.Vector3(-0.2,2.55,0.02),new THREE.Vector3(mid.x-0.18,mid.y+0.12,0.02),new THREE.Vector3(mid.x+0.16,mid.y-0.08,0.02),new THREE.Vector3(end.x,end.y+0.24,0.02),end];
    strapMesh=tube(points,0.085,strapMat,54); strapGroup.add(strapMesh);
    stitchMesh=tube(points,0.012,strapHighlight,54); stitchMesh.position.z=0.045; strapGroup.add(stitchMesh);
  }

  badge.position.set(0.12,0.28,0); badge.rotation.z=-0.08; redrawStrap(true);
  let vx=0,vy=0,drag=false,moved=false,pointer=null,lastX=0,lastY=0,lastT=0,flipped=false;
  const raycaster=new THREE.Raycaster(), plane=new THREE.Plane(new THREE.Vector3(0,0,1),0), hit=new THREE.Vector3();
  function pointerPlane(e) {
    const rect=canvas.getBoundingClientRect();
    const ndc=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-((e.clientY-rect.top)/rect.height)*2+1);
    raycaster.setFromCamera(ndc,camera); return raycaster.ray.intersectPlane(plane,hit) ? hit.clone() : null;
  }
  function down(e) {
    if(e.button!==undefined && e.button!==0) return;
    const rect=canvas.getBoundingClientRect(), ndc=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-((e.clientY-rect.top)/rect.height)*2+1);
    raycaster.setFromCamera(ndc,camera);
    if(!raycaster.intersectObjects(badge.children,true).length) return;
    const p=pointerPlane(e); if(!p)return;
    pointer=e.pointerId; drag=true; moved=false; lastX=p.x; lastY=p.y; lastT=performance.now();
    canvas.setPointerCapture(pointer); e.preventDefault();
  }
  function move(e) {
    if(!drag || e.pointerId!==pointer)return;
    const p=pointerPlane(e); if(!p)return;
    const dx=p.x-lastX,dy=p.y-lastY;
    if(Math.hypot(p.x-badge.position.x,p.y-badge.position.y)>.07)moved=true;
    const now=performance.now(),dt=Math.max(8,now-lastT);
    vx=dx/(dt/16); vy=dy/(dt/16);
    badge.position.x=THREE.MathUtils.clamp(p.x,-1.5,1.5);
    badge.position.y=THREE.MathUtils.clamp(p.y-0.12,-0.8,0.85);
    badge.rotation.z=THREE.MathUtils.clamp(-dx*1.5,-0.7,0.7);
    lastX=p.x;lastY=p.y;lastT=now;redrawStrap();
  }
  function up(e) {
    if(!drag || e.pointerId!==pointer)return;
    drag=false;pointer=null;
    if(!moved)flipped=!flipped;
  }
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);
  canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);

  const resize=new ResizeObserver(()=>{
    const b=canvas.getBoundingClientRect(); if(!b.width||!b.height)return;
    renderer.setSize(b.width,b.height,false);camera.aspect=b.width/b.height;camera.updateProjectionMatrix();
  });
  resize.observe(stage);
  const clock=new THREE.Clock();let disposed=false;
  function tick(){
    if(disposed)return; requestAnimationFrame(tick);
    const dt=Math.min(clock.getDelta(),0.04);
    if(!drag){
      if(!reduced){
        vy-=0.75*dt; badge.position.x+=vx; badge.position.y+=vy;
        vx*=Math.pow(0.982,dt*60);vy*=Math.pow(0.982,dt*60);
        if(badge.position.y < -0.72){badge.position.y=-0.72;vy=Math.abs(vy)*0.48;vx*=0.82;}
        if(badge.position.y > 0.85){badge.position.y=0.85;vy=-Math.abs(vy)*0.35;}
        badge.position.x=THREE.MathUtils.clamp(badge.position.x,-1.25,1.25);
        badge.rotation.z+=(THREE.MathUtils.clamp(-vx*0.22,-0.48,0.48)-badge.rotation.z)*0.045;
        badge.rotation.y+=(flipped?Math.PI:0)-badge.rotation.y;
        redrawStrap();
      } else badge.rotation.y+=(flipped?Math.PI:0)-badge.rotation.y;
    }
    renderer.render(scene,camera);
  }
  tick();
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)clock.getDelta();});
  window.addEventListener('pagehide',()=>{disposed=true;resize.disconnect();renderer.dispose();},{once:true});
})();