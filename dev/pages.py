# Bangun versi GitHub Pages dari public/ ke folder tujuan
import sys,shutil,os,re
dst=sys.argv[1];API='https://ktm-universitas-netizenid.netlify.app/api/pagar'
if os.path.exists(dst):shutil.rmtree(dst)
shutil.copytree('site',dst)
open(dst+'/.nojekyll','w').close()
p=dst+'/index.html';s=open(p).read()
s=s.replace("'/api/pagar'","'"+API+"'").replace('href="/kampus/"','href="kampus/"')
open(p,'w').write(s)
for f in ['kampus/index.html','kampus/jalan.html']:
    p=dst+'/'+f;s=open(p).read()
    s=s.replace("API='/api/pagar'","API='"+API+"'")
    s=s.replace("ktmUrl: 'https://ktm-universitas-netizenid.netlify.app/'","ktmUrl: '../'")
    s=s.replace("setInterval(loadOnline,60000)","setInterval(loadOnline,180000)")
    open(p,'w').write(s)
print('ok')
