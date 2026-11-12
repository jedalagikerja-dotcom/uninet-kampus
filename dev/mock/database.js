const store={online:{},chat:{},names:{BOT1:'x',razakeysaa:'BOT1'},profiles:{}};const L=[];let n=0;
export const getDatabase=()=>({});export const ref=(db,p)=>({path:p||'',key:(p||'').split('/').pop()});
export const serverTimestamp=()=>Date.now();export const push=(r)=>({key:'k'+(++n)});
function fire(path,key,val,kind){for(const l of L)if(l.path===path&&l.kind===kind)l.cb({key,val:()=>val})}
export async function get(r){const [a,b]=r.path.split('/');const v=store[a]?store[a][b]:undefined;return {exists:()=>v!==undefined&&v!==null,val:()=>v===undefined?null:v}}
export async function set(r,v){const [a,b]=r.path.split('/');const ex=store[a][b];if(v===null){delete store[a][b];fire(a,b,null,'removed');return}store[a][b]=v;if(a==='online')fire(a,b,v,ex?'changed':'added')}
export async function update(r,obj){for(const k in obj){const [a,b]=k.split('/');if(a==='chat'){store.chat[b]=obj[k];fire('chat',b,obj[k],'added')}}}
export const onDisconnect=()=>({remove(){}});export const query=(r)=>r;export const orderByChild=()=>0;export const limitToLast=()=>0;
export function onChildAdded(r,cb){L.push({path:r.path,kind:'added',cb});for(const k in store[r.path]||{})cb({key:k,val:()=>store[r.path][k]})}
export function onChildChanged(r,cb){L.push({path:r.path,kind:'changed',cb})}export function onChildRemoved(r,cb){L.push({path:r.path,kind:'removed',cb})}
export const goOffline=()=>{};export const goOnline=()=>{};
setTimeout(()=>{set({path:'online/BOT1'},{n:'razakeysaa',x:1,z:22,y:0,yaw:Math.PI,c:3,t:Date.now()});set({path:'online/BOT2'},{n:'Tamu AB12',x:2.5,z:23.5,y:0,yaw:Math.PI,c:5,t:Date.now()})},300);
