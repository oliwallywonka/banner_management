import{aV as N,_ as S,D as p,u as _,aW as T,H as P,x as g,T as k,c as m,$ as v,aw as U,ax as u,M as d,a5 as C,o as O}from"./index-DnU1mwet.js";import{a as f,e as c}from"./groups-BoELxrBU.js";const R=N("screenPreview",()=>{const e=f(),i=S(),n=S(null);function s(){var o,a,E;e.socket&&e.credentials&&(console.log("LISTENING SCREEN PREVIEW EVENTS"),e.socket.on(c.SCREEN_UPDATE_STATUS,t=>{console.log("update status"),t.code===e.credentials.code&&(i.value=t)}),e.socket.on(c.GROUP_UNIQUE,t=>{n.value=t}),(o=e.socket)==null||o.on(c.SCREEN_CONTENT_PLAY,t=>{console.log("PLAYING",t),t.includes(e.credentials.code)&&r("playing")}),(a=e.socket)==null||a.on(c.SCREEN_CONTENT_PAUSE,t=>{console.log("PAUSED",t),t.includes(e.credentials.code)&&r("paused")}),(E=e.socket)==null||E.on(c.SCREEN_CONTENT_STOP,t=>{console.log("STOPPED",t),t.includes(e.credentials.code)&&r("stopped")}))}function r(o="active"){var a;(a=e.socket)==null||a.emit(c.SCREEN_UPDATE_STATUS,{code:e.credentials.code,status:o})}function l(){var o;e.socket&&e.credentials&&e.socket.emit(c.GROUP_UNIQUE,(o=i.value)==null?void 0:o.groupId)}return{screenPreview:i,currentGroup:n,listenEvents:s,setScreenStatus:r,getCurrentGroup:l}}),G=p({__name:"PreviewView",setup(e){const i=T(),n=f(),s=R(),r=_(()=>({code:i.params.code}));return P(()=>{console.log("disconnecting socket"),n.connect(r.value)}),g(()=>n.isConnected,l=>{l&&(s.listenEvents(),s.setScreenStatus("active"),s.getCurrentGroup())}),k(()=>{n.socket&&n.disconnect()}),(l,o)=>(O(),m(C,null,[v("h1",null,u(),1),U(" "+u(d(n).isConnected)+" "+u(JSON.stringify(d(n).credentials))+" "+u(JSON.stringify(d(s).screenPreview))+" "+u(JSON.stringify(d(s).currentGroup)),1)],64))}});export{G as default};
