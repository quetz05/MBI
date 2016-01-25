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
    if(inputNo < 2)
    {
        $('#alignmentsSequences').html("<span style='color:red;'>Brak przynajmniej dwóch sekwencji!</span>");
        return false;
    }

    // Wyliczenie sekwencji
    var firstNeedleman = NeedlemanWunsch($('#input1').val(), $('#input2').val());
    var inputs = '<input type="text" value="' + firstNeedleman[0]  + '" class="form-control" id="alignInput' + i.toString() + '" style="margin:8px;" placeholder="Wyrównana sekwencja ' + i.toString() + '" />';
    inputs += '<input type="text" value="' + firstNeedleman[1]  + '" class="form-control" id="alignInput' + i.toString() + '" style="margin:8px;" placeholder="Wyrównana sekwencja ' + i.toString() + '" />';

    for(var i=3; i <= inputNo; i++)
    {
            inputs += '<input type="text" value="' + $('#input' + i.toString()).val() + '" class="form-control" id="alignInput' + i.toString() + '" style="margin:8px;" placeholder="Wyrównana sekwencja ' + i.toString() + '" />';

    }


    $('#alignmentsSequences').html(inputs.toString());
}

// funkcja tworz¹ca tablicê odleg³oœci na podstawie sekwencji
function CreateSequenceDistanceMatrix()
{
    // wielkoœæ macierzy
    var matrixSize = $('#inputNo').val();

    //tworzenie struktury macierzy
    var matrix =
    {
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

function NeedlemanWunsch(seq1, seq2)
{
    var sameDistance = parseInt($('#sameDistance').val());
    var otherDistance = parseInt($('#otherDistance').val());

    var array = [];

    for(var i=0;i<=seq2.length;i++)
    {
        array[i] = [];
        for(var j=0;j<=seq1.length;j++)
            array[i][j] = null;
    }

    array[0][0] = 0;

    for(var i=1;i<=seq2.length;i++)
        array[0][i] = array[i][0] = -1 * i;

    for(var i=1;i<=seq2.length;i++)
    {
        for(var j=1;j<=seq1.length;j++)
        {
            array[i][j] = Math.max(
                array[i-1][j-1] + (seq2[i-1] === seq1[j-1] ? sameDistance : otherDistance),
                array[i-1][j] + otherDistance,
                array[i][j-1] + otherDistance
            );
        }
    }

    var i = seq2.length;
    var j = seq1.length;
    var nseq1 = [];
    var nseq2 = [];

    do {
        var t = array[i-1][j];
        var d = array[i-1][j-1];
        var l = array[i][j-1];
        var max = Math.max(t, d, l);

        switch(max) {
            case t:
                i--;
                nseq1.push('-');
                nseq2.push(seq2[i]);
                break;
            case d:
                j--;
                i--;
                nseq1.push(seq1[j]);
                nseq2.push(seq1[i]);
                break;
            case l:
                j--;
                nseq1.push(seq1[j]);
                nseq2.push('-');
                break;
        }

    } while(i>0 && j>0);

    return [(nseq1.reverse()).join(''), (nseq2.reverse()).join('')];
}
