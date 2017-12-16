/**
 * Created by ejikn on 25.02.2016.
 */
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
include("./conveyr.js");


function print_to_txa( textarea , str) {

    var i = 0;
    if (i < str.length) {
        textarea.value += str[i];
        i++
        // setTimeout(arguments.callee, 200)
    }
}
function printMatrix_to_ta(textarea,matrix) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == undefined){
                matrix[i][j] = "null"
            }
            buf = buf + matrix[i][j] + '  '; // заполнение буфера строкой
        }
        // buf[buf.length-1] = " ";
        buf += "\n";
        textarea.value += buf; // вывод строки

        buf = ''; // очистка буфера
    }
    // console.log(''); // пустая строка после вывода матрицы
}

document.getElementById('buttonRun').onclick = function run () {




    var input = document.getElementById('code').value;
    var output = document.getElementById('conveyur');
    output.value = "";

    console.log(input.toString().split("\n"));

    var matrix = createMatrix(input.toString().split("\n"));

    // output.value = createMatrix(input.toString().split("\n"));

    printMatrix_to_ta(output,matrix);

    // createMatrix(input.toString().split("\n"));
    // input.toString().split("\n")



    //output.value += "ret " + parse(input);//+parse(input);


    // var stages = 3; //columns
    // var height = 2; //rows
    // var buf = '';
    //
    // function matrixArray(rows, columns) {
    //     var count = 0;
    //     var arr = [];
    //     for (var i = 0; i < columns; i++) {
    //         arr[i] = [];
    //         for (var j = 0; j < rows; j++) {
    //             arr[i][j] = ++count;//вместо i+j+1 пишем любой наполнитель. В простейшем случае - null
    //         }
    //     }
    //     return arr;
    // }
    //
    // function printMatrix(matrix) {
    //     for (var i = 0; i < matrix.length; i++) {
    //         for (var j = 0; j < matrix[0].length; j++) {
    //             buf = buf + matrix[i][j] + ' '; // заполнение буфера строкой
    //         }
    //         console.log(buf); // вывод строки
    //         buf = ''; // очистка буфера
    //     }
    //     console.log(''); // пустая строка после вывода матрицы
    // }
    //
    // var matrix = matrixArray(stages, height);
    // printMatrix(matrix);


    //
    // var commands = {
    //     MOV: {
    //         name: "MOV",
    //         cycles: 2,
    //         f1: 1
    //     },
    //     AND: {
    //         name: "AND",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     OR: {
    //         name: "OR",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     XOR: {
    //         name: "XOR",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     NOT: {
    //         name: "NOT",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     NEG: {
    //         name: "NEG",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     JMP: {
    //         name: "JMP",
    //         cycles: 2,
    //         f1: 3
    //     },
    //     J: {//J/\S{3}
    //         name: "JXXX",
    //         cycles: 2,
    //         f1: 3
    //     },
    //     SHL: {
    //         name: "SHL",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     SHR: {
    //         name: "SHR",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     TEST: {
    //         name: "TEST",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     ADD: {
    //         name: "ADD",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     ADC: {
    //         name: "ADC",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     SUB: {
    //         name: "SUB",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     MUL: {
    //         name: "MUL",
    //         cycles: 3,
    //         f1: 1
    //     },
    //     DIV: {
    //         name: "DIV",
    //         cycles: 3,
    //         f1: 1
    //     },
    //     MOVSX: {
    //         name: "MOVSX",
    //         cycles: 2,
    //         f1: 1
    //     },
    //     MOVZX: {
    //         name: "MOVZX",
    //         cycles: 2,
    //         f1: 1
    //     },
    //     CMP: {
    //         name: "CMP",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     INC: {
    //         name: "INC",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     DEC: {
    //         name: "DEC",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     PUSH: {
    //         name: "PUSH",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     POP: {
    //         name: "POP",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     PUSHFD: {
    //         name: "PUSHFD",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     POPFD: {
    //         name: "POPFD",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     LOOP: {
    //         name: "LOOP",
    //         cycles: 2,
    //         f1: 3
    //     },
    //     CLD: {
    //         name: "CLD",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     STD: {
    //         name: "STD",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     CMPSB: {
    //         name: "CMPSB",
    //         cycles: 2,
    //         f1: 1
    //     },
    //     CALL: {
    //         name: "CALL",
    //         cycles: 2,
    //         f1: 3
    //     },
    //     RET: {
    //         name: "RET",
    //         cycles: 3,
    //         f1: 3
    //     },
    //     NOP: {
    //         name: "NOP",
    //         cycles: 1,
    //         f1: 1
    //     },
    //     LEA: {
    //         name: "LEA",
    //         cycles: 1,
    //         f1: 1
    //     }
    // };
    //
    // console.log(commands.DIV.cycles);
    //
    // // парсим строку
    // function parse(cmd_string) {
    //     var mas_cmd = cmd_string.toString().split(" ");
    //     // var reg = /\d+x,/;
    //     //var mas_param = mas1[1].split(",");
    //     var steps = 0;
    //     var i = -1;
    //     do {
    //         i++;
    //         try {
    //             steps += commands[mas_cmd[i]].cycles + commands[mas_cmd[i]].f1; // фаза 1 и 4
    //             //console.log("done " + mas_cmd[i]);
    //         }
    //         catch (e) {
    //             //console.log("error " + mas_cmd[i]);
    //         }
    //
    //     } while (!commands[mas_cmd[i]])
    //
    //     var tmp = mas_cmd[mas_cmd.length-1];
    //     //console.log("lol "+ commands[mas_cmd[i]].f1);
    //
    //     //фаза 3
    //     if (commands[mas_cmd[i]].f1==1 && tmp != null && tmp != ""){
    //         i=0;
    //         steps += 1;
    //         //console.log("123");
    //         while (i < tmp.length) {
    //             if (tmp[i] == "[") {
    //                 if (i>0){
    //                     steps += 3;
    //                 } else {
    //                     steps += 2;
    //                 }
    //             } else {
    //                 if (tmp[i] == "," && tmp[i+1] != "[") {
    //                     steps += 1;
    //                 }
    //             }
    //             //console.log(tmp[i]);
    //             i++;
    //         }
    //
    //     }
    //
    //     //console.log("st="+steps);
    //     //console.log("i="+i);
    //     // фаза 2 и 5
    //     steps += 2;
    //     return (steps);
    // }


    //output.value += "ret "+parse("ZERO: SUB AX,AX");
    // output.value += "ret " + parse(input);//+parse(input);
}
