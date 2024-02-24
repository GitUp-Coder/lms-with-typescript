import inquirer from 'inquirer';
const courses = [];
const students = [];
const enrollments = [];
async function promptForCourse() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'subjects',
            message: 'Select subjects:',
            choices: ['Math', 'Science', 'History', 'English', 'Computer Science'],
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter course description:',
        },
        {
            type: 'checkbox',
            name: 'subjects',
            message: 'Select subjects:',
            choices: ['Math', 'Science', 'History', 'English', 'Computer Science'],
        },
    ]);
    const courseId = courses.length + 1;
    return { id: courseId, title: answers.title, description: answers.description };
}
async function promptForStudent() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:',
        },
    ]);
    const studentId = students.length + 1;
    return { id: studentId, name: answers.name };
}
async function runCLI() {
    while (true) {
        const userChoice = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Course', 'Add Student', 'Enroll Student', 'Exit'],
        });
        switch (userChoice.action) {
            case 'Add Course':
                const newCourse = await promptForCourse();
                courses.push(newCourse);
                console.log('Course added successfully!');
                break;
            case 'Add Student':
                const newStudent = await promptForStudent();
                students.push(newStudent);
                console.log('Student added successfully!');
                break;
            case 'Enroll Student':
                const enrollStudentAnswers = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'student',
                        message: 'Choose a student:',
                        choices: students.map((student) => student.name),
                    },
                    {
                        type: 'list',
                        name: 'course',
                        message: 'Choose a course to enroll the student:',
                        choices: courses.map((course) => course.title),
                    },
                ]);
                const selectedStudent = students.find((student) => student.name === enrollStudentAnswers.student);
                const selectedCourse = courses.find((course) => course.title === enrollStudentAnswers.course);
                if (selectedStudent && selectedCourse) {
                    enrollments.push({ student: selectedStudent, course: selectedCourse });
                    console.log(`${selectedStudent.name} enrolled in ${selectedCourse.title} successfully!`);
                }
                else {
                    console.log('Invalid selection. Please try again.');
                }
                break;
            case 'Exit':
                console.log('Exiting LMS.');
                process.exit(0);
            default:
                console.log('Invalid choice. Please try again.');
                break;
        }
    }
}
// Run the CLI
runCLI();
