// drawdiagram.js
function drawDiagram(xmiDoc) {
	// 解析 XML 
	//console.dir(xmiDoc);
	var xmiRoot = xmiDoc.children()[0]; //console.dir(umlClassArr);
	// 准备 Canvas
	var ct = $('#diagramct'); //console.dir(ct.width());v
	var width = ct.width();
	var canvas = new fabric.Canvas('diagrampreview', {
		backgroundColor: 'rgb(246,246,246)',
		selectionColor: 'blue',
		selectionLineWidth: 2
	});
	canvas.setHeight(200);
	canvas.setWidth(width);
	// 画出每一个类
	for(var i=0; i<xmiRoot.children.length; i++) {
		var xmiNode = xmiRoot.children[i]; //console.dir(xmiNode);
		if ('uml:Class' == xmiNode.nodeName) { 
			var className = xmiNode.getAttribute('name'); // console.dir(className);
			var properties = [];
			var operations = [];
			var classChildren = xmiNode.children;
			for(var j=0; j<classChildren.length; j++) {
				var classEle = classChildren[j];
				if ('ownedAttribute' == classEle.nodeName) {
					//console.dir(classEle);
					var xmiType = classEle.getAttribute('xmi:type'); //console.dir(xmiType);
					if ('uml:Property' == xmiType) {
						properties[properties.length] = {
							name: classEle.getAttribute('name'),
							type: 'String',
							visibility: classEle.getAttribute('visibility')
						};
					} else if ('uml:Operation' == xmiType) {
						operations[operations.length] = {
							name: classEle.getAttribute('name'),
							returnType: 'String',
							visibility: classEle.getAttribute('visibility')
						};
					}
				}
			}
			var umlClass = new jsuml.cd.Class({
				name: className,
				width: 100,
				left: 30,
				top : 30,
				fill: jsuml.COLOR_BLUE,
				stroke: jsuml.STROKE_BLUE,
				properties: properties,
				operations: operations
			});
			//console.dir(umlClass.toFabric());
			//console.dir(canvas);
			var items = umlClass.toFabric();
			for(var j=0; j<items.length; j++) {
				canvas.add(items[j]);
			}	
		}

		canvas.renderAll();
	}
}
// 加载 XMI 模型文件
function loadXmi(url) {
	$.ajax({
	    type: "GET",
	    url: url,
	    dataType: "html",
	    success: function (data, textStatus, jqXHR) {
	    	//console.log(data); 
	        $("#modelxmi").val(data);
	        var xmlDoc = $.parseXML(data); 
	        var $xml = $(xmlDoc); //console.dir($xml);
	        drawDiagram($xml);
	        // $xml.find('uml:class').each(function () {
	        // 	console.dir($(this).text());
	        //     //$("#modelxmi").append($(this).text() + "<br />");
	        // });
	    },
	    error : function (jqXHR, textStatus, errorThrown) {
	    	console.dir(errorThrown);
	    }
	});	
}
// document ready
$( document ).ready(function(){
	$("#modelxmi").append('loading ...');

	// 加载默认XMI，画出类图
	loadXmi("./xmi/default.xml");

	// 监视XMI，发生变化时重新画图 
	$("textarea#modelxmi").on('change', {param: 'value'}, function(eventObject) {		
		var xmlDoc = $.parseXML($(this).val()); 
	    var $xml = $(xmlDoc); //console.dir($xml);
	    drawDiagram($xml);
	    // $xml.find('uml:class').each(function () {
	    // 	console.dir($(this).text());
	        //$("#modelxmi").append($(this).text() + "<br />");
	    // });
	});

	// 监视模型选择控件 
	$("select#models").on('change', {param: 'value'}, function(eventObject) {
		var url = $(this).val(); //console.dir(url);
		loadXmi(url);
	});
});