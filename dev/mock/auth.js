const U={uid:'MEuid1234',isAnonymous:true};
export function getAuth(){return {currentUser:null}}
export function onAuthStateChanged(a,cb){setTimeout(()=>cb(null),10);return ()=>{}}
export async function signInAnonymously(a){a.currentUser=U;return {user:U}}
export class GoogleAuthProvider{setCustomParameters(){}}
export async function linkWithPopup(u){u.isAnonymous=false;u.email='tes@gmail.com';return {user:u}}
