/* VK&S — Premium Interactions v4 | 2026 */
(function(){
  'use strict';

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.nav');
  const stt = document.querySelector('.stt');
  window.addEventListener('scroll', ()=>{
    const s = window.scrollY;
    nav?.classList.toggle('scrolled', s > 40);
    stt?.classList.toggle('show', s > 500);
    updateSvcNav();
  }, {passive:true});

  /* ── PARALLAX HERO ── */
  const heroBg = document.querySelector('.hero-bg');
  if(heroBg){
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.38}px)`;
    }, {passive:true});
  }

  /* ── HAMBURGER ── */
  const ham = document.querySelector('.ham');
  const drawer = document.querySelector('.drawer');
  ham?.addEventListener('click', ()=>{
    const open = ham.classList.toggle('open');
    drawer?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
    ham?.classList.remove('open');
    drawer?.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ── ACTIVE NAV ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .drawer a, .mob-nav-item').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ── SCROLL-TO-TOP ── */
  stt?.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  /* ── REVEAL OBSERVER ── */
  const revObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('vis');
        revObs.unobserve(e.target);
      }
    });
  },{threshold:0.08,rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.rv, .rv-scale').forEach(el=> revObs.observe(el));

  /* ── COUNTER ANIMATION ── */
  const countObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ animCount(e.target); countObs.unobserve(e.target); }
    });
  },{threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(el=> countObs.observe(el));

  function animCount(el){
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const dur = 2200, step = 14;
    let cur = 0;
    const inc = target / (dur / step);
    const t = setInterval(()=>{
      cur += inc;
      if(cur >= target){
        cur = target;
        clearInterval(t);
        // Gold flash on finish
        el.style.transition = 'color .3s';
        el.style.color = '#e8bf50';
        setTimeout(()=>{ el.style.color = ''; }, 600);
      }
      el.textContent = Math.floor(cur) + suffix;
    }, step);
  }

  /* ── TYPEWRITER HERO ── */
  const tw = document.querySelector('.hero-typewriter');
  if(tw){
    const cursor = tw.querySelector('.tw-cursor');
    const phrases = [
      'Audit & Assurance',
      'Direct Taxation',
      'Indirect Tax & GST',
      'Legal Services',
      'Debt Syndication',
      'Insolvency & IBC',
      'Business Advisory',
      'State Incentives'
    ];
    let pi = 0, ci = 0, deleting = false;
    const textNode = document.createElement('span');
    tw.insertBefore(textNode, cursor);

    function typeStep(){
      const phrase = phrases[pi];
      if(!deleting){
        textNode.textContent = phrase.slice(0, ++ci);
        if(ci === phrase.length){ deleting = true; setTimeout(typeStep, 2000); return; }
        setTimeout(typeStep, 68);
      } else {
        textNode.textContent = phrase.slice(0, --ci);
        if(ci === 0){ deleting = false; pi = (pi+1) % phrases.length; setTimeout(typeStep, 400); return; }
        setTimeout(typeStep, 38);
      }
    }
    setTimeout(typeStep, 1200);
  }

  /* ── TICKER DUPLICATE ── */
  const tickerInner = document.querySelector('.ticker-inner');
  if(tickerInner){
    const clone = tickerInner.cloneNode(true);
    tickerInner.parentNode.appendChild(clone);
  }

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||76;
        window.scrollTo({top: target.offsetTop - navH - 20, behavior:'smooth'});
      }
    });
  });

  /* ── SERVICES PAGE — Sidebar Active ── */
  function updateSvcNav(){
    const navLinks = document.querySelectorAll('.svc-nav a');
    if(!navLinks.length) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||76;
    const sections = document.querySelectorAll('.svc-section');
    let current = '';
    sections.forEach(s=>{
      if(window.scrollY >= s.offsetTop - navH - 60) current = '#' + s.id;
    });
    navLinks.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === current);
    });
  }

  /* ── FORM SUBMIT ── */
  const form = document.querySelector('.c-form form');
  form?.addEventListener('submit', e=>{
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Sending…';
    btn.disabled = true;
    setTimeout(()=>{
      btn.innerHTML = '✓ Message Sent — We\'ll be in touch!';
      btn.style.background = '#16a34a';
      form.reset();
      setTimeout(()=>{ btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 4000);
    }, 1200);
  });

  /* ── STAGGER DRAWER ITEMS ── */
  document.querySelectorAll('.drawer a').forEach((a, i)=>{
    a.style.animationDelay = `${i * 0.06 + 0.1}s`;
  });

})();
