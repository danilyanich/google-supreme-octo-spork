(function(){var t;document.forms.search.onsubmit=function(t){return t.preventDefault(),window.location.href="https://www.google.by/search?q="+document.forms.search.search.value},t=[{position:-2001,title:"Search",link:"https://www.google.com"},{position:-483,title:"Play",link:"https://play.google.com"},{position:-1035,title:"Mail",link:"https://mail.google.com"},{position:-897,title:"Drive",link:"https://drive.google.com"},{position:-1794,title:"Calendar",link:"https://www.google.com/calendar"},{position:-1242,title:"Account",link:"https://myaccount.google.com"},{position:-621,title:"Maps",link:"https://maps.google.com"},{position:-966,title:"YouTube",link:"https://www.youtube.com"},{position:-1104,title:"Translate",link:"https://translate.google.com"},{position:-69,title:"Photos",link:"https://photos.google.com"}],document.addEventListener("DOMContentLoaded",function(e){var o,i,n,l,r,s,c;for(document.querySelector("figure.google-logo img").src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2000px-Google_2015_logo.svg.png",r=document.querySelector("section.apps figure.card"),c=document.getElementById("app-template").content,s=[],n=0,l=t.length;n<l;n++)o=t[n],(i=c.cloneNode(!0)).querySelector("figure").style["background-position-y"]=o.position+"px",i.querySelector(".caption").innerText=o.title,i.querySelector("a").href=o.link,s.push(r.appendChild(i));return s}),HTMLElement.prototype.querySelectorParent=function(t){var e;for(e=this;e;){if(!e.matches)return!1;if(e.matches(t))return e;e=e.parentNode}return!1},document.querySelector("body").addEventListener("click",function(t){var e,o,i,n,l,r,s;if(e=t.target.querySelectorParent(".ripple"))return n=e.getBoundingClientRect(),r=0,s=0,t.target!==e&&(r=(o=t.target.getBoundingClientRect()).left-n.left,s=o.top-n.top),i=2*Math.max(n.width,n.height),(l=document.createElement("div")).classList.add("inside"),l.style.height=i+"px",l.style.width=i+"px",l.style.zIndex=""+(parseInt(e.style.zIndex,10)+1),e.matches(".centered")?(l.style.left=n.width/2+"px",l.style.top=n.height/2+"px"):(l.style.left=t.offsetX+(r||0)+"px",l.style.top=t.offsetY+(s||0)+"px"),e.appendChild(l),setTimeout(function(){return e.removeChild(l)},3e3)})}).call(this);