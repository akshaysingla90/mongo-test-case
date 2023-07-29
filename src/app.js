'use strict';

function FileTreeNode(nodeId, name, type,parentNode) {
  this.children = [];

  this.nodeId = nodeId;
  this.name = name;
  this.type = type;
  this.parentNode = parentNode;

  this.addChild = function(node){
    if (this.type !== 'DIRECTORY') {
      throw "Cannot add child node to a non-directory node";
    }
    this.children.push(node);
  };
  this.getChildren = function() {
    return this.children;
  };
};

function FileTree() {
  this.nodes = [];

  this.getRootNodes = function() {
    const result = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (!this.nodes[i].parentNode) {
        result.push(this.nodes[i]);
      }
    }
    return result;
  };
  this.findNodeById = function(nodeId) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].nodeId === nodeId) {
        return this.nodes[i];
      }
    }
    return null;
  };
  this.createNode = function(nodeId, name, type, parentNode) {
    const node = new FileTreeNode(nodeId, name, type,parentNode);
    if (parentNode) {
      parentNode.addChild(node);
    }
    this.nodes.push(node);
  }
};

export function createFileTree(input) {
  const fileTree = new FileTree();

  for (const inputNode of input) {
    var parentNode = inputNode.parentId ? fileTree.findNodeById(inputNode.parentId) : null;
    fileTree.createNode(inputNode.id, inputNode.name, inputNode.type, parentNode);
  }

  return fileTree;
}
