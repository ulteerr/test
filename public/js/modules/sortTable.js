function eventSortTable(){const e=document.querySelectorAll("th");e.forEach((t,r)=>{t.addEventListener("click",()=>{checkSelectedTh(r),t.dataset.order&&"-1"!==t.dataset.order?"1"===t.dataset.order&&t.setAttribute("data-order",-1):t.setAttribute("data-order",1);var e=t.dataset.order;t.classList.add("selected"),sortTable(r,e)})})}function checkSelectedTh(r){const e=document.querySelectorAll("th");e.forEach((e,t)=>{e.classList.contains("selected")&&t!==r&&(e.classList.toggle("selected"),e.removeAttribute("data-order"))})}function sortTable(r,a){const e=document.querySelectorAll(".data-row"),t=document.querySelector(".main-data");var o=Array.from(e).sort((e,t)=>e.cells[r].innerHTML>t.cells[r].innerHTML?a:-a);t.append(...o)}export{eventSortTable};