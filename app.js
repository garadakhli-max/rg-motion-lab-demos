(function(){
  "use strict";
  const items = window.CONCEPTS || [];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const photo = (id, width=1500) => "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + width + "&q=85";
  const url = s => encodeURI(s);
  const selected = new URLSearchParams(window.location.search).get("demo");
  const item = items.find(x=>x.id===selected);
  const app = document.getElementById("app");
  const maps = it => "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(it.name+" "+it.address);
  const contact = it => it.phone ? '<a class="button primary" href="tel:'+esc(it.phone)+'">CALL '+esc(it.showPhone)+'</a>' : '<a class="button primary" target="_blank" rel="noopener" href="'+maps(it)+'">FIND THE LOCATION</a>';
  function photoWrap(id, cls, txt){
    return '<div class="'+cls+'" style="background-image:url(\''+photo(id)+'\')"><span class="picture-label">'+esc(txt)+'</span></div>';
  }
  function home(){
    document.body.className="hub";
    document.title="Global Local — Independent Website Design Concepts";
    const totals = [{c:"US",name:"United States"},{c:"CA",name:"Canada"},{c:"AU",name:"Australia"}].map(t=>({...t,n:items.filter(i=>i.code===t.c).length}));
    app.innerHTML = '<div class="hub-shell"><header class="hub-nav"><a class="hub-logo" href="?">LOCAL<span> / </span>STUDIES.</a><span>AN INDEPENDENT DESIGN INITIATIVE · 2026</span></header>'+
      '<section class="hub-hero"><div class="hub-overline">SELECTED SMALL BUSINESSES · THREE COUNTRIES</div><h1>Places with <em>potential.</em><br>Websites with personality.</h1><p>Independently imagined website concepts for local businesses that could benefit from a more distinctive online presence. Each study is an unofficial design exploration, built from public business information.</p><div class="hub-stats">'+totals.map(t=>'<div><strong>'+t.n+(t.c==="US"?' <small>/ 50 US TARGET</small>':'')+'</strong><span>'+t.name+'</span></div>').join("")+'</div></section>'+
      '<section class="hub-gallery"><div class="hub-section-head"><div><span>THE CURRENT COLLECTION</span><h2>'+items.length+' distinct directions.</h2></div><p>Independent design concepts. No affiliation with the listed businesses.</p></div><div class="hub-grid">'+items.map((it,i)=>'<a class="hub-card" href="'+(it.path?esc(it.path):'?demo='+encodeURIComponent(it.id))+'"><div class="hub-cover" style="background-image:linear-gradient(180deg,transparent 20%,rgba(0,0,0,.50)),url(\''+photo(it.image,900)+'\')"><span>'+esc(it.mark)+'</span></div><div class="hub-card-detail"><div><b>'+esc(it.name)+'</b><small>'+esc(it.city)+' · '+esc(it.category)+'</small></div><span class="country-chip">'+esc(it.code)+'</span></div></a>').join("")+'</div></section>'+
      '<footer class="hub-footer">Independent, unsolicited design studies. Images are illustrative stock photography; all business details should be checked with the respective owner before commercial use. <a href="mailto:hello.rgmotionlab@gmail.com">CONTACT RG MOTION LAB</a></footer></div>';
  }
  function demo(it){
    const ix=items.indexOf(it);
    const photo2=it.detailImage||it.image;
    const hasEmail=!!it.email;
    document.title=it.name+" — Unofficial Website Design Concept";
    document.body.className="demo theme-"+it.template;
    document.body.style.setProperty("--brand",it.color);
    document.body.style.setProperty("--accent",it.accent);
    const action=contact(it);
    const kicker=esc(it.eyebrow),title=esc(it.title),name=esc(it.name);
    app.innerHTML='<div class="concept-notice">UNOFFICIAL WEBSITE DESIGN CONCEPT <span>·</span> Not the business’s current site <span>·</span> Photos are illustrative</div>'+
      '<div class="site-shell"><header class="site-nav"><a href="?demo='+encodeURIComponent(it.id)+'" class="brand-lockup">'+esc(it.mark)+'</a><nav aria-label="Page sections"><a href="#about">THE IDEA</a><a href="#services">EXPLORE</a><a href="#visit">VISIT</a></nav><a class="nav-contact" href="#visit">GET IN TOUCH</a></header>'+
      '<section class="hero"><div class="hero-text"><div class="eyebrow">'+kicker+'</div><h1>'+title+'</h1><p class="deck">'+esc(it.description)+'</p><div class="hero-buttons">'+action+'<a class="button secondary" href="#about">DISCOVER THE CONCEPT</a></div><div class="hero-bottom">'+esc(it.category)+' <span>·</span> '+esc(it.city)+'</div></div>'+
        photoWrap(it.image,"hero-photo","ILLUSTRATIVE PHOTOGRAPHY")+
        '<div class="hero-decoration" aria-hidden="true"><span>'+esc(it.mark)+'</span></div></section>'+
      '<section class="intro-section" id="about"><div class="section-sup">THE FEELING</div><h2>'+esc(it.intro)+'</h2><div class="intro-caption"><p>'+esc(it.line)+'</p><span>CREATIVE CONCEPT FOR '+name+'</span></div></section>'+
      '<section class="features-section" id="services"><div class="features-head"><span>WHY IT MATTERS</span><h2>Made for the way people discover local places.</h2></div><div class="feature-list">'+it.features.map((f,i)=>'<article class="feature"><span class="feature-index">0'+(i+1)+'</span><h3>'+esc(f)+'</h3><p>'+esc(i===0?"A clear introduction to the business.":i===1?"A carefully composed section that builds confidence.":"An uncomplicated next step for the visitor.")+'</p></article>').join("")+'</div></section>'+
      '<section class="statement-section">'+photoWrap(photo2,"statement-photo","ILLUSTRATIVE PHOTOGRAPHY")+'<div class="statement-text"><span>THE EXPERIENCE</span><h2>'+esc(it.line)+'</h2><p>'+esc(it.support)+'</p><a href="#visit" class="text-link">LOCATION & CONTACT DETAILS</a></div></section>'+
      '<section class="visit-section" id="visit"><span class="section-sup">FIND THE BUSINESS</span><h2>Make the next visit easy.</h2><div class="visit-grid"><div><span>ADDRESS</span><h3>'+esc(it.address)+'</h3><a href="'+maps(it)+'" target="_blank" rel="noopener">OPEN IN GOOGLE MAPS</a></div><div><span>CONTACT</span><h3>'+(it.showPhone ? esc(it.showPhone) : "Via public listing")+'</h3>'+(it.phone?'<a href="tel:'+esc(it.phone)+'">CALL THE BUSINESS</a>':'<a target="_blank" rel="noopener" href="'+esc(it.source)+'">SEE LISTING DETAILS</a>')+'</div></div></section>'+
      '<footer class="site-footer"><div class="footer-brand">'+esc(it.mark)+'</div><div class="footer-small">Independent design concept by RG Motion Lab.<br>This is NOT the official website of '+name+'. Generic stock photographs do not show the actual venue, staff or work. Published listings may be inaccurate. Any final commercial site needs the business owner’s approval and licensed content rights.<br><a href="'+esc(it.source)+'" target="_blank" rel="noopener">PUBLIC BUSINESS LISTING SOURCE</a> <span>·</span> <a href="mailto:hello.rgmotionlab@gmail.com?subject='+encodeURIComponent("Website concept discussion — "+it.name)+'">DISCUSS THIS DESIGN</a> <span>·</span> <a href="?">ALL CONCEPTS</a></div></footer></div>';
    const images=app.querySelectorAll(".hero-photo,.statement-photo");
    images.forEach(el=>el.setAttribute("role","img"));
  }
  // Historical ?demo= links now lead to each venue's new independent HTML edition.
  if(item?.path) window.location.replace(new URL(item.path,window.location.href).href);
  else if(item) demo(item);
  else home();
})();
