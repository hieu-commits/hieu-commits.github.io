(() => {
 const root=document.getElementById("draggableId"), handle=document.getElementById("draggableIdHandle");
 if(!root||!handle)return;
 let active=false,pointer=null,sx=0,sy=0,ox=0,oy=0,x=0,y=0;
 const clamp=(v,min,max)=>Math.min(Math.max(v,min),max);
 const place=()=>{root.style.left=x+"px";root.style.top=y+"px";root.style.right="auto"};
 const init=()=>{const r=root.getBoundingClientRect();x=r.left;y=r.top;place()};
 handle.addEventListener("pointerdown",e=>{
  if((e.button!==undefined&&e.button!==0)||pointer!==null)return;
  init();active=true;pointer=e.pointerId;sx=e.clientX;sy=e.clientY;ox=x;oy=y;
  root.classList.add("is-dragging");handle.setPointerCapture?.(e.pointerId);e.preventDefault();
 });
 handle.addEventListener("pointermove",e=>{
  if(!active||e.pointerId!==pointer)return;
  const r=root.getBoundingClientRect();
  x=clamp(ox+e.clientX-sx,0,innerWidth-r.width);y=clamp(oy+e.clientY-sy,0,innerHeight-r.height);place();
 });
 const end=e=>{if(!active||(e.pointerId!==undefined&&e.pointerId!==pointer))return;active=false;pointer=null;root.classList.remove("is-dragging")};
 handle.addEventListener("pointerup",end);handle.addEventListener("pointercancel",end);
 addEventListener("resize",()=>{const r=root.getBoundingClientRect();x=clamp(x,0,innerWidth-r.width);y=clamp(y,0,innerHeight-r.height);place()});
})();