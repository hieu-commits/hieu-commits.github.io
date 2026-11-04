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
 function artwork(back=false){
  const c=document.createElement('canvas');c.width=800;c.height=1180;const x=c.getContext('2d');
  x.fillStyle=back?'#071321':'#0b1d34';x.fillRect(0,0,800,1180);
  x.strokeStyle='#56def5';x.lineWidth=5;x.strokeRect(25,25,750,1130);
  x.fillStyle='#56def5';x.font='bold 29px monospace';x.fillText(back?'HC / CONNECT':'HC / IDENTITY',55,90);
  x.fillStyle='#b49aff';x.fillRect(55,125,690,7);
  if(back){
   x.fillStyle='#e9f6ff';x.font='bold 54px Arial';x.fillText('BUILD WITH',58,270);x.fillText('INTENTION.',58,335);
   x.fillStyle='#8ba9c8';x.font='26px monospace';x.fillText('SOFTWARE  /  SYSTEMS',58,420);x.fillText('SECURITY  /  NETWORKS',58,465);
   x.fillStyle='#56def5';x.font='bold 30px monospace';x.fillText('GITHUB',58,850);
   x.fillStyle='#d9e9fa';x.font='24px monospace';x.fillText('github.com/hieu-commits',58,900);
   x.fillStyle='#b49aff';x.fillRect(55,1000,690,5);
   x.fillStyle='#91a9c8';x.font='23px monospace';x.fillText('LEARN  ·  BUILD  ·  VERIFY',58,1080);
  }else{
   x.fillStyle='#102e4c';x.fillRect(55,155,690,650);
   x.strokeStyle='#3e85ad';x.lineWidth=3;x.strokeRect(55,155,690,650);
   x.fillStyle='#56def5';x.beginPath();x.arc(400,425,145,0,Math.PI*2);x.fill();
   x.fillStyle='#0b1d34';x.font='bold 142px Arial';x.textAlign='center';x.fillText('HC',400,475);x.textAlign='left';
   x.fillStyle='#f2f8ff';x.font='bold 48px Arial';x.fillText('HUỲNH NHẬT HIẾU',55,900);
   x.fillStyle='#9cb9d7';x.font='25px monospace';x.fillText('SOFTWARE ENGINEERING',55,955);x.fillText('SYSTEMS  ·  SECURITY  ·  AI',55,1000);
   x.fillStyle='#56def5';x.fillRect(55,1050,690,8);
  }
  return new THREE.CanvasTexture(c);
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
 function down(e){if(e.button!==undefined&&e.button!==0)return;pointer=e.pointerId;drag=true;moved=false;const p=project(e);lastX=p.x;lastY=p.y;lastT=performance.now();canvas.setPointerCapture(pointer);e.preventDefault()}
 function move(e){if(!drag||e.pointerId!==pointer)return;const p=project(e),dx=p.x-lastX,dy=p.y-lastY;if(Math.hypot(p.x-badge.position.x,p.y-badge.position.y)>.08)moved=true;const dt=Math.max(8,performance.now()-lastT);vx=dx/(dt/16);vy=dy/(dt/16);badge.position.x=p.x;badge.position.y=p.y-.12;badge.rotation.z=THREE.MathUtils.clamp(-dx*1.8,-.75,.75);lastX=p.x;lastY=p.y;lastT=performance.now();redrawStrap()}
 function up(e){if(!drag||e.pointerId!==pointer)return;drag=false;pointer=null;if(!moved){flipped=!flipped;badge.rotation.y=flipped?Math.PI:0;}}
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