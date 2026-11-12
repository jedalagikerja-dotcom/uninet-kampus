s=open('site/kampus/index.html').read();w=open('dev/walk.js.part').read()
m='// ---------- start ----------'
s=s.replace(m,w+'\n'+m)
s=s.replace("layoutMonument();layoutFence();loadOnline();","layoutMonument();layoutFence();buildSolids();loadOnline();")
o="setTimeout(()=>{const pt=cv.clientWidth/Math.max(1,cv.clientHeight)<.8;flyTo({tgt:[0,3,pt?3:0],dist:pt?52:46,yaw:.25,pitch:pt?.62:.42},2200)},300)"
assert o in s;s=s.replace(o,"setWalk(true)")
s=s.replace("<title>","<title>Jalan-jalan · ",1)
s=s.replace("body:not(.walk) #wbtn","@media (max-width:620px){#mode{right:auto;left:max(14px,env(safe-area-inset-left,0px));top:calc(env(safe-area-inset-top,0px) + 62px)}}\nbody:not(.walk) #wbtn")
open('site/kampus/jalan.html','w').write(s)
