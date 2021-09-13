import{splitArray}from"./splitArray.js";import{eyeColor}from"./eyeColor.js";function renderCell(e,t=1){localStorage.getItem(e)||localStorage.setItem(e,JSON.stringify(e));e=localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)):e;let a=document.querySelector(".main-data"),n=document.querySelector(".about").clientWidth,r=splitArray(e.JSON)[t-1];a.innerHTML="",r.forEach(e=>{const t=document.createElement("tr");t.setAttribute("id",e.id),t.className="data-row",t.innerHTML=`
        <td class='first-name _cell' data-type='text'>${e.name.firstName}</td>
        <td class='last-name _cell' data-type='text'>${e.name.lastName}</td>
        <td class='about _cell' data-type='text'>${e.about.slice(0,n/4)+"..."}</td>
        <td class='eye-color _cell' data-type='text'>${e.eyeColor}</td>
    `,a.append(t);e=t.querySelector(".eye-color");eyeColor(e)})}function renderPagination(e){const t=localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)):e,a=document.querySelector(".table"),n=splitArray(t.JSON).length,r=document.createElement("div"),o=document.createElement("span");r.className="pagination",r.append(o);for(let e=0;e<n;e++){const l=document.createElement("div");l.className="pagination-number",l.innerHTML=e+1,0===e&&l.classList.add("current-pagination"),r.append(l)}a.insertAdjacentElement("beforebegin",r),renderActivePage(t)}function renderActivePage(a){const e=document.querySelectorAll(".pagination-number");e.forEach((e,t)=>{e.addEventListener("click",()=>{markActivePageInPagination(t),renderCell(a,t+1)})})}function markActivePageInPagination(a){const e=document.querySelectorAll(".pagination-number");e.forEach((e,t)=>{e.classList.contains("current-pagination")&&t!==a?e.classList.remove("current-pagination"):e.classList.contains("current-pagination")||t!==a||e.classList.add("current-pagination")})}export{renderCell,renderPagination};