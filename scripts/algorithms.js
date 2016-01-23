$(document).ready(function () {
    var algo = {

        // Wypisanie tabelki
        lePrinte: function (analyzedObject) {
            var table = '<table class="table table-bordered "><thead><th></th>';


            for (var i = 0; i < analyzedObject.header.length; ++i) {
                table += '<th>' + analyzedObject.header[i] + '</th>';
            }
            table += '</thead><tbody>';

            for (var i = 0; i < analyzedObject.header.length; ++i) {
                var currentRowName = analyzedObject.header[i];
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

    algo.lePrinte(leTesteTabelke)

    function Tree(rootNode) {
        this._root = rootNode;
    }

    var v = new Tree();

    var c = new MBINode("Root");
    c.insertChild(new MBINode("jeden"))
    c.insertChild(new MBINode("dwa"))

})