// Script da navbar componentizada (aprendi hoje)
fetch('/components/navbar.html').then(res => res.text()).then(data => document.getElementById('navbar').innerHTML = data);