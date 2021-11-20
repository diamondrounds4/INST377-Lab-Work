document.addEventListener('DOMContentLoaded' , () => {
    
    async function windowActions() {
        console.log('loaded main script');
        const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
        const request = await fetch(url);
        const vendors_list = await request.json();
        
        const mymap = L.map('mapid').setView([38.989, -76.93], 12);
        console.log(mymap)
        const access_token = "pk.eyJ1Ijoic2Ftc29uam9zZXBoMjUiLCJhIjoiY2t1b2Y0OGoxMDRvZjJva2IzYzVlemJ6dSJ9.jkhey_GJUGycclVWyny8JA"
        L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${access_token}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoic2Ftc29uam9zZXBoMjUiLCJhIjoiY2t1b2Y0OGoxMDRvZjJva2IzYzVlemJ6dSJ9.jkhey_GJUGycclVWyny8JA'
        }).addTo(mymap);

        const marker = L.marker([51.5, -0.09]).addTo(mymap);
        

        function findMatches(wordToMatch, vendors_list) {
            return vendors_list.filter(term => {
                const regex = new RegExp(wordToMatch, 'gi')
                return term.zip.match(regex)
            });
        }

        function displayMatches(event) {
            const matchArray = findMatches(event.target.value, vendors_list)
            const html = matchArray.map(term => {
                return `
                    <li class="organization"> 
                        <span class="name">${term.name}</span>
                    </li>
                    
                    <li>
                        <span class="address">${term.address_line_1}</span>
                    </li>
                
                    <li>
                        <span class="zip">${term.zip}</span>
                    </li>
                `;
            }).join(' ,'); 
            suggestions.innerHTML = html;
        }

        const searchInput = document.querySelector('.search');
        const suggestions = document.querySelector('.suggestions');

        searchInput.addEventListener('change', (evt) => {displayMatches(evt)});
        searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)});
    }    

    window.onload = windowActions;

})