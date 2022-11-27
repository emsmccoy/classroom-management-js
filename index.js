import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function isInt(str) {
    // returns a boolean
    return /^[0-9]+$/.test(str);
}


function getNumberFromConsole() {
    console.log("1 - Show all the students in a table format. \n2 - Show the number of students in the class by console.\n3 - Show by console all the names of the students.\n4 - Delete the last student in the class.\n5 - Eliminate a student randomly from the class.\n6 - Show by console all the data of the pupils that are girls.\n7 - Show by console the number of boys and girls in the class.\n8 - Show true or false by console if all the students in the class are girls.\n9 - Show by console the names of the students between 20 and 25 years old.\n10 - Add a new student.\n11 - Display by console the name of the youngest person in the class.\n12 - Show by console the average age of all the students in the class.\n13 - Show by console the average age of the girls in the class.\n14 - Add a new grade for the students.\n15 - Sort the array of students alphabetically by name.\n")


    const promise = new Promise((resolve, reject) => {
        rl.question("Please, type the number of one of the options above and press ENTER \nIf you want to exit, press 0 or any number above 18\n     NUMBER OF ACTION:", (num) => {
            rl.pause();
            if (isInt(num)) {
                num = Number.parseInt(num);
                resolve(num);
            } else {
                reject("You must type a number");
            }
        });
    });

    return promise;
}

async function menuOptions() {
    let numberFromConsole

    const students = [{
        age: 32,
        examScores: [],
        gender: 'male',
        name: 'edu'
    },
    {
        age: 29,
        examScores: [],
        gender: 'female',
        name: 'silvia'
    }]

    const availableMaleNames = ['pepe', 'juan', 'victor', 'leo', 'francisco', 'carlos'];
    const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
    const availableGenders = ['male', 'female'];



    do {
        try {
            numberFromConsole = await getNumberFromConsole();
        } catch (error) {
            console.log(error);
            process.exit(0);
        }

        switch (numberFromConsole) {
            case 1:
                console.table(students)
                break;

            case 2:
                let studentNum = students.length
                console.log(studentNum)
                break;

            case 3:
                students.forEach(student => (console.log(student.name)))
                break;

            case 4:
                const deletedStudent = students.pop()
                console.log(`${deletedStudent.name} has been deleted`)
                break;

            case 5:
                const random = Math.floor(Math.random() * students.length);
                const randomStudent = students[random]
                console.log(`${randomStudent.name} has been randomly deleted`)
                students.splice(random, 1)
                break;

            case 6:
                let females = []
                console.log('Female students:')
                for (let student of students) {
                    if (student.gender === 'female') {
                        females.push(student)
                    }
                }
                console.table(females)
                break;

            case 7:
                let femaleNum = 0
                let maleNum = 0

                for (let student of students) {
                    if (student.gender === 'female') {
                        femaleNum++
                    } else {
                        maleNum++
                    }
                }
                console.log(`The number of female students is ${femaleNum}`)
                console.log(`The number of male students is ${maleNum}`)
                break;

            case 8:
                function allFemales() {
                    if (students.some(student => student.gender === 'male')) {
                        console.log('False. Not all students are female.')
                        return false
                    } else {
                        console.log('True. All students are female.')
                        return true
                    }
                }
                allFemales();
                break;


            case 9:
                const adultStudents = students.filter(student => student.age >= 20 && student.age <= 25).map(m => m.name)
                console.log(`Students between 20 and 25 years old: ${adultStudents}`)
                break;

            case 10:
                const newGender = availableGenders[Math.floor(Math.random() * availableGenders.length)]

                function getNewName() {
                    let newName
                    if (newGender === 'male') {
                        newName = availableMaleNames[Math.floor(Math.random() * availableMaleNames.length)]
                    } else {
                        newName = availableFemaleNames[Math.floor(Math.random() * availableFemaleNames.length)]
                    }
                    return newName
                }

                let newStudent = {
                    age: Math.floor(Math.random() * (50 - 20 + 1) + 20),
                    examScores: [],
                    gender: newGender,
                    name: getNewName(),
                }
                students.push(newStudent)
                console.log(`The following student has been successfully added:`)
                console.log(newStudent)
                break;

            case 11:
                const youngest = students.reduce(function (min, curr) {
                    return min.age < curr.age ? min : curr;
                });
                console.log(`Youngest student: ${youngest.name}`)
                break;

            case 12:
                let studentsAge = []
                for (let student of students) {
                    studentsAge.push(student.age)
                }
                const totalAge = studentsAge.reduce(function (total, curr) {
                    return total + curr;
                });
                const avgAge = totalAge / studentsAge.length
                console.log(`Average age: ${avgAge}`)
                break;

            case 13:

                let femaleAge = []
                for (let student of students) {
                    if (student.gender === 'female') {
                        femaleAge.push(student.age)
                    }
                }
                const totalAgeFem = femaleAge.reduce(function (total, curr) {
                    return total + curr;
                });
                console.log(totalAgeFem)
                const avgAgeFem = totalAgeFem / femaleAge.length
                console.log(`Average female age: ${avgAgeFem}`)
                break;

            case 14:
                students.forEach(student => student.examScores.push(Math.round(Math.random() * 10)))
                console.log('Scores added.')
                break;

            case 15:
                function compare(a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }

                students.sort(compare);
                console.log('Students have been sorted out alphabetically.')
                break;



            default:
                console.log('Closing the app...')

        }
        console.log('***************************************************************')
    } while (numberFromConsole !== 0 && numberFromConsole < 19)

}

menuOptions();