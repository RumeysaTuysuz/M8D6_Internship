// Store students data in localStorage if not already available
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to render the table
function renderTable() {
    const tableBody = document.getElementById('studentTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    students.forEach(student => {
        const row = document.createElement('tr');

        // Calculate the average
        const average = ((student.midterm + student.final) / 2).toFixed(2);

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.number}</td>
            <td>${student.midterm}</td>
            <td>${student.final}</td>
            <td>${average}</td>
            <td>
                <button onclick="deleteStudent('${student.number}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to toggle table visibility
document.getElementById('toggleTableBtn').addEventListener('click', () => {
    const table = document.getElementById('studentTable');
    table.style.display = (table.style.display === 'none') ? 'table' : 'none';
});

// Function to show success or error messages
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.classList.add(type); // success or error
    alertBox.textContent = message;
    alertBox.style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(() => {
        alertBox.style.display = 'none';
        alertBox.classList.remove(type); // Remove class after hiding
    }, 3000);
}

// Add new student
document.getElementById('studentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const midterm = parseFloat(document.getElementById('midterm').value);
    const final = parseFloat(document.getElementById('final').value);

    if (name && number && !isNaN(midterm) && !isNaN(final)) {
        // Create new student object
        const student = { name, number, midterm, final };   
        students.push(student);

        // Save to localStorage
        localStorage.setItem('students', JSON.stringify(students));

        // Show success message
        showAlert("Student added successfully!", "success");

        // Clear form and re-render table
        document.getElementById('studentForm').reset();
        renderTable();
    } else {
        // Show error message if inputs are invalid
        showAlert("Please fill in all fields correctly.", "error");
    }
});

// Delete student by number
function deleteStudent(number) {
    students = students.filter(student => student.number !== number);
    localStorage.setItem('students', JSON.stringify(students));

    // Show success message
    showAlert("Student deleted successfully!", "success");

    renderTable();
}

// Initial rendering of the table
renderTable();
