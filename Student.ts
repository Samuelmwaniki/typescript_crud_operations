interface Student {
    firstName: string;
    lastName: string;
}

interface ClassInfo {
    classGrade: string;
    students: Student[];
}

function registerStudent(): void {

    const getValue = (id: string): string => (document.getElementById(id) as HTMLInputElement).value;

    const firstName: string = getValue('firstName');
    const lastName: string = getValue('lastName');
     const classGrade: string = getValue('classGrade');
     
     const studentData: ClassInfo[] = JSON.parse(localStorage.getItem('students') || '[]');
     const existingClass: ClassInfo | undefined = studentData.find(item => item.classGrade === classGrade);

    if (existingClass) {
        existingClass.students.push({ firstName, lastName });
    } else {
        const newClass: ClassInfo = { classGrade, students: [{ firstName, lastName }] };
        studentData.push(newClass);
    }

    localStorage.setItem('students', JSON.stringify(studentData));

    (document.getElementById('studentForm') as HTMLFormElement).reset();
    alert('Student registered successfully!');
}
