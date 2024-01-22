interface Student {
  firstName: string;
  lastName: string;
}

interface ClassInfo {
  classGrade: string;
  students: Student[];
}

function getValue(id: string): string {
  return (document.getElementById(id) as HTMLInputElement).value;
}

function registerStudent(): void {
  const firstName: string = getValue('firstName');
  const lastName: string = getValue('lastName');
  const classGrade: string = getValue('classGrade');

  const studentData: ClassInfo[] = JSON.parse(localStorage.getItem('students') || '[]');
  const existingClass: ClassInfo | undefined = studentData.find((item) => item.classGrade === classGrade);

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

function studentList(): void {
  const studentData: ClassInfo[] = JSON.parse(localStorage.getItem('students') || '[]');

  let displayText = 'Student List:\n\n';

  studentData.forEach((classInfo) => {
    displayText += `\nClass Grade: ${classInfo.classGrade}\n`;

    classInfo.students.forEach((student, index) => {
      displayText += `  ${index + 1}. ${student.firstName} ${student.lastName}\n`;
    });
  });

  alert(displayText);
}
