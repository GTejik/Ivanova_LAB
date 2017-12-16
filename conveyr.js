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
            buf = buf + matrix[i][j] + ' | '; // заполнение буфера строкой
        }
        console.log(buf); // вывод строки
        buf = ''; // очистка буфера
    }
    console.log(''); // пустая строка после вывода матрицы
}

// var matrix = matrixArray(stages, height);
// printMatrix(matrix);



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

// console.log(commands.DIV.cycles);

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
    var i = 0;
    var j = 0;
    var final_matrix = []; // матрица для вывода
    var variables = []; //очередь занятых переменных
    var obj = []; //объект parse
    var max = 0; //максимальное количество шагов
    final_matrix[0] = [];
    final_matrix[0][0] = "#";
    final_matrix[0].push("1","2","3","4","5");

    //создание массива объектов
    while (i<string_arr.length) {
        obj[i] = {
            cmd: parse(string_arr[i]),
            phase: 1,
            flag: false,
            step_flag: false

        }
        //max num of steps
        if (max < obj[i].cmd.steps) {
            max = obj[i].cmd.steps;
        }
    i++;
    }
    i = 1;

    //сщздание индексов
    // while (i<string_arr.length+1) {
    //     final_matrix[i] = [];
    //     final_matrix[i][0] = i;
    //     i++;
    // }
    //конвейер
    i = 1;
    var stp = 1;
    var status_phase = {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    };
    var wait_flag = {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    };
    var clear_op = [];
    var six = 0;
    var tmp_flag = 0;
    var flag_operands = false;//флаг занятости операнд
    while (six<string_arr.length) {//шаги
        final_matrix[stp] = [];
        final_matrix[stp][0] = stp;

        while (i<string_arr.length+1) {//команды

            j = 1;
            while (j < 6) {//фазы конвейера
                // flag_operands = false;
                var k = 0;
                while (obj[i - 1].phase == j && !obj[i - 1].flag && k < obj[i - 1].cmd.operands.length && !status_phase[j] && !wait_flag[j]) {
                    //console.log("var"+stp+" "+variables);

                    var tp=0;
                    while (tp<obj[i-1].cmd.operands.length) {
                        if (variables.indexOf(obj[i - 1].cmd.operands[tp]) != -1) {
                            // console.log("fo"+stp+" "+obj[i - 1].cmd.name);
                            flag_operands = true;
                            // wait_flag = true;
                        }
                        tp++;
                    }
                    if (!flag_operands) {
                        var tp = 0;
                        while (tp<obj[i-1].cmd.operands.length) {
                            variables.push(obj[i - 1].cmd.operands[tp]);
                            tp++;
                        }
                        obj[i - 1].flag = true;
                        // console.log("nfo"+stp+" "+obj[i - 1].cmd.name);

                        // wait_flag = false;
                    }
                    k++;
                }


                //фаза соответствует .. не было перехода фаз .. переменные свободны .. фаза свободна на шаге .. нет задержки по фазе
                if (obj[i - 1].phase == j && obj[i - 1].flag && !obj[i - 1].step_flag && !flag_operands && !status_phase[j] && !wait_flag[j]) {
                    final_matrix[stp][j] = obj[i - 1].cmd.name;
                    status_phase[j] = true;
                    tmp_flag = 0;
                    switch (j) {
                        case 1:
                            if (obj[i-1].cmd.f1>1){
                                obj[i - 1].cmd.f1--;
                            } else {
                                obj[i - 1].phase++;
                                tmp_flag = 1;
                            }
                            break;
                        case 2:
                            if (obj[i-1].cmd.f2>1){
                                obj[i - 1].cmd.f2--;
                            } else {
                                obj[i - 1].phase++;
                                tmp_flag = 1;
                            }
                            break;
                        case 3:
                            if (obj[i-1].cmd.f3>1){
                                obj[i - 1].cmd.f3--;
                            } else {
                                obj[i - 1].phase++;
                                tmp_flag = 1;
                            }
                            break;
                        case 4:
                            if (obj[i-1].cmd.f4>1){
                                obj[i - 1].cmd.f4--;
                            } else {
                                obj[i - 1].phase++;
                                tmp_flag = 1;
                            }
                            break;
                        case 5:
                            if (obj[i-1].cmd.f5>1){
                                obj[i - 1].cmd.f5--;
                            } else {
                                obj[i - 1].phase++;
                                tmp_flag = 1;
                            }
                            break;
                    }
                    obj[i - 1].step_flag = true;
                    //obj[i - 1].phase++;
                    if (obj[i-1].phase==6){
                       six++;
                       k = 0;
                        while (k < obj[i - 1].cmd.operands.length) {
                            clear_op.push(obj[i - 1].cmd.operands[k]);
                            //console.log(stp+" "+clear_op);
                            k++;
                        }
                    }
                    // obj[i - 1].flag = true;

                    //TODO: убрать очистку переменных по флагу, и чтоб не падало

                    // console.log();
                    // console.log("tm-"+tmp_flag);
                    // if (tmp_flag == 1 && obj[i-1].phase==6){
                    //      console.log("op");

                        // k = 0;
                        // while (k < obj[i - 1].cmd.operands.length) {
                        //     clear_op.push(obj[i - 1].cmd.operands[k]);
                        //     k++;
                        // }
                    // }

                    // console.log();
                    // console.log(obj[i - 1].cmd.name+" - "+obj[i - 1].cmd.operands);
                    // console.log(variables);
                    // console.log(final_matrix[stp]);
                }
                else {

                    // console.log("lel3");

                    if (j > 1 && (obj[i - 1].phase == j && !obj[i - 1].step_flag && status_phase[j] || wait_flag[j])) {
                        final_matrix[stp][j - 1] = final_matrix[stp - 1][j - 1];
                    }
                }
                if (flag_operands){
                    wait_flag[j] = true;
                }

                // console.log("lel1");

                //console.log("v-" + variables);

                j++;
                flag_operands=false;
            }

            i++;
        }

        //очистка переменных
        j = 0;
        while (j < obj.length) {
            if (obj[j].cmd.phase==6) {
                obj[j].flag = false;

            }
            obj[j].step_flag = false;
            j++;
        }
        j = 1;
        while (j < 6) {
            wait_flag[j] = false;
            status_phase[j] = false;
            j++;
        }
        while (clear_op.length > 0) {
            // console.log("clear - "+clear_op);
            variables.splice(variables.indexOf(clear_op[0]), 1);
            clear_op.shift();
        }

        flag_operands = false;
        i=1;
        stp++;

    }


    return (final_matrix)
}

// var mas_tmp = ["SUB AX,VAR1", "MOV dx,VAR2", "JMP [DX]", "PUSH VAR3"];

//console.log(createMatrix(mas_tmp));
//console.log(parse(mas_tmp[2]));
// printMatrix(createMatrix(mas_tmp));

//
// SUB AX,VAR1
// MOV dx,VAR2
// JMP [DX]
// PUSH VAR3