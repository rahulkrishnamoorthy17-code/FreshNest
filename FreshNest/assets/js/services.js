/* Services catalogue and individual service details. */
(function(){'use strict';
 const items=window.FreshNestServices||[];
 const filters=[...document.querySelectorAll('[data-service-filter]')];
 const search=document.getElementById('service-search');
 let active='All';
 function applyFilters(){
   const term=(search?.value||'').trim().toLowerCase();let visible=0;
   document.querySelectorAll('[data-service-card]').forEach(card=>{
     const show=(active==='All'||card.dataset.group===active)&&card.dataset.name.includes(term);
     card.hidden=!show;if(show)visible++;
   });
   const count=document.getElementById('service-count');if(count)count.textContent=visible+' '+(visible===1?'service':'services');
   const empty=document.getElementById('empty-services');if(empty)empty.hidden=visible!==0;
 }
 filters.forEach(button=>button.addEventListener('click',()=>{active=button.dataset.serviceFilter;filters.forEach(b=>{const yes=b===button;b.classList.toggle('is-active',yes);b.setAttribute('aria-pressed',String(yes));});applyFilters();}));
 search?.addEventListener('input',applyFilters);
 const title=document.getElementById('detail-title');
 if(title){const id=new URLSearchParams(location.search).get('service')||'sofa';const item=items.find(s=>s.id===id)||items.find(s=>s.id==='sofa');
   if(item){title.textContent=item.name;document.title=item.name+' | FreshNest Steam Cleaning';
   const select=(id)=>document.getElementById(id);
   select('detail-category').textContent=item.category+' care';select('detail-lede').textContent=item.description;
   select('detail-description').textContent=item.description+' At the end of the service, the technician gives practical advice on ventilation, safe use and whether any marks need additional specialist attention.';
   select('detail-price').textContent='Rs. '+item.price.toLocaleString('en-IN');select('detail-duration').textContent=item.duration;
   const picture=select('detail-image');picture.src=item.detail;picture.alt='Original conceptual illustration for '+item.name.toLowerCase();
   ['detail-book','detail-aside-book','detail-bottom-book'].forEach(name=>select(name).href='dashboard/book.html?service='+encodeURIComponent(item.id));
   }
 }
})();
