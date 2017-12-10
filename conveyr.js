var stages = 3; //columns
var height = 2; //rows
var buf = '';




function matrixArray(rows, columns) {
    var count = 0;
    var arr = [];
    for (var i = 0; i < columns; i++) {
        arr[i] = [];
        for (var j = 0; j < rows; j++) {
            arr[i][j] = ++count;//вместо i+j+1 пишем любой наполнитель. В простейшем случае - null
        }
    }
    return arr;
}

function printMatrix(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            buf = buf + matrix[i][j] + ' '; // заполнение буфера строкой
        }
        console.log(buf); // вывод строки
        buf = ''; // очистка буфера
    }
    console.log(''); // пустая строка после вывода матрицы
}

var matrix = matrixArray(stages, height);
printMatrix(matrix);



var commands = {
    MOV: {
        name: "MOV",
        cycles: 2,
        f1: 1
    },
    AND: {
        name: "AND",
        cycles: 1,
        f1: 1
    },
    OR: {
        name: "OR",
        cycles: 1,
        f1: 1
    },
    XOR: {
        name: "XOR",
        cycles: 1,
        f1: 1
    },
    NOT: {
        name: "NOT",
        cycles: 1,
        f1: 1
    },
    NEG: {
        name: "NEG",
        cycles: 1,
        f1: 1
    },
    JMP: {
        name: "JMP",
        cycles: 2,
        f1: 3
    },
    J: {//J/\S{3}
        name: "J",
        cycles: 2,
        f1: 3
    },
    SHL: {
        name: "SHL",
        cycles: 1,
        f1: 1
    },
    SHR: {
        name: "SHR",
        cycles: 1,
        f1: 1
    },
    TEST: {
        name: "TEST",
        cycles: 1,
        f1: 1
    },
    ADD: {
        name: "ADD",
        cycles: 1,
        f1: 1
    },
    ADC: {
        name: "ADC",
        cycles: 1,
        f1: 1
    },
    SUB: {
        name: "SUB",
        cycles: 1,
        f1: 1
    },
    MUL: {
        name: "MUL",
        cycles: 3,
        f1: 1
    },
    DIV: {
        name: "DIV",
        cycles: 3,
        f1: 1
    },
    MOVSX: {
        name: "MOVSX",
        cycles: 2,
        f1: 1
    },
    MOVZX: {
        name: "MOVZX",
        cycles: 2,
        f1: 1
    },
    CMP: {
        name: "CMP",
        cycles: 1,
        f1: 1
    },
    INC: {
        name: "INC",
        cycles: 1,
        f1: 1
    },
    DEC: {
        name: "DEC",
        cycles: 1,
        f1: 1
    },
    PUSH: {
        name: "PUSH",
        cycles: 1,
        f1: 1
    },
    POP: {
        name: "POP",
        cycles: 1,
        f1: 1
    },
    PUSHFD: {
        name: "PUSHFD",
        cycles: 1,
        f1: 1
    },
    POPFD: {
        name: "POPFD",
        cycles: 1,
        f1: 1
    },
    LOOP: {
        name: "LOOP",
        cycles: 2,
        f1: 3
    },
    CLD: {
        name: "CLD",
        cycles: 1,
        f1: 1
    },
    STD: {
        name: "STD",
        cycles: 1,
        f1: 1
    },
    CMPSB: {
        name: "CMPSB",
        cycles: 2,
        f1: 1
    },
    CALL: {
        name: "CALL",
        cycles: 2,
        f1: 3
    },
    RET: {
        name: "RET",
        cycles: 3,
        f1: 3
    },
    NOP: {
        name: "NOP",
        cycles: 1,
        f1: 1
    },
    LEA: {
        name: "LEA",
        cycles: 1,
        f1: 1
    }
};

console.log(commands.DIV.cycles);

// парсим строку
function parse(cmd_string) {
    cmd_string = cmd_string.toUpperCase();

    var ret = {
        name: cmd_string,
        steps: null,
        operands: [],
        f1: null,
        f2: 1,
        f3: null,
        f4: null,
        f5: 1
    }

    var mas_cmd = cmd_string.toString().split(" ");
    var steps = 0;
    var i = -1;
    var regexp = /J\w+/; // маска для JXXX-операций
    do {
        i++;
        try { // проверка существования

            if (regexp.test(mas_cmd[i])){ // обработка для JXXX-операций
                mas_cmd[i]="J";
            }

            steps += commands[mas_cmd[i]].cycles + commands[mas_cmd[i]].f1; // фаза 4 и 1
            ret.f1 = commands[mas_cmd[i]].f1;
            ret.f4 = commands[mas_cmd[i]].cycles;
            //console.log("done " + mas_cmd[i]);

        }
        catch (e) {

        }

    } while (!commands[mas_cmd[i]])

    var tmp = mas_cmd[mas_cmd.length-1]; // переменные в команде
    //console.log("tmp-"+tmp);
    //фаза 3
    //if (commands[mas_cmd[i]].f1==1 && tmp != null && tmp != ""){ //тип функции - с переменными или нет
    if (tmp != null && tmp != ""){ //тип функции - с переменными или нет
        i=0;
        ret.operands = tmp.split(",");
        //console.log("ret.operands-"+ret.operands);

        var RegOperand = /\[\S+\]/;
        while (i<ret.operands.length){
            //console.log("1-"+ret.operands[i]);
            if (RegOperand.test(ret.operands[i])){
                steps+=3;
                ret.f3+=3;
                ret.operands[i] = ret.operands[i].replace(/[\[\]]/gi,''); // стандартизация переменной для использования ее как адрес (убрать [])
            } else if (ret.operands[i]!=null && ret.operands[i]!=""){
                steps+=1;
                ret.f3+=1;
            }
            i++;
        }


        /*steps += 1;
        while (i < tmp.length) {
            if (tmp[i] == "[") {
                if (i>0){
                    steps += 3;
                } else {
                    steps += 2;
                }
            } else {
                if (tmp[i] == "," && tmp[i+1] != "[") {
                    steps += 1;
                }
            }
            //console.log(tmp[i]);
            i++;
        }
        */
    }

    //console.log("st="+steps);
    //console.log("i="+i);
    // фаза 2 и 5
    steps += 2;
    ret.steps = steps;
    return (ret);
}

//var mas_tmp = //parse("ZERO: mov AX,[CX]");

function createMatrix(string_arr){
    var i = 1;
    var j = {
            min: 1,
            max: 5,
            curr: 1
        };
    var final_matrix = []; // матрица для вывода
    var variables = []; //очередь занятых переменных
    var obj; //объект parse
    var max = 0; //максимальное количество шагов
    final_matrix[0] = [];
    final_matrix[0][0] = "#";
    final_matrix[0].push("1","2","3","4","5");
    while (i<string_arr.length+1) {
        obj = parse(string_arr[i-1]);
        if (max<obj.steps) {
            max = obj.steps;
        }
        final_matrix[i] = [];
        final_matrix[i][0] = i;
        final_matrix[i].push(obj.name);
        variables.push(obj.operands);

        console.log("v-"+variables);




        i++;
    }


    return (final_matrix)
}

var mas_tmp = ["SUB AX,VAR1", "MOV DX,VAR2", "JMP [DX]", "PUSH VAR3"];

//console.log(parse(mas_tmp[2]));
console.log(createMatrix(mas_tmp));


