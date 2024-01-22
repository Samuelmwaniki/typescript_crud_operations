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

function localStoragePromise(key: string, value?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      if (value) {
        localStorage.setItem(key, value);
      } else {
        const data = localStorage.getItem(key);
        resolve(JSON.parse(data || '[]'));
      }
      resolve(getValue);
    } catch (error) {
      reject(error);
    }
  });
}

async function registerStudent(): Promise<void> {
  const firstName: string = getValue('firstName');
  const lastName: string = getValue('lastName');
  const classGrade: string = getValue('classGrade');

  try {
    const studentData: ClassInfo[] = await localStoragePromise('students');

    const existingClass: ClassInfo | undefined = studentData.find((item) => item.classGrade === classGrade);

    if (existingClass) {
      existingClass.students.push({ firstName, lastName });
    } else {
      const newClass: ClassInfo = { classGrade, students: [{ firstName, lastName }] };
      studentData.push(newClass);
    }

    await localStoragePromise('students', JSON.stringify(studentData));

    (document.getElementById('studentForm') as HTMLFormElement).reset();
    alert('Student registered successfully!');
  } catch (error) {
    console.error('Error registering student:', error);
    alert('An error occurred while registering the student.');
  }
}

async function studentList(): Promise<void> {
  try {
    const studentData: ClassInfo[] = await localStoragePromise('students');

    let displayText = 'Student List:\n\n';

    studentData.forEach((classInfo) => {
      displayText += `\nClass Grade: ${classInfo.classGrade}\n`;

      classInfo.students.forEach((student, index) => {
        displayText += `  ${index + 1}. ${student.firstName} ${student.lastName}\n`;
      });
    });

    alert(displayText);
  } catch (error) {
    console.error('Error retrieving student list:', error);
    alert('An error occurred while retrieving the student list.');
  }
}
