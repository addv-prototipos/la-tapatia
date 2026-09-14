/* ADDV · Propuesta digital — interacciones */
(function(){
  "use strict";

  /* ---------- Config rápida (edita aquí) ---------- */
  var WHATSAPP_NUMBER = "523339567559";
  var NEGOCIO_NOMBRE  = "tu negocio de tortas y tacos ahogados";

  function waLink(mensaje){
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(mensaje);
  }
  document.querySelectorAll('[data-wa]').forEach(function(el){
    var msg = el.getAttribute('data-wa') || ("Hola ADDV, vi la propuesta digital y quiero platicar sobre " + NEGOCIO_NOMBRE + ".");
    el.setAttribute('href', waLink(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ---------- Top nav: fondo al hacer scroll ---------- */
  var topnav = document.querySelector('.topnav');
  function onScrollNav(){
    if(!topnav) return;
    if(window.scrollY > 40){ topnav.classList.add('scrolled'); }
    else{ topnav.classList.remove('scrolled'); }
  }
  document.addEventListener('scroll', onScrollNav, {passive:true});
  onScrollNav();

  /* ---------- Rail de progreso (puntos = slides) ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide[id]'));
  var rail = document.getElementById('rail');
  if(rail && slides.length){
    slides.forEach(function(s){
      var b = document.createElement('button');
      b.setAttribute('aria-label', s.getAttribute('data-label') || s.id);
      b.addEventListener('click', function(){
        s.scrollIntoView({behavior:'smooth'});
      });
      b.dataset.target = s.id;
      rail.appendChild(b);
    });
    var railButtons = Array.prototype.slice.call(rail.querySelectorAll('button'));
    var railObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          railButtons.forEach(function(b){
            b.classList.toggle('active', b.dataset.target === entry.target.id);
          });
        }
      });
    }, {threshold:.5});
    slides.forEach(function(s){ railObserver.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.18});
  revealEls.forEach(function(el){ revealObserver.observe(el); });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(function(other){
        if(other !== item){
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if(isOpen){
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Tabs de paquetes ---------- */
  var tabButtons = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('[data-panel]');
  tabButtons.forEach(function(btn){
    btn.addEventListener('click', function(){
      tabButtons.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var target = btn.dataset.tab;
      panels.forEach(function(p){
        p.style.display = (p.dataset.panel === target) ? 'grid' : 'none';
      });
    });
  });

  /* ---------- Canvas: onda de puntos (motivo de marca) ---------- */
  var canvas = document.getElementById('wave');
  if(canvas && canvas.getContext){
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, points = [];
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize(){
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      buildPoints();
    }
    function buildPoints(){
      points = [];
      var cols = Math.floor(w / 34);
      var rows = Math.floor(h / 34);
      for(var i=0;i<=cols;i++){
        for(var j=0;j<=rows;j++){
          points.push({
            x: (i/cols) * w,
            y: (j/rows) * h,
            baseY: (j/rows) * h,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    }
    var t = 0;
    function draw(){
      ctx.clearRect(0,0,w,h);
      t += reduceMotion ? 0 : 0.012;
      for(var i=0;i<points.length;i++){
        var p = points[i];
        var dist = Math.abs(p.x - w*0.72) / w;
        var amp = 14 * (1 - dist);
        var y = p.baseY + Math.sin(t*1.6 + p.x*0.01 + p.phase) * amp;
        var alpha = 0.12 + 0.5 * (1 - dist);
        ctx.beginPath();
        ctx.arc(p.x, y, 1.15, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(5,219,242,' + Math.max(0, Math.min(.65,alpha)) + ')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize();
    draw();
  }

})();
