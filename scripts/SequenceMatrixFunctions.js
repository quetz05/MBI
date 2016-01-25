// funkcja rysuj¹ca tablicê odleg³oœci na podstawie sekwencji
function DrawSequenceDistanceMatrix()
{
    if(createMultipleSequenceAlignments() == false)
        return;
    var matrix = CreateSequenceDistanceMatrix();
    DrawMatrix(matrix, 'sequenceDistanceMatrix');
}

function createMultipleSequenceAlignments()
{
    var inputNo = $('#inputNo').val();
    if(inputNo <= 0)
    {
        $('#alignmentsSequences').html("<span style='color:red;'>Brak sekwencji!</span>");
        return false;
    }

    var inputs = '';
    for(var i=1; i <= inputNo; i++)
        inputs += '<input type="text" value="' + $('#input' + i.toString()).val() + '" class="form-control" id="alignInput' + i.toString() + '" style="margin:8px;" placeholder="Sekwencja ' + i.toString() + '" />';

    $('#alignmentsSequences').html(inputs.toString());
}

function multipleSequenceAlignments()
{


}

// funkcja tworz¹ca tablicê odleg³oœci na podstawie sekwencji
function CreateSequenceDistanceMatrix()
{
    // wielkoœæ macierzy
    var matrixSize = $('#inputNo').val();

    //tworzenie struktury macierzy
    var matrix = {
        header: [matrixSize],
        val: []
    }

    for(var i=0; i < matrixSize; i++)
    {
        matrix.header[i] = 'Sekwencja ' + (i+1).toString();
        matrix.val[i] = [matrixSize];

        // wype³nianie wiersza
        for(var j = 0; j < matrixSize; j++)
        {
            if((j-i) > 0)
                matrix.val[i][j] = computeDistance($('#input' + (i+1).toString()).val(), $('#input' + (j+1).toString()).val());

            else
                matrix.val[i][j] =  '-';
        }

    }

    return matrix;
}

function computeDistance(seq1, seq2)
{
    seq1 = seq1.toString();
    seq2 = seq2.toString();
    if(seq1.length != seq2.length)
        return 'ERROR!';

    var sameDistance = parseInt($('#sameDistance').val());
    var otherDistance = parseInt($('#otherDistance').val());
    var lineDistance = parseInt($('#lineDistance').val());

    var distance = 0;


    for(var i = 0; i < seq1.length; i++)
    {
        if(seq1.charAt(i) == '-' || seq2.charAt(i) == '-')
            distance += lineDistance;
        else if(seq1.charAt(i) == seq2.charAt(i))
            distance += sameDistance;
        else
            distance += otherDistance;
    }

    return distance;
}

// funkcja rysuj¹ca macierz (w postaci tabeli) i wstawiaj¹ca j¹ na stronê
function DrawMatrix(matrix, id)
{
    // Wypisanie tabelki
    var table = '<table class="table table-bordered" align="center"><thead><th></th>';

    for (var i = 0; i < matrix.header.length; ++i) {
        table += '<th>' + matrix.header[i] + '</th>';
    }
    table += '</thead><tbody>';

    for (var i = 0; i < matrix.header.length; ++i)
    {
        var currentRowName = matrix.header[i];
        table += '<tr><td>' + currentRowName + '</td>';
        for (var j = 0; j < matrix.val.length; ++j)
        {
            table += '<td>' + matrix.val[i][j] + '</td>';
        }
        table += '</tr>'
    }
    table += '</tbody></table>';
    $('#sequenceDistanceMatrix').html(table);
}


// funkcja z Jarkowej Enklawy
function createJarekTable()
{
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
}

