function registerStudent() {
    var getValue = function (id) { return document.getElementById(id).value; };
    var firstName = getValue('firstName');
    var lastName = getValue('lastName');
    var classGrade = getValue('classGrade');
    var studentData = JSON.parse(localStorage.getItem('students') || '[]');
    var existingClass = studentData.find(function (item) { return item.classGrade === classGrade; });
    if (existingClass) {
        existingClass.students.push({ firstName: firstName, lastName: lastName });
    }
    else {
        var newClass = { classGrade: classGrade, students: [{ firstName: firstName, lastName: lastName }] };
        studentData.push(newClass);
    }
    localStorage.setItem('students', JSON.stringify(studentData));
    document.getElementById('studentForm').reset();
    alert('Student registered successfully!');
}
