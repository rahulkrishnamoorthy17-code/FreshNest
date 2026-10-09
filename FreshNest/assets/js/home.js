/* Phase 1 home interactions: prices are estimates, not a checkout. */
document.addEventListener('DOMContentLoaded',function(){
  'use strict';
  const rates={carpet:{label:'rooms',unit:999},sofa:{label:'seats',unit:599},mattress:{label:'mattresses',unit:1299},rug:{label:'rugs',unit:899},curtain:{label:'curtain sets',unit:1499},car:{label:'vehicles',unit:1599}};
  const addons={none:0,pet:399,protect:499,dry:299};
  const service=document.getElementById('est-service');
  const quantity=document.getElementById('est-quantity');
  const addon=document.getElementById('est-addon');
  const total=document.getElementById('est-total');
  const breakdown=document.getElementById('est-breakdown');
  const qtyLabel=document.querySelector('label[for="est-quantity"]');
  const booking=document.getElementById('estimate-book');
  function update(){
    const rate=rates[service.value];
    let n=Number(quantity.value);
    if(!Number.isFinite(n)||n<1)n=1;
    n=Math.min(20,Math.floor(n));
    qtyLabel.textContent='Number of '+rate.label;
    const subtotal=n*rate.unit;
    const add=addons[addon.value]||0;
    const visit=199;
    const amount=subtotal+add+visit;
    total.textContent=FreshNest.currency(amount);
    breakdown.textContent=n+' x '+FreshNest.currency(rate.unit)+' + '+FreshNest.currency(visit)+' visit charge'+(add?' + '+FreshNest.currency(add)+' add-on':'');
    booking.href='dashboard/book.html?service='+encodeURIComponent(service.value)+'&quantity='+n+'&addon='+encodeURIComponent(addon.value);
  }
  [service,quantity,addon].forEach(el=>{el.addEventListener('input',update);el.addEventListener('change',update);});
  quantity.addEventListener('blur',()=>{quantity.value=Math.max(1,Math.min(20,Math.floor(Number(quantity.value)||1)));update();});
  update();
  document.getElementById('price-estimator').addEventListener('submit',e=>e.preventDefault());
  const form=document.getElementById('newsletter-form');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const field=document.getElementById('newsletter-email');
    const status=document.getElementById('newsletter-status');
    const address=field.value.trim().toLowerCase();
    if(!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(address)){status.textContent='Enter a valid email address to continue.';field.setAttribute('aria-invalid','true');field.focus();return;}
    field.removeAttribute('aria-invalid');
    const list=FreshNest.read('newsletter',[]);
    if(!list.includes(address))FreshNest.write('newsletter',[...list,address]);
    status.textContent='Saved on this device for the demo. No email has been sent.';
    FreshNest.toast('Demo signup saved locally.');
    form.reset();
  });
});
