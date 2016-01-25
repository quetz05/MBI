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
    algo.lePrinte(lePrawdziweTabelke)


    algo.lePrinte(treeBuilder.leStartDatDanceAndGetMeATree(lePrawdziweTabelke))

    function Tree(rootNode) {
        this._root = rootNode;
    }

    var v = new Tree();

    var c = new MBINode("Root");
    c.insertChild(new MBINode("jeden"))
    c.insertChild(new MBINode("dwa"))

})