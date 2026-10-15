(() => {
  const data = window.PORTAL_CONFIG || {};
  const $ = s => document.querySelector(s);
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const dateFmt = v => {
    if (!v) return "Data não informada";
    const d = new Date(`${v}T12:00:00`);
    return Number.isNaN(d.getTime()) ? esc(v) : d.toLocaleDateString("pt-BR");
  };
  function card(item, type) {
    const tag = item.category || type;
    const details = [item.date ? dateFmt(item.date) : "", item.time || ""].filter(Boolean).join(" · ");
    let contact = "";
    if (type === "Serviço" && item.contact) {
      const raw = String(item.contact);
      const href = /^https?:\/\//i.test(raw) ? raw : `tel:${raw.replace(/[^\d+]/g,"")}`;
      contact = `<p><b>Contato:</b> ${esc(raw)}</p>`;
    }
    return `<article class="content-card"><span class="tag ${type==="Bazar"?"orange-tag":""}">${esc(tag)}</span><h3>${esc(item.title || item.name || "Sem título")}</h3><p>${esc(item.description || "")}</p>${contact}${details?`<small>${esc(details)}</small>`:""}</article>`;
  }
  function render(id, items, type, emptyText) {
    const el = document.getElementById(id);
    if (!Array.isArray(items) || !items.length) {
      el.innerHTML = `<div class="empty">${esc(emptyText)}</div>`;
      return;
    }
    el.innerHTML = items.map(x => card(x,type)).join("");
  }
  function setupFilter({inputId, filtersId, gridId, items, type, emptyText}) {
    const input = document.getElementById(inputId), filters = document.getElementById(filtersId);
    let category = "Todos";
    const cats = ["Todos", ...new Set((items||[]).map(x=>x.category).filter(Boolean))];
    filters.innerHTML = cats.map(c=>`<button type="button" class="filter ${c==="Todos"?"active":""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    const draw = () => {
      const q = input.value.trim().toLocaleLowerCase("pt-BR");
      const filtered = (items||[]).filter(x => (category==="Todos" || x.category===category) && [x.name,x.title,x.description,x.category].join(" ").toLocaleLowerCase("pt-BR").includes(q));
      render(gridId, filtered, type, emptyText);
    };
    filters.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
      category=b.dataset.cat; filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b)); draw();
    }));
    input.addEventListener("input",draw);
    draw();
  }
  render("newsGrid",data.news,"Mural","Ainda não há publicações no mural. As informações serão adicionadas após revisão.");
  setupFilter({inputId:"serviceSearch",filtersId:"serviceFilters",gridId:"servicesGrid",items:data.services,type:"Serviço",emptyText:"Nenhum serviço cadastrado. Prestadores serão incluídos após verificação e autorização."});
  setupFilter({inputId:"marketSearch",filtersId:"marketFilters",gridId:"marketGrid",items:data.market,type:"Bazar",emptyText:"Ainda não há anúncios publicados. Os anúncios passam por curadoria antes de aparecer aqui."});
  render("eventsGrid",data.events,"Agenda","Nenhum evento cadastrado no momento.");
  render("lostGrid",data.lostFound,"Achados e perdidos","Nenhum aviso de achados e perdidos publicado no momento.");
  const number = String(data.whatsappNumber||"").replace(/\D/g,"");
  const btn = $("#whatsappButton");
  if(number){
    btn.href=`https://wa.me/${number}?text=${encodeURIComponent("Olá! Gostaria de enviar uma contribuição para o Portal do Portal.")}`;
    btn.target="_blank";btn.rel="noopener";btn.textContent="Enviar pelo WhatsApp";
    $("#contactLine").textContent="Contribuições e correções podem ser encaminhadas pelo WhatsApp.";
  } else {
    btn.addEventListener("click",e=>{e.preventDefault();alert("O WhatsApp ainda não foi configurado. Abra config.js e preencha whatsappNumber.");});
  }
  $("#year").textContent=new Date().getFullYear();
  const toggle=$("#menuToggle"),nav=$("#nav");
  toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");});
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));
  if("serviceWorker" in navigator && (location.protocol==="https:"||location.hostname==="localhost")){
    addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(e=>console.warn("Service worker não registrado",e)));
  }
})();