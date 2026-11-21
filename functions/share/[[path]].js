export async function onRequest(context) {
  const url = new URL(context.request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const type = parts[1];
  const id = String(parts[2] || "");
  if (!["news", "products"].includes(type) || !/^[A-Za-z0-9_-]{1,128}$/.test(id)) {
    return new Response("Not Found", { status: 404 });
  }
  const label = type === "news" ? "お知らせ" : "プロダクト";
  const html = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#f5f6fa"><title>${label} | みかん</title>
<link rel="canonical" href="${url.origin}/share/${type}/${encodeURIComponent(id)}/">
<style>
*{box-sizing:border-box}body{margin:0;background:#f5f6fa;color:#20283f;font-family:system-ui,-apple-system,"Noto Sans JP",sans-serif;line-height:1.85}
header{background:#fff;border-bottom:1px solid #e8eaf0;padding:18px max(22px,calc((100% - 900px)/2));font-weight:800}
header a{color:inherit;text-decoration:none}main{max-width:900px;margin:42px auto;padding:0 22px}
.card{background:#fff;border:1px solid #e8eaf0;border-radius:24px;padding:clamp(22px,5vw,48px);box-shadow:0 12px 36px #1e2b580c}
.tag{display:inline-block;background:#fff1e9;color:#d66b36;padding:3px 13px;border-radius:30px;font-size:12px;font-weight:700}
h1{font-size:clamp(27px,5vw,42px);line-height:1.4;margin:18px 0 12px}.date{color:#9299a9;font-size:13px}
.content{margin-top:28px;padding-top:24px;border-top:1px solid #edf0f5;overflow-wrap:anywhere}
.content img{max-width:100%;height:auto;border-radius:12px}.content a{color:#d66b36}.content pre{white-space:pre-wrap;overflow:auto}
.back{display:inline-block;margin-top:26px;color:#d66b36;text-decoration:none;font-weight:700}
.state{color:#687187;text-align:center;padding:36px 12px}.error{color:#b45309}
.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.actions button{border:1px solid #e8eaf0;background:#fff;border-radius:999px;padding:9px 16px;font:inherit;cursor:pointer}
</style></head><body><header><a href="/">Mikan / みかん</a></header>
<main><article class="card" id="article"><div class="state">記事を読み込んでいます…</div></article></main>
<script src="/assets/js/config.js"></script>
<script>
(async function(){
 const type=${JSON.stringify(type)}, id=${JSON.stringify(id)};
 const config=type==="news"?STATE.cmsConfig:STATE.productCmsConfig;
 const root=document.getElementById("article");
 const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const cleanHtml=value=>{
   const template=document.createElement("template"); template.innerHTML=String(value||"");
   const allowed=new Set(["P","BR","STRONG","B","EM","I","U","S","UL","OL","LI","H1","H2","H3","H4","BLOCKQUOTE","PRE","CODE","A","IMG","FIGURE","FIGCAPTION","TABLE","THEAD","TBODY","TR","TH","TD","HR","DIV","SPAN"]);
   const blocked=new Set(["SCRIPT","STYLE","IFRAME","OBJECT","EMBED","FORM","INPUT","BUTTON","SVG","VIDEO","AUDIO"]);
   const walk=parent=>Array.from(parent.children).forEach(node=>{
     if(blocked.has(node.tagName)){node.remove();return} walk(node);
     if(!allowed.has(node.tagName)){node.replaceWith(...node.childNodes);return}
     Array.from(node.attributes).forEach(a=>{
       const ok=(node.tagName==="A"&&a.name==="href")||(node.tagName==="IMG"&&["src","alt","title"].includes(a.name))||(["TH","TD"].includes(node.tagName)&&["colspan","rowspan"].includes(a.name));
       if(!ok)node.removeAttribute(a.name);
     });
     if(node.tagName==="A"){try{const u=new URL(node.getAttribute("href"),location.origin);if(!["https:","http:","mailto:"].includes(u.protocol))node.removeAttribute("href");else{node.target="_blank";node.rel="noopener noreferrer"}}catch{node.removeAttribute("href")}}
     if(node.tagName==="IMG"){try{const u=new URL(node.getAttribute("src"),location.origin);if(!["https:","http:"].includes(u.protocol))node.remove();else{node.loading="lazy";node.decoding="async"}}catch{node.remove()}}
   });
   walk(template.content);return template.innerHTML;
 };
 try{
   let item=null,offset=0,total=Infinity;
   while(offset<total&&offset<1000){
     const endpoint="https://"+config.serviceDomain+".microcms.io/api/v1/"+config.endpoint+"?limit=100&offset="+offset;
     const response=await fetch(endpoint,{headers:{"X-MICROCMS-API-KEY":config.apiKey}});
     if(!response.ok)throw new Error("一覧取得エラー (HTTP "+response.status+")");
     const data=await response.json(),items=Array.isArray(data.contents)?data.contents:[];
     item=items.find(entry=>entry&&entry.id===id)||null;
     if(item)break;
     total=Number(data.totalCount)||0;if(!items.length)break;offset+=items.length;
   }
   if(!item){root.innerHTML='<div class="state">この記事は見つかりませんでした。<br><a class="back" href="/'+type+'/">一覧へ戻る</a></div>';return}
   const heading=item.title||item.name||(type==="news"?"お知らせ":"プロダクト");
   const cv=item.category,category=Array.isArray(cv)?(cv[0]?.name||cv[0]||""):(cv?.name||cv?.title||cv||(type==="news"?"お知らせ":"プロダクト"));
   const body=item.content||item.body||item.description||item.summary||"";
   const date=item.publishedAt||item.createdAt||item.updatedAt||"";
   const dateText=date?new Date(date).toLocaleDateString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}):"";
   const canonical=location.href; document.title=heading+" | みかん";
   root.innerHTML='<span class="tag">'+esc(category)+'</span><h1>'+esc(heading)+'</h1>'+(dateText?'<div class="date">'+esc(dateText)+'</div>':'')+'<div class="content">'+(body?cleanHtml(body):'<p>本文はありません。</p>')+'</div>'+(type==="products"&&(item.url||item.link||item.siteUrl)?'<p><a class="back" href="'+esc(item.url||item.link||item.siteUrl)+'" target="_blank" rel="noopener noreferrer">サイト・作品を見る ↗</a></p>':'')+'<div class="actions"><button id="copy">リンクをコピー</button><button id="share">共有する</button></div><a class="back" href="/'+type+'/">← '+(type==="news"?"お知らせ":"プロダクト")+'一覧へ戻る</a>';
   document.getElementById("copy").onclick=async()=>{try{await navigator.clipboard.writeText(canonical);alert("リンクをコピーしました")}catch{prompt("リンクをコピーしてください",canonical)}};
   document.getElementById("share").onclick=async()=>{if(navigator.share){try{await navigator.share({title:heading,url:canonical})}catch(e){if(e.name!=="AbortError")alert("共有できませんでした")}}else{document.getElementById("copy").click()}};
 }catch(error){root.innerHTML='<div class="state error">ページを読み込めませんでした。<br><small>'+esc(error.message||"通信エラー")+'</small><br><a class="back" href="/'+type+'/">一覧へ戻る</a></div>'}
})();
</script></body></html>`;
  return new Response(html, { headers: {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store, max-age=0"
  }});
}
