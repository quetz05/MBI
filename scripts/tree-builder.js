var treeBuilder = {
    getSmallestArrayElem: function (analyzedArray) {
        var smallest = {
            x: 0,
            y: 1,
            value: analyzedArray.val[0][1]
        }

        for (var i = 0; i < analyzedArray.val.length; ++i) {
            for (var j = 0; j < analyzedArray.val[i].length; ++j) {
                var currentValue = analyzedArray.val[i][j];
                if (currentValue === '-')
                    continue;

                if (currentValue < smallest.value) {
                    smallest.x = i;
                    smallest.y = j;
                    smallest.value = currentValue;
                }
            }
        }

        return smallest;
    }
}