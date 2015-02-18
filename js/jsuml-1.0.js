// jsuml-1.0.js
var jsuml = jsuml || { version: "1.0", author: 'Shaoning Zeng' };

// 配置
jsuml.COLOR_BLUE  = 'RGB(196, 219, 240)';
jsuml.STROKE_BLUE = 'RGB(107, 161, 197)';

// 类图
jsuml.classdiagram = {};
jsuml.cd = jsuml.classdiagram;

jsuml.cd.Class = function(cfg) {
	this.name   = cfg.name;
	this.color  = cfg.color;
	this.fill   = cfg.fill   ? cfg.fill   : 'silver';
	this.stroke = cfg.stroke ? cfg.stroke : 'black';
	this.left   = cfg.left   ? cfg.left   : cfg.l;
	this.top    = cfg.top    ? cfg.top    : cfg.t;
	this.height = cfg.height ? cfg.height : cfg.h;
	this.width  = cfg.width  ? cfg.width  : cfg.w;
	this.properties = cfg.properties;
	this.operations = cfg.operations;
};
jsuml.cd.Class.prototype.toFabric = function() {
	var canvasItems = [];
	var leftStart = this.left;
	var topStart  = this.top;
	var lineHeight = 24;
	// 添加类名
	var classNameRect = new fabric.Rect({
		width : this.width,
		height: lineHeight * 1.2,
		left  : leftStart,
		top   : topStart,
		//originX: 'center',
		//originY: 'center',
		fill   : this.fill,
		strokeWidth: 1, 
		stroke: this.stroke
    });
    //classNameRect.set({ strokeWidth: 1, stroke: this.stroke });
	var classNameText = new fabric.Text(this.name, { 
		fontSize: 16,
		fontWeight: 'bold',
		lineHeight: 1,
		color: 'white',
		width: this.width,
		textAlign: 'center',
		left: leftStart + (this.width-this.name.length*8)/2, 
		top : topStart + (lineHeight/3),
		shadow: 'rgba(0,0,0,0.2) 0 0 5px'
	});
	canvasItems[canvasItems.length] = classNameRect;
	canvasItems[canvasItems.length] = classNameText;
	topStart += lineHeight * 1.2;
    // 添加属性
    if (this.properties) {
		var propertyRect = new fabric.Rect({
			width : this.width,
			height: lineHeight*this.properties.length,
			left  : leftStart,
			top   : topStart,
			//originX: 'center',
			//originY: 'center',
			fill: this.fill,
			strokeWidth: 1, 
			stroke: this.stroke
	    });
	    canvasItems[canvasItems.length] = propertyRect;	    
		for(var i=0; i<this.properties.length; i++) {
	        var text = '- ' + this.properties[i].name + " : " + this.properties[i].type;
			var propertyText = new fabric.Text(text, { 
				fontSize: 13,
				//fontWeight: 'bold',
				lineHeight: 1,
				color: 'white',
				width: this.width,
				textAlign: 'center',
				left: leftStart + 5, 
				top : topStart + (lineHeight/3),
				shadow: 'rgba(0,0,0,0.2) 0 0 5px'
			});
	        canvasItems[canvasItems.length] = propertyText;
			topStart += lineHeight;
		}
    }
	// 添加方法
	if (this.operations) {
		var operationRect = new fabric.Rect({
			width : this.width,
			height: lineHeight*this.operations.length,
			left  : leftStart,
			top   : topStart,
			fill: this.fill,
			strokeWidth: 1, 
			stroke: this.stroke
	    });
	    canvasItems[canvasItems.length] = operationRect;	
		for(var i=0; i<this.operations.length; i++) {
	        var text = '+ ' + this.operations[i].name + "() : " + this.operations[i].returnType;
			var operationText = new fabric.Text(text, { 
				fontSize: 13,
				//fontWeight: 'bold',
				lineHeight: 1,
				color: 'white',
				width: this.width,
				textAlign: 'center',
				left: leftStart + 5, 
				top : topStart + (lineHeight/3),
				shadow: 'rgba(0,0,0,0.2) 0 0 5px'
			});
	        canvasItems[canvasItems.length] = operationText;
			topStart += lineHeight;
		}
	}
	// 返回
	return canvasItems;
};