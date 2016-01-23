function MBINode(name){
    this.name = name;
    this.children = [];
    this.parentDist = -1;
}

MBINode.prototype.insertChild = function(node){
    console.log(typeof node)
    if(typeof node !== Object && !(node instanceof MBINode))
        throw "Incorrect data type";

    this.children[0] = node;
    return node;
}