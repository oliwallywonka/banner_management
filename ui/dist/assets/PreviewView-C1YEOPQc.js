import{aV as E,_ as S,D as N,u as f,aW as _,H as T,x as p,T as m,c as P,$ as g,aw as v,ax as i,M as l,a5 as C,o as k}from"./index-uNcyoz12.js";import{a as d,e as r}from"./groups-DhEzrZHr.js";const w=E("screenPreview",()=>{const n=d(),a=S();function t(){var c,o,u;n.socket&&n.credentials&&(console.log("LISTENING SCREEN PREVIEW EVENTS"),n.socket.on(r.SCREEN_UPDATE_STATUS,e=>{console.log("update status"),e.id===n.credentials.screenId&&(a.value=e)}),(c=n.socket)==null||c.on(r.SCREEN_CONTENT_PLAY,e=>{console.log("PLAYING",e),e.includes(n.credentials.screenId)&&s("playing")}),(o=n.socket)==null||o.on(r.SCREEN_CONTENT_PAUSE,e=>{console.log("PAUSED",e),e.includes(n.credentials.screenId)&&s("paused")}),(u=n.socket)==null||u.on(r.SCREEN_CONTENT_STOP,e=>{console.log("STOPPED",e),e.includes(n.credentials.screenId)&&s("stopped")}))}function s(c="active"){var o;(o=n.socket)==null||o.emit(r.SCREEN_UPDATE_STATUS,{id:n.credentials.screenId,status:c})}return{screenPreview:a,listenEvents:t,setScreenStatus:s}}),R=N({__name:"PreviewView",setup(n){const a=_(),t=d(),s=w(),c=f(()=>({screenId:Number(a.params.screenId),rol:"admin"}));return T(()=>{console.log("disconnecting socket"),t.connect(c.value)}),p(()=>t.isConnected,o=>{o&&(s.listenEvents(),s.setScreenStatus("active"))}),m(()=>{t.socket&&t.disconnect()}),(o,u)=>{var e;return k(),P(C,null,[g("h1",null,i(),1),v(" "+i(l(t).isConnected)+" "+i(JSON.stringify(l(t).credentials))+" "+i(JSON.stringify((e=l(s).screenPreview)==null?void 0:e.status)),1)],64)}}});export{R as default};
