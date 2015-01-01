var main = function() {
  walk(document.body);

  function walk(node) 
  {
    // stolen from http://is.gd/mwZp7E
    
    var child, next;

    switch ( node.nodeType )  
    {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
        child = node.firstChild;
        while ( child ) 
        {
          next = child.nextSibling;
          walk(child);
          child = next;
        }
        break;
      case 3: // Text node
        if(node.parentElement.tagName.toLowerCase() != "script") {
            handleText(node);
        }
        break;
    }
  }

  function handleText(textNode) {
    var v = textNode.nodeValue;
    data.forEach(function(val, index){
      var chance = Math.random();
      if(chance < val.frequency) {v = v.replace(new RegExp(val.regex, "g"), val.replace);}
    });
    textNode.nodeValue = v;
  }
};

var data;

chrome.storage.sync.get({
  items: [{"regex":"[aeiou]","replace":"o","frequency":"1"},{"regex":"[AEIOU]","replace":"O","frequency":"1"}] 
}, function(d) {
  data = d.items;
  main();
});
