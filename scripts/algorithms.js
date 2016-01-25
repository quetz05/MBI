$(document).ready(function () {
    var algo = {

        // Wypisanie tabelki
        lePrinte: function (analyzedObject) {
            var table = '<table class="table table-bordered "><thead><th></th>';


            for (var i = 0; i < analyzedObject.header.length; ++i) {
                table += '<th>' + analyzedObject.header[i].name + '</th>';
            }
            table += '</thead><tbody>';

            for (var i = 0; i < analyzedObject.header.length; ++i) {
                var currentRowName = analyzedObject.header[i].name;
                table += '<tr><td>' + currentRowName + '</td>';

                for (var j = 0; j < analyzedObject.val.length; ++j) {

                    table += '<td>' + analyzedObject.val[i][j] + '</td>';
                }
                table += '</tr>'

            }
            table += '</tbody></table>';
            $(table).appendTo('#jarkowaEnklawa')


        }
    }
    // -----------------
    // |   | A | B | C |
    // -----------------
    // | A | - |19 |27 |
    // -----------------
    // | B | - | - | 3 |
    // ----------------
    // | C | - | - | - |
    // -----------------

    var leTesteTabelke = {
        header: ['A', 'B', 'C'],
        val: [
            ['-', 19, 27],
            ['-', '-', 3],
            ['-', '-', '-']]
    }

    var lePrawdziweTabelke = {
        header: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        val: [
            ['-', 19, 27, 8, 33, 18, 13],
            ['-', '-', 31, 18, 36, 1, 13],
            ['-', '-', '-', 26, 41, 32, 29],
            ['-', '-', '-', '-', 31, 17, 14],
            ['-', '-', '-', '-', '-', 35, 28],
            ['-', '-', '-', '-', '-','-', 12],
            ['-', '-', '-', '-', '-','-', '-']

            ]
    }
    var leNowe = {
        header: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10'],
        val: [
            ['-', 0.8, 0.3, 0.3, 1, 0.1, 0.5, 0.3, 0.4, 0.3],
            ['-', '-', 0.875, 0.714, 1, 0.778, 0.833, 0.714, 0.857, 0.875],
            ['-', '-', '-', 0.444, 1, 0.4, 0.667, 0.6, 0.556, 0.444],
            ['-', '-', '-', '-', 1, 0.4, 0.667, 0.444, 0.143, 0.444],
            ['-', '-', '-', '-', '-', 1, 1, 1, 1, 1],
            ['-', '-', '-', '-', '-', '-', 0.444, 0.222, 0.5, 0.4],
            ['-', '-', '-', '-', '-','-', '-',0.286, 0.625, 0.286],
            ['-', '-', '-', '-', '-','-', '-',  '-',0.556, 0.444],
            ['-', '-', '-', '-', '-','-', '-', '-',  '-',0.375],
            ['-', '-', '-', '-', '-','-', '-', '-', '-', '-']
        ]
    }


    algo.lePrinte(lePrawdziweTabelke)

    treeBuilder.buildTree(leNowe)
    algo.lePrinte(treeBuilder._finalArray)



})