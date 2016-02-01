// funkcja rysuj�ca tablic� odleg�o�ci na podstawie sekwencji
function DrawSequenceDistanceMatrix()
{
    var matrixSize = $('#inputNo').val();
    //sprawdzanie czy istniej� sekwencje puste
    for(var i = 1; i <= matrixSize; i++)
        if($('#input' + i.toString()).val() == '')
        {
            clearContent();
            $('#selectionInfo').html('<span style="color:red;">Przynajmniej jedna sekwencja jest pusta!</span>');
            return;
        }
    $('#selectionInfo').html('');

    nextStep(1);
    var matrix = CreateSequenceDistanceMatrix();
    DrawMatrix(matrix, 'sequenceDistanceMatrix');
}

// funkcja tworz�ca tablic� odleg�o�ci na podstawie sekwencji
function CreateSequenceDistanceMatrix()
{
    // wielko�� macierzy
    var matrixSize = $('#inputNo').val();

    //tworzenie struktury macierzy
    var matrix =
    {
        header: [matrixSize],
        val: [],
        seq: []
    };

    for(var i=0; i < matrixSize; i++)
    {
        matrix.header[i] = 'Sekwencja ' + (i+1).toString();
        matrix.val[i] = [matrixSize];
        matrix.seq[i] = $('#input' + (i+1).toString()).val();

        // wype�nianie wiersza
        for(var j = 0; j < matrixSize; j++)
        {
            if((j-i) > 0)
                matrix.val[i][j] = NeedlemanWunsch($('#input' + (i+1).toString()).val(), $('#input' + (j+1).toString()).val());

            else
                matrix.val[i][j] =  '-';
        }

    }
    SEQUENCE_MATRIX = matrix;
    return matrix;
}

// funkcja rysuj�ca macierz (w postaci tabeli) i wstawiaj�ca j� na stron�
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

//funkcja tworz�ca macierz NeedlemanaWunscha i zwracaj�ca warto�� z jej prawego dolnego rogu (oznaczaj�c� odleg�o�� ci�g�w)
function NeedlemanWunsch(sequence1, sequence2)
{
    var sameCharScore = parseInt($('#sameDistance').val());
    var otherCharPenalty = parseInt($('#otherDistance').val());

    var nsMatrix = [];
    for (var i = 0; i <= sequence2.length; i++)
    {
        nsMatrix[i] = [];
        for (var j = 0; j <= sequence1.length; j++)
        {
            nsMatrix[i][j] = null;
        }
    }

    nsMatrix[0][0] = 0;

    for (var i = 1; i <= sequence2.length; i++)
    {
        nsMatrix[0][i] = nsMatrix[i][0] = -1 * i;
    }

    for (var i = 1; i <= sequence2.length; i++)
    {
        for (var j = 1; j <= sequence1.length; j++)
        {
            nsMatrix[i][j] = Math.max(
                nsMatrix[i - 1][j - 1] + (sequence2[i - 1] === sequence1[j - 1] ? sameCharScore : otherCharPenalty),
                nsMatrix[i - 1][j] + otherCharPenalty,
                nsMatrix[i][j - 1] + otherCharPenalty
            );
        }
    }


    return nsMatrix[sequence2.length][sequence1.length];

}