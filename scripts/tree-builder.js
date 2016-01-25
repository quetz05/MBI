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
        var x = this._doTheMagic(this._initialParsedArray);

        var y = this._doTheMagic(x);
        var z = this._doTheMagic(y);
        var v = this._doTheMagic(z);
        var a = this._doTheMagic(v);
        return a;

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
                if (analyzed.header[lower].prevIndexes.length === 0)
                    columnName.prevIndexes.push(this._initialArray.header.indexOf(analyzed.header[lower].name));
                if (analyzed.header[higher].prevIndexes.length === 0)
                    columnName.prevIndexes.push(this._initialArray.header.indexOf(analyzed.header[higher].name))

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
                var arrayOfValsToAnalyze = [];

                if (newArray.header[i].prevIndexes.length === 0)
                    arrayOfValsToAnalyze.push(this._initialArray.header.indexOf(newArray.header[i].name));
                else
                    arrayOfValsToAnalyze = arrayOfValsToAnalyze.concat(newArray.header[i].prevIndexes);

                if (newArray.header[j].prevIndexes.length === 0)
                    arrayOfValsToAnalyze.push(this._initialArray.header.indexOf(newArray.header[j].name));
                else
                    arrayOfValsToAnalyze = arrayOfValsToAnalyze.concat(newArray.header[j].prevIndexes);

                var pointsToCalculation = this._permute.getPermutations(arrayOfValsToAnalyze, 2);

                var finalValsToSum = this._getValuesInRange(pointsToCalculation, newArray.header[i].prevIndexes, newArray.header[j].prevIndexes);

                var counter = 0;
                for(var it = 0; it < finalValsToSum.length; ++ it){
                    counter += this._initialParsedArray.val[finalValsToSum[it][1]][finalValsToSum[it][0]]
                }

                newArray.val[i][j] = counter / finalValsToSum.length;
                var xxx = 'asd';
                //if (i !== lower && j === lower) {
                //    newArray.val[i][j] = (analyzed.val[i][lower] + analyzed.val[i][higher]) / 2
                //} else
                //if (i !== lower && j !== lower) {
                //    var originalIdentifierIndexOfFirstCrossing = analyzed.header.indexOf(newArray.header[j]);
                //    var originalIdentifierIndexOfSecondCrossing = analyzed.header.indexOf(newArray.header[i]);
                //    newArray.val[i][j] = analyzed.val[originalIdentifierIndexOfSecondCrossing][originalIdentifierIndexOfFirstCrossing];
                //
                //} else if (i === lower) {
                //    var originalIdentifierIndexOfFirstCrossing = analyzed.header.indexOf(newArray.header[j]);
                //
                //    if (originalIdentifierIndexOfFirstCrossing < higher)
                //        newArray.val[i][j] = (analyzed.val[i][originalIdentifierIndexOfFirstCrossing] + analyzed.val[originalIdentifierIndexOfFirstCrossing][higher]) / 2
                //    else
                //        newArray.val[i][j] = (analyzed.val[i][originalIdentifierIndexOfFirstCrossing] + analyzed.val[higher][originalIdentifierIndexOfFirstCrossing]) / 2
                //
                //}

            }
        }

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

    }, _permute: (function () {
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
            getPermutations: function (input, size) {

                var chars = input;
                var output = [];
                var used = new Array(chars.length);

                doPermute(chars, output, used, size, 0);
                var ret = results;
                results = [];
                return ret;
            }
        }
    })(),
    _isDatInLowerHalf: function (x, y) {

        if (y <= x) return true;
        else return false;

    },
    _getValuesInRange: function (values, arrayOfRowPrevIndexes, arrayOfColumnPrevIndexes) {
        var rowPermutations = this._permute.getPermutations(arrayOfRowPrevIndexes, 2);
        var colPermutations = this._permute.getPermutations(arrayOfColumnPrevIndexes, 2);

        rowPermutations = this._checkIfUpper(rowPermutations);
        colPermutations = this._checkIfUpper(colPermutations);
        values = this._checkIfUpper(values);


        var ret = [];
        for (var i = 0; i < values.length; ++i) {
            var arr = values[i];
            if (!this._arrayContainsElems(rowPermutations, arr[0], arr[1]) && !this._arrayContainsElems(colPermutations, arr[0], arr[1]))
                ret.push(arr)
        }
        return ret;
    },
    _checkIfUpper : function(array){
        var ret = [];
        for (var i = 0; i < array.length; ++i) {
            var arr = array[i];
            if (this._isDatInLowerHalf(arr[0], arr[1]))
                ret.push(arr)
        }
        return ret;
    },
    _arrayEqual: function (a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    },_arrayContainsElems : function(array, x, y){

        for (var i = 0; i < array.length; ++i) {
            if ((array[i][0] === x && array[i][1] === y) ||
                (array[i][1] === x && array[i][0] === y)
            ){
                return true;
            }

        }
        return false;

    }


}