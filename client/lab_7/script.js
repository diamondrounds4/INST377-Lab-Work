document.addEventListener('DOMContentLoaded' , () => {
    
    async function windowActions() {
        console.log('loaded main script');
        const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
        const request = await fetch(url)
        const vendors_list = await request.json()
        const mymap = L.map('mapid').setView([51.505, -0.09], 13);

        console.log('external dataset', vendors_list);

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