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

    var values = [inputNo];
    var firstNeedleman = NeedlemanWunsch($('#input1').val(), $('#input2').val());
    values[0] = firstNeedleman[0];
    values[1] = firstNeedleman[1];

    for(var i=2; i < inputNo; i++)
    {
        var NW = NeedlemanWunsch(values[i-1], $('#input' + (i+1).toString()).val());
        values[i-1] = NW[0];
        values[i] = NW[1];
        //alert(NW);
        //inputs += '<input type="text" value="' + NW[1] + '" class="form-control" id="alignInput' + i.toString() + '" style="margin:8px;" placeholder="Sekwencja ' + i.toString() + '" />';


    }

    var inputs = '';
    for(var i = 0; i < values.length; i++)
    {
        inputs += '<input type="text" value="' + values[i]  + '" class="form-control" id="alignInput' + (i+1).toString() + '" style="margin:8px;" placeholder="Wyrównana sekwencja ' + (i+1).toString() + '" />';
    }

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
                matrix.val[i][j] = computeDistance($('#alignInput' + (i+1).toString()).val(), $('#alignInput' + (j+1).toString()).val());

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

function NeedlemanWunsch(s1, s2)
{
    var sp = parseInt($('#sameDistance').val());
    var gp = parseInt($('#otherDistance').val());
    var gc = "-";


    var arr = [];
    for(var i=0;i<=s2.length;i++)
    {
        arr[i] = [];
        for(var j=0;j<=s1.length;j++)
        {
            arr[i][j] = null;
        }
    }

    arr[0][0] = 0;

    for(var i=1;i<=s2.length;i++)
    {
        arr[0][i] = arr[i][0] = -1 * i;
    }

    for(var i=1;i<=s2.length;i++)
    {
        for(var j=1;j<=s1.length;j++)
        {
            arr[i][j] = Math.max(
                arr[i-1][j-1] + (s2[i-1] === s1[j-1] ? sp : gp),
                arr[i-1][j] + gp,
                arr[i][j-1] + gp
            );
        }
    }

    var i = s2.length;
    var j = s1.length;
    var sq1 = [];
    var sq2 = [];

    do
    {

        var t = arr[i-1][j];
        var d = arr[i-1][j-1];
        var l = arr[i][j-1];
        var max = Math.max(t, d, l);

        switch(max)
        {
            case t:
                i--;
                sq1.push(gc);
                sq2.push(s2[i]);
                break;
            case d:
                j--;
                i--;
                sq1.push(s1[j]);
                sq2.push(s2[i]);
                break;
            case l:
                j--;
                sq1.push(s1[j]);
                sq2.push(gc);
                break;
        }

    } while(i>0 && j>0);

    return [(sq1.reverse()).join(''), (sq2.reverse()).join('')]
}