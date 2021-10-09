document.addEventListener('DOMContentLoaded' , () => {
    import { json } from "body-parser";
    const data = 'data.json';
    const request = await fetch(data)
    const vendors_list = await request.json()

    async function windowActions() {
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
            const matchArray = findMatches(event.value, vendors_list)
            const html = matchArray.map(term => {
                const regex = new RegExp(event.value, 'gi');
                const company_name = term.name.replace(regex, `<span class "h1">
                    ${event.company_name.value}</span>`);
                const catergory_name = term.category.replace(regex, `<span class "h1">
                    ${event.category.value}</span>`);
                const address = term.address_line_1.replace(regex, `<span class "h1">
                    ${event.address.value}</span>`);
                const city_name = term.city.replace(regex, `<span class "h1">
                    ${event.city.value}</span>`);
                const zip_code = term.zip.replace(regex, `<span class "h1">
                    ${event.zip_code.value}</span>`);  
                return `
                    <li> 
                        <span class="name">${company_name}</span>
                        <span class="category">${catergory_name}</span>
                        <span class="address">${address}</span>
                        <span class="city">${city_name}</span>    
                        <span class="zip">${zip_code}</span>
                    </li>
                `;
            }).join('');
            suggestions.innerHTML = html;
        }

        const searchInput = document.querySelector('.search');
        const suggestions = document.querySelector('.suggestions')

        searchInput.addEventListener('change', displayMatches)
        searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)})
    }    

    window.onload = windowActions();

})