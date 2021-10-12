document.addEventListener('DOMContentLoaded' , () => {
    
    async function windowActions() {
        const data = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
        const request = await fetch(data)
        const vendors_list = await request.json()

        function findMatches(wordToMatch, vendors_list) {
            return vendors_list.filter(term => {
                const regex = new RegExp(wordToMatch, 'gi')
                return term.name.match(regex) || 
                term.category.match(regex) || 
                term.address_line_1.match(regex) ||
                term.city.match(regex) ||
                term.zip.match(regex)
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
                        <span class="category">${term.category}</span>
                    </li>
                    
                    <li>
                        <span class="address">${term.address_line_1}</span>
                    </li>
                
                    <li>    
                        <span class="city">${term.city}</span>    
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