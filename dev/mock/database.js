const store={online:{},chat:{}};const L=[];let n=0;
export const getDatabase=()=>({});export const ref=(db,p)=>({path:p||'',key:(p||'').split('/').pop()});
export const serverTimestamp=()=>Date.now();export const push=(r)=>({key:'k'+(++n)});
function fire(path,key,val,kind){for(const l of L)if(l.path===path&&l.kind===kind)l.cb({key,val:()=>val})}
export async function set(r,v){const [a,b]=r.path.split('/');const ex=store[a][b];store[a][b]=v;fire(a,b,v,ex?'changed':'added')}
export async function update(r,obj){window.__rate=(window.__rate||0)+1;if(window.__rate>2)throw new Error('PERMISSION_DENIED');for(const k in obj){const [a,b]=k.split('/');if(a==='chat'){store.chat[b]=obj[k];fire('chat',b,obj[k],'added')}}}
export const onDisconnect=()=>({remove(){}});export const query=(r)=>r;export const orderByChild=()=>0;export const limitToLast=()=>0;
export function onChildAdded(r,cb){L.push({path:r.path,kind:'added',cb});for(const k in store[r.path]||{})cb({key:k,val:()=>store[r.path][k]})}
export function onChildChanged(r,cb){L.push({path:r.path,kind:'changed',cb})}export function onChildRemoved(r,cb){L.push({path:r.path,kind:'removed',cb})}
export const goOffline=()=>{};export const goOnline=()=>{};
// pemain palsu
setTimeout(()=>{let t=0;const go=()=>{t+=1;set({path:'online/BOT1'},{n:'razakeysaa',x:Math.sin(t*.3)*3,z:22-t*.3,y:0,yaw:Math.PI,c:3,t:Date.now()})};go();setInterval(go,1000);
 set({path:'online/BOT2'},{n:'Nayla syantik',x:2.5,z:23.5,y:0,yaw:Math.PI,c:5,t:Date.now()});
 setTimeout(()=>{store.chat.c1={u:'BOT2',n:'Nayla syantik',m:'halo warga UNINET! kantinnya keren banget',t:Date.now()};fire('chat','c1',store.chat.c1,'added')},800)},300);
