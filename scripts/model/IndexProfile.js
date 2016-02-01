function IndexProfile(number){
    this.number = number;
    this.values = {
        A: 0,
        T: 0,
        G: 0,
        C: 0,
        gap: 0,
    };
    this.counter = 0;
}

IndexProfile.prototype.addSymbol = function(symbol) {
    switch(symbol){
        case 'A':
            this.values.A += 1;
            this.counter += 1;
            break;
        case 'T':
            this.values.T += 1;
            this.counter += 1;
            break;
        case 'G':
            this.values.G += 1;
            this.counter += 1;
            break;
        case 'C':
            this.values.C += 1;
            this.counter += 1;
            break;
        case '-':
            this.values.gap += 1;
            this.counter += 1;
            break;
        default:
            this.counter += 1;
    }
};

IndexProfile.prototype.getProfilePropability = function(identifier) {
    return this.values[identifier] / this.counter;
};

IndexProfile.prototype.getMostPropablyChar = function() {
    var char = 'A',
        charValue = this.values.A;
    if(this.values.T > charValue){
        char = 'T';
        charValue = this.values.T;
    }
    if(this.values.G > charValue){
        char = 'G';
        charValue = this.values.G;
    }
    if(this.values.C > charValue){
        char = 'C';
    }
    return char;
};