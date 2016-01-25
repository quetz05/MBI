function MBINode(name){
    this.name = name;
    this.children = [];
    this.parentDist = -1;
}

MBINode.prototype.insertChild = function(node){

    if(typeof node !== Object && !(node instanceof MBINode))
        throw "Incorrect data type";

    this.children.push(node);
    return node;
}

MBINode.prototype.getLengthToTheBottom = function(){
    var len = 0;

    if(this.children.length > 0)
        len += this.children[0].parentDist + this.children[0].getLengthToTheBottom();
    return len;
}