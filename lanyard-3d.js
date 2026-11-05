import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';

(() => {
 const canvas=document.querySelector('#lanyardCanvas'), stage=document.querySelector('#signalCoreCard');
 if(!canvas||!stage)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.65));
 renderer.setClearColor(0x000000,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.12;
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(32,1,.1,100);
 camera.position.set(0,0,10.8);
 scene.add(new THREE.HemisphereLight(0xc7eaff,0x10152d,2.0));
 const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(-3,5,7);scene.add(key);
 const rim=new THREE.PointLight(0x56cfff,18,12);rim.position.set(3,1,4);scene.add(rim);
 const violet=new THREE.PointLight(0x9d7bff,12,10);violet.position.set(-3,-2,3);scene.add(violet);
 const root=new THREE.Group();scene.add(root);
 const anchor=new THREE.Vector3(0,4.8,0);
 const strapMat=new THREE.MeshStandardMaterial({color:0x176c9c,metalness:.38,roughness:.38});
 const strapEdge=new THREE.MeshStandardMaterial({color:0x8deaff,metalness:.6,roughness:.28});
 const hardware=new THREE.MeshStandardMaterial({color:0xb8d4e8,metalness:.92,roughness:.2});
 const cardMat=new THREE.MeshPhysicalMaterial({color:0x102b48,metalness:.34,roughness:.28,clearcoat:.8,clearcoatRoughness:.18});
 const w=1.72,h=2.55,r=.16,depth=.105;
 const shape=new THREE.Shape();shape.moveTo(-w/2+r,-h/2);shape.lineTo(w/2-r,-h/2);shape.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);shape.lineTo(w/2,h/2-r);shape.quadraticCurveTo(w/2,h/2,w/2-r,h/2);shape.lineTo(-w/2+r,h/2);shape.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);shape.lineTo(-w/2,-h/2+r);shape.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);
 const hole=new THREE.Path();hole.absellipse(0,h/2-.16,.105,.075,0,Math.PI*2,true);shape.holes.push(hole);
 const geo=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:12});geo.computeVertexNormals();
 const badge=new THREE.Group();root.add(badge);
 const body=new THREE.Mesh(geo,cardMat);body.position.z=-depth/2;badge.add(body);
 let texture;\n function artwork(back=false){
  let targetTexture;\n  const c=document.createElement('canvas');c.width=900;c.height=1320;const x=c.getContext('2d');
  const g=x.createLinearGradient(0,0,900,1320);g.addColorStop(0,back?'#071321':'#0b1b30');g.addColorStop(.55,back?'#10243b':'#123653');g.addColorStop(1,'#07111f');x.fillStyle=g;x.fillRect(0,0,900,1320);
  x.strokeStyle='rgba(119,213,244,.82)';x.lineWidth=5;x.strokeRect(28,28,844,1264);
  x.fillStyle='#74dff5';x.font='600 30px monospace';x.fillText(back?'HIEU COMMITS / PROFILE':'HCMUS  /  STUDENT IDENTITY',66,92);
  x.fillStyle='rgba(180,154,255,.9)';x.fillRect(66,126,768,5);
  if(back){
   x.fillStyle='#f0f7ff';x.font='700 62px Arial';x.fillText('HUỲNH NHẬT',66,270);x.fillText('HIẾU',66,345);
   x.fillStyle='#a8bfd8';x.font='30px monospace';x.fillText('COMPUTER SCIENCE',66,465);
   x.fillText('UNIVERSITY OF SCIENCE',66,545);
   x.fillText('VIETNAM NATIONAL UNIVERSITY',66,595);
   x.fillText('HO CHI MINH CITY',66,645);
   x.fillStyle='#74dff5';x.fillRect(66,730,768,5);
   x.fillStyle='#e7f2ff';x.font='700 38px Arial';x.fillText('HIEU COMMITS',66,835);
   x.fillStyle='#9bb4d0';x.font='25px monospace';x.fillText('SOFTWARE  /  NETWORKS',66,905);x.fillText('CYBER SECURITY  /  CLOUD',66,950);
   x.fillStyle='#b49aff';x.fillRect(66,1050,768,5);
   x.fillStyle='#9bb4d0';x.font='25px monospace';x.fillText('LEARN  ·  BUILD  ·  VERIFY',66,1130);
  }else{
   x.fillStyle='#102c46';x.fillRect(66,164,768,735);
   x.strokeStyle='rgba(116,223,245,.5)';x.lineWidth=3;x.strokeRect(66,164,768,735);
   const portrait=new Image();portrait.onload=()=>{const scale=Math.min(700/portrait.width,680/portrait.height);const pw=portrait.width*scale,ph=portrait.height*scale;x.fillStyle='#dce8f2';x.fillRect(100,190,700,680);x.drawImage(portrait,450-pw/2,530-ph/2,pw,ph);targetTexture.needsUpdate=true};portrait.onerror=()=>{};portrait.src='assets/id-portrait.webp';
   x.fillStyle='rgba(116,223,245,.12)';x.fillRect(66,164,768,735);
   x.fillStyle='#f2f8ff';x.font='700 52px Arial';x.fillText('HUỲNH NHẬT HIẾU',66,990);
   x.fillStyle='#8ddff2';x.font='bold 30px Arial';x.fillText('KHOA HỌC MÁY TÍNH',66,1050);
   x.fillStyle='#b7cce0';x.font='25px Arial';x.fillText('Trường Đại học Khoa học Tự nhiên',66,1110);
   x.fillText('– ĐHQG TP.HCM (HCMUS)',66,1150);
   x.fillStyle='#74dff5';x.fillRect(66,1200,768,7);
  }
  texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;targetTexture=texture;
  return texture;
 }
 const front=new THREE.Mesh(new THREE.PlaneGeometry(w-.13,h-.13),new THREE.MeshStandardMaterial({map:artwork(false),roughness:.62,metalness:.05}));
 front.position.z=depth/2+.008;badge.add(front);
 const back=new THREE.Mesh(new THREE.PlaneGeometry(w-.13,h-.13),new THREE.MeshStandardMaterial({map:artwork(true),roughness:.58,metalness:.08}));
 back.position.z=-depth/2-.009;back.rotation.y=Math.PI;badge.add(back);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.16,.025,12,40),hardware);ring.position.set(0,h/2-.16,.02);ring.rotation.x=Math.PI/2;badge.add(ring);
 const clip=new THREE.Mesh(new THREE.TorusGeometry(.105,.018,10,32),hardware);clip.position.set(0,h/2+.02,.02);clip.rotation.x=Math.PI/2;badge.add(clip);
 const strapGroup=new THREE.Group();root.add(strapGroup);
 let strapMesh=null,edgeMesh=null;
 function tube(points,radius,material){const curve=new THREE.CatmullRomCurve3(points);return new THREE.Mesh(new THREE.TubeGeometry(curve,42,radius,8,false),material)}
 function redrawStrap(){
  if(strapMesh){strapGroup.remove(strapMesh);strapMesh.geometry.dispose()}
  if(edgeMesh){strapGroup.remove(edgeMesh);edgeMesh.geometry.dispose()}
  const end=new THREE.Vector3(badge.position.x,badge.position.y+h/2+.08,0);
  const mid=new THREE.Vector3((anchor.x+end.x)/2,Math.max(end.y+.8,anchor.y-1.1),.02);
  const pts=[anchor,new THREE.Vector3(anchor.x,anchor.y-.3,0),new THREE.Vector3(mid.x-.28,mid.y+.15,.03),new THREE.Vector3(mid.x+.22,mid.y-.12,.03),new THREE.Vector3(end.x,end.y+.28,.02),end];
  strapMesh=tube(pts,.075,strapMat);strapGroup.add(strapMesh);
  edgeMesh=tube(pts,.012,strapEdge);edgeMesh.position.z=.035;strapGroup.add(edgeMesh);
 }
 badge.position.set(.15,.65,0);badge.rotation.z=-.13;redrawStrap();
 let vx=0,vy=0,angular=0,drag=false,moved=false,pointer=null,lastX=0,lastY=0,lastT=0,flipped=false;
 const raycaster=new THREE.Raycaster(),plane=new THREE.Plane(new THREE.Vector3(0,0,1),0),hit=new THREE.Vector3();
 function project(e){const rect=canvas.getBoundingClientRect();const ndc=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-((e.clientY-rect.top)/rect.height)*2+1);raycaster.setFromCamera(ndc,camera);raycaster.ray.intersectPlane(plane,hit);return hit}
 function down(e){if(e.button!==undefined&&e.button!==0)return;const rect=canvas.getBoundingClientRect();const ndc=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-((e.clientY-rect.top)/rect.height)*2+1);raycaster.setFromCamera(ndc,camera);if(!raycaster.intersectObjects(badge.children,true).length)return;pointer=e.pointerId;drag=true;moved=false;const p=project(e);lastX=p.x;lastY=p.y;lastT=performance.now();canvas.setPointerCapture(pointer);e.preventDefault()}
 function move(e){if(!drag||e.pointerId!==pointer)return;const p=project(e),dx=p.x-lastX,dy=p.y-lastY;if(Math.hypot(p.x-badge.position.x,p.y-badge.position.y)>.08)moved=true;const dt=Math.max(8,performance.now()-lastT);vx=dx/(dt/16);vy=dy/(dt/16);badge.position.x=p.x;badge.position.y=p.y-.12;badge.rotation.z=THREE.MathUtils.clamp(-dx*1.8,-.75,.75);lastX=p.x;lastY=p.y;lastT=performance.now();redrawStrap()}
 function up(e){if(!drag||e.pointerId!==pointer)return;drag=false;pointer=null;if(!moved){flipped=!flipped;}}
 canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 let width=0,height=0;const resize=new ResizeObserver(()=>{const b=canvas.getBoundingClientRect();if(!b.width||!b.height)return;width=b.width;height=b.height;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix()});resize.observe(stage);
 const clock=new THREE.Clock();let frame=0,disposed=false;
 function tick(){if(disposed)return;requestAnimationFrame(tick);const dt=Math.min(clock.getDelta(),.04);if(!drag){
  if(!reduced){vy-=1.15*dt;badge.position.x+=vx;badge.position.y+=vy;vx*=Math.pow(.985,dt*60);vy*=Math.pow(.985,dt*60);badge.position.y=Math.max(-1.05,badge.position.y);if(badge.position.y<=-1.05){vy=Math.abs(vy)*.52;vx*=.82}badge.rotation.z+=(THREE.MathUtils.clamp(-vx*.25,-.55,.55)-badge.rotation.z)*.035;badge.rotation.y+=(flipped?Math.PI:0)-badge.rotation.y;redrawStrap()}
  else{badge.rotation.y+=(flipped?Math.PI:0)-badge.rotation.y}
 }
 renderer.render(scene,camera)}
 tick();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)clock.getDelta()});
 window.addEventListener('pagehide',()=>{disposed=true;resize.disconnect();renderer.dispose()},{once:true});
})();