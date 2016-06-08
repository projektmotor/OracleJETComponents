
addAutocompletion = function (params) {
    var
        config,
        codeCompletion,
        builder;

    / @todo: use merge here /
    config = params;

    codeCompletion = new Packages.api.Collector({
        collect: function(resultSet){

            var 
                modifier, 
                selectAction, 
                item;

            //completion with modifier
            modifier = new Packages.api.Modifier({
               modify: config.onSubmit
            });

            selectAction = new Packages.api.SelectionAction({
                init: config.onSelect,
                remove: config.onBlur
            });

            item = builder.createItem(config.name);
            item.addSelectionAction(selectAction);
            item.setModifier(modifier);

            resultSet.addItem(item);
        }
    });

    builder = completions.add(config.scope, codeCompletion);
};

addAutocompletion({
    name : 'gauge',
    scope : 'text/html',
    onSelect : function(completionObject) {},
    onBlur : function() {},
    onSubmit : function() {
        var html = io.loadFile("gauge.html");
        var name = window.input("Gauge name",
            "Please enter a name for your gauge.",
            "myFancyGauge");
        html = html.replace("#name", name);
        
        var jsEditorDObjs = window.findEditorDataObjects("text/javascript");
        if(jsEditorDObjs.isEmpty()){
            window.alert("no js file opened. open one and try again, please.");
            return;
        }
        var edObj = jsEditorDObjs.get(0);
        var edPath = edObj.getPrimaryFile().getPath();
        var ed = window.getEditor(edPath);
        var gaugeJSCode = io.loadFile("gauge.js");
        ed.replaceSelection(gaugeJSCode);
        return html;
    }
});

cs.extend.addSimplifier({
    name: "hellworldsimplifier",
    onRun: function(){
       window.alert("Hello world!"); 
    }
});




cs.extend.addSimplifier({
    name: "hideHelp",
    onRun: function(){
       var userDir = io.getUserDirectory(); 
       var menuDir = userDir+"/config/Menu";
       if( ! io.fileExists(menuDir)){
           io.createDirectory(menuDir);
       }
       
       io.createFile(menuDir+"/Help_hidden");
    }
});

cs.extend.addSimplifier({
    name: "hideTools",
    onRun: function(){
       var userDir = io.getUserDirectory(); 
       var menuDir = userDir+"/config/Menu";
       if( ! io.fileExists(menuDir)){
           io.createDirectory(menuDir);
       }
       
       io.createFile(menuDir+"/Tools_hidden");
    }
});


cs.extend.addSimplifier({
    name: "showDropDown",
    onRun: function(){
       var selection = window.dropDownDialog("choose something", ["Tools", "Edit", "Help"]);
       window.alert(selection);
    }
});