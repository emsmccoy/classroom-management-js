import { get } from "https";
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
    console.log("options")
    const promise = new Promise((resolve, reject) => {
        rl.question("Please, select the number of one of the options above: ", (num) => {
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

    const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
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



            default:
                console.log('Closing the app...')

        }
        console.log('*****************************************')
    } while (numberFromConsole !== 0 && numberFromConsole < 19)

}

menuOptions();