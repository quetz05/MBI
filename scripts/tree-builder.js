var treeBuilder = {
    initialArray: [],

    getSmallestArrayElem: function (analyzedArray) {
        var smallest = {
            x: 1,
            y: 0,
            value: analyzedArray.val[0][1]
        }

        for (var i = 0; i < analyzedArray.val.length; ++i) {
            for (var j = 0; j < analyzedArray.val[i].length; ++j) {
                var currentValue = analyzedArray.val[i][j];
                if (currentValue === '-')
                    continue;

                if (currentValue < smallest.value) {
                    smallest.y = i;
                    smallest.x = j;
                    smallest.value = currentValue;
                }
            }
        }

        return smallest;
    },
    leStartDatDanceAndGetMeATree: function (initArray) {
        this.initialArray = initArray;

        var smallest = this.getSmallestArrayElem(this.initialArray);
        console.log(smallest);


        var lower = Math.min(smallest.x, smallest.y);
        var higher = Math.max(smallest.x, smallest.y);

        /// NAGLOWEK NOWY
        var newArray = {
            header: [],
            val: []
        }

        var counter = 0;
        for (var i = 0; i < initArray.header.length; ++i) {
            var columnName = '';
            if (i === lower) {
                columnName = initArray.header[lower] + initArray.header[higher];
            } else if (i === higher) {
                continue;
            } else {
                columnName = initArray.header[i];
            }
            newArray.header[counter] = columnName;
            counter++;
        }

        /// NAGLOWEK NOWY


        for (var i = 0; i < newArray.header.length; ++i) {
            var newRow = [];
            newArray.val[i] = newRow;

            for (var j = 0; j < newArray.header.length; ++j) {

                // Wypełnienie lewej dolnej połowy '-'
                if (i >= j) {
                    newArray.val[i][j] = '-';
                    continue;
                }

                if (i !== lower && j === lower) {
                    newArray.val[i][j] = (initArray.val[i][lower] + initArray.val[i][higher]) / 2
                } else if (i !== lower && j !== lower) {
                    var originalIdentifierIndexOfFirstCrossing = initArray.header.indexOf(newArray.header[j]);
                    newArray.val[i][j] = initArray.val[i][originalIdentifierIndexOfFirstCrossing];

                } else if (i === lower) {
                    var originalIdentifierIndexOfFirstCrossing = initArray.header.indexOf(newArray.header[j]);

                    if(originalIdentifierIndexOfFirstCrossing < higher)
                        newArray.val[i][j] = (initArray.val[i][originalIdentifierIndexOfFirstCrossing] + initArray.val[originalIdentifierIndexOfFirstCrossing][higher]) / 2
                    else
                        newArray.val[i][j] = (initArray.val[i][originalIdentifierIndexOfFirstCrossing] + initArray.val[higher][originalIdentifierIndexOfFirstCrossing]) / 2

                }

            }
        }
        console.log(newArray)
        console.log(this.getSmallestArrayElem(newArray))
        return newArray;
    },
    _parseInitialArray : function(initialArray){
        this.initialArray = initialArray;


    }
}