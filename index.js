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




            default:
                console.log('Closing the app...')

        }
        console.log('*****************************************')
    } while (numberFromConsole !== 0 && numberFromConsole < 19)

}

menuOptions();