/**
 * Created by ejikn on 25.02.2016.
 */
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
include("./conveyr.js");


function print_matrix_to_table (matrix) {
    console.log("TABLE");
    var array_table = [];
    for (var i = 0; i < matrix.length; i++)
    {
        array_table[i] = [];
        for (var j = 0; j < matrix[0].length; j++)
        {
            array_table[i][j] = j;
        }
    }
    var code = '<table style="width: 100%; margin: 2% 0; border-collapse: collapse;" border="2" bordercolor="#000000" cellspacing="10" cellpadding="10">';
    for (var i = 0; i < array_table.length; i++)
    {
        code += '<tr>';
        for (var j = 0; j < array_table[i].length; j++)
        {
            if (matrix[i][j] == undefined){
                matrix[i][j] = ""
                code +=  '<td class="null_cell">'+ matrix[i][j] + '</td>';
            } else {
                code +=  '<td>'+ matrix[i][j] + '</td>';
            }
        }
        code += '</tr>';
    }
    code += '</table>';
    //console.log(code);
    var elem = document.getElementById("out");
    elem.innerHTML = code;
}


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
    var output = document.getElementById('out');
    output.value = "";
    //table();
    
    if (input == "") {
        alert ('Введите код программы.');
    } else {
        console.log(input.toString().split("\n"));

        var matrix = createMatrix(input.toString().split("\n"));

        //printMatrix_to_ta(output,matrix);
        print_matrix_to_table(matrix);
    }

}
