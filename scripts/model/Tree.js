function Tree(rootNode) {
    this._root = rootNode;


}

Tree.prototype.findNodeAndRemove = function (idetifier) {

    for (var i = 0; i < this._root.children.length; ++i) {
        if (this._root.children[i].name === idetifier) {
            var found = this._root.children[i];
            this._root.children.splice(i, 1);

            return found;
        }
    }
    return -1;
}

Tree.prototype.insert = function (node) {

    return this._root.insertChild(node)
}