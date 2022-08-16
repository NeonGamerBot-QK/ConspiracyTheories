
console.log('Made by an Sfs student :)')

function createTitle(text, doc, namespace) {
   const exists = document.getElementById(`${namespace}-title`)
    if(!exists) {
      const title = document.createElement('h1');
    title.innerText = text;
    title.id = namespace+'-title'
    if(namespace == 'area51') title.className = 'redd'
    doc.append(title)
    } else {
      exists.innerText = text;
    }
}
function createFooter(text, doc, namespace) {
  const exists = document.getElementById(`${namespace}-footer`)
  if(!exists) {
    const f = document.createElement('footer');
    f.innerText = text;
    f.id = namespace+'-footer'
   setTimeout(() => doc.append(f),1)
  } else {
    exists.innerText = text;
  }
}
function createSources (sources, doc, namespace) {
  
    doc.append(document.createElement('br'))
    let title = document.createElement('h2')
    title.innerText= 'Sources'
    doc.append(title)
    sources.forEach((link, i) => {
    doc.append(document.createElement('br'))
    const f = document.createElement('a');
    f.href = link;
    f.innerText = link;
    f.id = namespace+'-source-'+i
    f.className = 'sources blu'
  doc.append(f)
  
    doc.append(document.createElement('br'))
    })
    doc.append(document.createElement('br'))

}
function createBody(filename, doc, namespace) {
    return new Promise((resolve, reject) => {
  const exists = document.getElementById(`${namespace}-body`)
    if(!exists){
        const p = document.createElement('p')
    p.className = 'lead'
    p.id = `${namespace}-body`
 fetch(`/${filename}`).then(res => res.text()).then(text => {
        p.innerHTML = ejs.render(text);
    doc.append(p)
    resolve()
 })
    } else {
fetch(`/${filename}`).then(res => res.text()).then(text => {
        exists.innerHTML = ejs.render(text);
         resolve()
 })
    }
    })
}
function refresh() {
    if(window.location.pathname.toLowerCase() == '/area51') {
     // console.log(ejs)
        fetch('/area51.json').then(res => res.json()).then(async ({ title, footer, body,  sources }) => {
            const div = document.getElementById('area51')
            if(title) {
                createTitle(title, div, 'area51')
            }
            if(body) await createBody(body, div, 'area51') 
            
            if(footer) {
                createFooter(footer, div, 'area51')
            }
            if(sources && Array.isArray(sources)) {
              createSources(sources, div, 'area51')
            }
            
        })
    } else if(window.location.pathname.toLowerCase() == '/flatearth'){
fetch('/flatearth.json').then(res => res.json()).then(async ({ title, footer, body, sources }) => {
            const div = document.getElementById('flatearth')
            if(title) {
                createTitle(title, div, 'flatearth')
            }
            if(body) await createBody(body, div, 'flatearth') 
            
            if(footer) {
                createFooter(footer, div, 'flatearth')
            }
            if(sources && Array.isArray(sources)) {
              createSources(sources, div, 'flatearth')
            }
        })
    
    }
    else if(window.location.pathname === '/pizzaflu') {
      fetch('/michealjordan.json').then(res => res.json()).then(async ({ title, footer, body, sources }) => {
            const div = document.getElementById('michal')
            if(title) {
                createTitle(title, div, 'michal')
            }
            if(body) await createBody(body, div, 'michal') 
            
            if(footer) {
                createFooter(footer, div, 'michal')
            }
            if(sources && Array.isArray(sources)) {
              createSources(sources, div, 'michal')
            }
        })
    
    }    else if(window.location.pathname === '/palm') {
      fetch('/palmcartiny.json').then(res => res.json()).then(async ({ title, footer, body, sources }) => {
            const div = document.getElementById('palm')
            if(title) {
                createTitle(title, div, 'michal')
            }
            if(body) await createBody(body, div, 'michal') 
            
            if(footer) {
                createFooter(footer, div, 'michal')
            }
            if(sources && Array.isArray(sources)) {
              createSources(sources, div, 'michal')
            }
        })
    
    }     else {
      console.log('A home page :)')
    }
}
refresh()
// var isDark = false;
// function Toggle() {
//   document.body.style.backgroundColor = isDark ? '#FFFFFF' : '#111'
//   // document.getElementsByClassName('div').forEach(div => {
//   //   div.style.backgroundColor = isDark ? '#FFFFFF' : '#111'
//   // })
  
//   document.getElementById('navbar').classList.toggle("dark-mode");
//   document.getElementById('footer').classList.toggle("dark-mode");
// isDark ? isDark = false : isDark = true;
// document.getElementById('mode').innerHTML = isDark ? 'light' : 'dark'
// }
var interval;
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
   // interval = setInterval(refresh,15000)
//document.getElementById('mode').innerHTML = 'dark'
});