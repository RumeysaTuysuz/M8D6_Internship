import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"; 

export default class extends Controller {
    static targets = ["tableBody", "studentTable", "alertBox"];

    connect() {
        this.students = JSON.parse(localStorage.getItem('students')) || []; // Load from localStorage or empty array
        this.renderTable(); // Render the student table
    }

    addStudent(event) {
        event.preventDefault();

        // Get input values from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get("name");
        const number = urlParams.get("number");
        const midterm = parseFloat(urlParams.get("midterm"));
        const final = parseFloat(urlParams.get("final"));

        // Validate input values
        if (![name, number, midterm, final].every(val => val) || isNaN(midterm) || isNaN(final)) {
            return this.showAlert("Please fill in all fields correctly.", "error");
        }

        if (midterm < 0 || midterm > 100 || final < 0 || final > 100) {
            return this.showAlert("Grades must be between 0 and 100.", "error");
        }

        if (this.students.some(student => student.number === number)) {
            return this.showAlert("Student number must be unique.", "error");
        }

        // Calculate average grade
        const average = ((midterm * 0.4) + (final * 0.6)).toFixed(2);

        // Add the new student to the array
        this.students.push({ name, number, midterm, final, average });

        // Save updated students list to localStorage
        localStorage.setItem('students', JSON.stringify(this.students));

        // Show success alert and render the updated table
        this.showAlert("Student added successfully!", "success");
        this.renderTable();

        // Reset the form (clear URL parameters)
        this.resetForm();
    }

    deleteStudent(event) {
        const number = event.target.dataset.number;
        this.students = this.students.filter(student => student.number !== number);
        localStorage.setItem('students', JSON.stringify(this.students));

        this.showAlert("Student deleted successfully!", "success");
        this.renderTable();
    }

    showAlert(message, type) {
        const alertBox = this.alertBoxTarget;
        alertBox.textContent = message;
        alertBox.className = `alert-box ${type}`;
        alertBox.style.opacity = "1"; 

        setTimeout(() => {
            alertBox.style.opacity = "0";
        }, 3000);
    }

    renderTable() {
        this.tableBodyTarget.innerHTML = this.students.length
            ? this.students.map(student => 
                `<tr>
                    <td>${student.name}</td>
                    <td>${student.number}</td>
                    <td>${student.midterm}</td>
                    <td>${student.final}</td>
                    <td>${student.average}</td>
                    <td><button data-action="click->student#deleteStudent" data-number="${student.number}">Delete</button></td>
                </tr>`).join('')
            : '';

        this.studentTableTarget.style.display = this.students.length ? "table" : "none";
    }

    resetForm() {
        // Clear the form values by setting the URL to empty
        window.history.replaceState(null, '', window.location.pathname);
    }
}
