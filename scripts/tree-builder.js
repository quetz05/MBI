var treeBuilder = {
    _initialArray: [],

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
        this._initialParsedArray = this._parseInitialArray(initArray);
        var x =  this._doTheMagic(this._initialParsedArray);

        var y = this._doTheMagic(x);
        var z = this._doTheMagic(y);
        //var v = this._doTheMagic(z);
        //var a = this._doTheMagic(v);
        console.log(this._permute.getPermutations([0,3,1,5], 2))
        return z;

    },
    _doTheMagic: function (parsedArray) {
        var analyzed = parsedArray;

        var smallest = this.getSmallestArrayElem(analyzed);
        console.log(smallest);
        var lower = Math.min(smallest.x, smallest.y);
        var higher = Math.max(smallest.x, smallest.y);


        /// NAGLOWEK NOWY - POCZATEK
        var newArray = {
            header: [],
            val: []
        }

        var counter = 0;
        for (var i = 0; i < analyzed.header.length; ++i) {
            var columnName = '';
            if (i === lower) {
                columnName = {
                    name: analyzed.header[lower].name + analyzed.header[higher].name,
                    prevIndexes: analyzed.header[lower].prevIndexes.concat(analyzed.header[higher].prevIndexes) // Dodajemy poprzednie indeksy - składowe
                };

                //sprawdzamy, czy składowe nowego tworu były proste czy też złożone z kilku
                if( analyzed.header[lower].prevIndexes.length === 0)
                    columnName.prevIndexes.push(lower);
                if( analyzed.header[higher].prevIndexes.length === 0)
                    columnName.prevIndexes.push(higher);

            } else if (i === higher) {
                continue;
            } else {
                columnName = analyzed.header[i];
            }
            newArray.header[counter] = columnName;
            counter++;
        }

        /// NAGLOWEK NOWY - KONIEC


        for (var i = 0; i < newArray.header.length; ++i) {
            // nowy "wiersz" naszej tabeli
            newArray.val[i] = [];

            for (var j = 0; j < newArray.header.length; ++j) {

                // Wypełnienie lewej dolnej połowy '-'
                if (i >= j) {
                    newArray.val[i][j] = '-';
                    continue;
                }

                // Początek magii kolejnego kroku:

                if (i !== lower && j === lower) {

                    newArray.val[i][j] = (analyzed.val[i][lower] + analyzed.val[i][higher]) / 2
                } else
                if (i !== lower && j !== lower) {
                    var originalIdentifierIndexOfFirstCrossing = analyzed.header.indexOf(newArray.header[j]);
                    var originalIdentifierIndexOfSecondCrossing = analyzed.header.indexOf(newArray.header[i]);
                    newArray.val[i][j] = analyzed.val[originalIdentifierIndexOfSecondCrossing][originalIdentifierIndexOfFirstCrossing];

                } else if (i === lower) {
                    var originalIdentifierIndexOfFirstCrossing = analyzed.header.indexOf(newArray.header[j]);

                    if (originalIdentifierIndexOfFirstCrossing < higher)
                        newArray.val[i][j] = (analyzed.val[i][originalIdentifierIndexOfFirstCrossing] + analyzed.val[originalIdentifierIndexOfFirstCrossing][higher]) / 2
                    else
                        newArray.val[i][j] = (analyzed.val[i][originalIdentifierIndexOfFirstCrossing] + analyzed.val[higher][originalIdentifierIndexOfFirstCrossing]) / 2

                }

            }
        }
        //console.log(newArray)
        //console.log(this.getSmallestArrayElem(newArray))
        return newArray;
    },
    _parseInitialArray: function (initialArray) {
        this._initialArray = initialArray;
        var parsed = {
            header: [],
            val: []
        }
        parsed.val = initialArray.val;

        for (var i = 0; i < initialArray.header.length; ++i) {
            parsed.header.push({name: initialArray.header[i], prevIndexes: []})
        }
        console.log(parsed)
        return parsed;

    },_permute :  (function() {
    // http://jsfiddle.net/jinwolf/Ek4N5/29/
        var results = [];

        function doPermute(input, output, used, size, level) {

            if (size == level) {
                var word = output.slice();
                results.push(word);
                return;
            }

            level++;

            for (var i = 0; i < input.length; i++) {

                if (used[i] === true) {
                    continue;
                }

                used[i] = true;

                output.push(input[i]);

                doPermute(input, output, used, size, level);

                used[i] = false;

                output.pop();
            }
        }

        return {
            getPermutations: function(input, size) {

                var chars = input;
                var output = [];
                var used = new Array(chars.length);

                doPermute(chars, output, used, size, 0);

                return results;
            }
        }
    })()

}