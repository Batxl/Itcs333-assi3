// API URL
const apiUrl = 'https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100';

// Fetch data
function fetchData() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const results = data.results;
            if (results && results.length > 0) {
                populateTable(results);
            } else {
                showErrorMessage('No data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            showErrorMessage('Failed to load data.');
        });
}

//API data
function populateTable(data) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = ''; 

    data.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.year || 'Unknown'}</td>
            <td>${record.semester || 'Unknown'}</td>
            <td>${record.the_programs || 'Unknown'}</td>
            <td>${record.nationality || 'Unknown'}</td>
            <td>${record.colleges || 'Unknown'}</td>
            <td>${record.number_of_students || '0'}</td>
        `;
        tableBody.appendChild(row);
    });
}

//error message in the table
function showErrorMessage(message) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="6">${message}</td>
        </tr>
    `;
}

fetchData();
