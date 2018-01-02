// JavaScript Document

$(function(){
	var colors=colorPick();
	colorBlock(colors,"#colors");
	$("#level-button").click(function(){
		hsb(colors);
		colorKind(colors,"#level-list");
		$("#level-button").remove();
	});
});

function colorPick(){
	var colors=new Array();
	$("tr").has("td").each(function(){
		var color=new Object(),
			rgb=$(this).children("td:nth-child(5)").text().split(",");
		color.name=$.trim($(this).children("td:nth-child(3)").text());
		color.hex=$.trim($(this).children("td:nth-child(4)").text()).toUpperCase();
		color.red=parseInt(rgb[0]);
		color.green=parseInt(rgb[1]);
		color.blue=parseInt(rgb[2]);
		colors.push(color);
	});
	return colors;
}

function colorBlock(colors,id){
	for(color in colors){
		$(id).append("<div></div>");
	}
	for(var e=0;e<$(id+" div").length;++e){
		$(id+" div").eq(e).css("background-color",colors[e].name).attr("title",colors[e].hex).append("<dfn>"+colors[e].name+"</dfn>");
	}
}

function colorKind(colors,id){
	var color_kind=new Array();
	for(color in colors){
		if(!color_kind[colors[color].kind-1]){
			color_kind[colors[color].kind-1]=new Array();
		}
		color_kind[colors[color].kind-1].push(colors[color]);
	}
	$(id).append("<ul></ul>");
	for(kind in color_kind){
		$(id+" ul").append("<li id='k"+kind+"'></li>");
		colorBlock(color_kind[kind],"#k"+kind);
	}
}

function hsb(colors){
	for(color in colors){
		if(colors[color].red>=colors[color].green){
			if(colors[color].red>=colors[color].blue){
				colors[color].max_color=colors[color].red;
				colors[color].max_ratio=0.5;
				if(colors[color].green>=colors[color].blue){
					colors[color].mid_color=colors[color].green;
					colors[color].mix_ratio=0.6;
					colors[color].min_color=colors[color].blue;
				}else{
					colors[color].mid_color=colors[color].blue;
					colors[color].mix_ratio=0.7;
					colors[color].min_color=colors[color].green;
				}
			}else{
				colors[color].max_color=colors[color].blue;
				colors[color].max_ratio=0.3;
				colors[color].mid_color=colors[color].red;
				colors[color].mix_ratio=0.7;
				colors[color].min_color=colors[color].green;
			}
		}else{
			if(colors[color].red>=colors[color].blue){
				colors[color].max_color=colors[color].green;
				colors[color].max_ratio=0.5;
				colors[color].mid_color=colors[color].red;
				colors[color].mix_ratio=0.6;
				colors[color].min_color=colors[color].blue;
			}else{
				if(colors[color].green>=colors[color].blue){
					colors[color].max_color=colors[color].green;
					colors[color].max_ratio=0.5;
					colors[color].mid_color=colors[color].blue;
					colors[color].mix_ratio=0.6;
				}else{
					colors[color].max_color=colors[color].blue;
					colors[color].max_ratio=0.3;
					colors[color].mid_color=colors[color].green;
					colors[color].mix_ratio=0.6;
				}
				colors[color].min_color=colors[color].red;
			}
		}
		colors[color].level=Math.round((colors[color].max_color-colors[color].mid_color)*colors[color].max_ratio+(colors[color].mid_color-colors[color].min_color)*colors[color].mix_ratio+colors[color].min_color);
		if(colors[color].max_color!=0){
			colors[color].saturation=Math.round((colors[color].max_color-colors[color].min_color)/colors[color].max_color*255);
		}else{
			colors[color].saturation=0;
		}
		if(colors[color].saturation==0){
			colors[color].hue=-1;
		}else if(colors[color].max_color==colors[color].red && colors[color].green>=colors[color].blue){
			colors[color].hue=Math.round(((colors[color].green-colors[color].blue)/(colors[color].max_color-colors[color].min_color))*60);
		}else if(colors[color].max_color==colors[color].red && colors[color].green<colors[color].blue){
			colors[color].hue=Math.round(((colors[color].green-colors[color].blue)/(colors[color].max_color-colors[color].min_color))*60)+360;
		}else if(colors[color].max_color==colors[color].green){
			colors[color].hue=Math.round(((colors[color].blue-colors[color].red)/(colors[color].max_color-colors[color].min_color))*60)+120;
		}else if(colors[color].max_color==colors[color].blue){
			colors[color].hue=Math.round(((colors[color].red-colors[color].green)/(colors[color].max_color-colors[color].min_color))*60)+240;
		}
		if((colors[color].hue>=0 && colors[color].hue<15) || (colors[color].hue>=345 && colors[color].hue<=360)){
			colors[color].kind=1;
		}else if(colors[color].hue>=15 && colors[color].hue<45){
			colors[color].kind=2;
		}else if(colors[color].hue>=45 && colors[color].hue<75){
			colors[color].kind=3;
		}else if(colors[color].hue>=75 && colors[color].hue<105){
			colors[color].kind=5;
		}else if(colors[color].hue>=105 && colors[color].hue<160){
			colors[color].kind=5;
		}else if(colors[color].hue>=160 && colors[color].hue<165){
			colors[color].kind=7;
		}else if(colors[color].hue>=165 && colors[color].hue<195){
			colors[color].kind=7;
		}else if(colors[color].hue>=195 && colors[color].hue<225){
			colors[color].kind=8;
		}else if(colors[color].hue>=225 && colors[color].hue<255){
			colors[color].kind=9;
		}else if(colors[color].hue>=255 && colors[color].hue<285){
			colors[color].kind=10;
		}else if(colors[color].hue>=285 && colors[color].hue<315){
			colors[color].kind=11;
		}else if(colors[color].hue>=315 && colors[color].hue<345){
			colors[color].kind=11;
		}else{
			colors[color].kind=13;
		}
	}
	colors.sort(function(a,b){
		if(a.kind==b.kind){
			return b.level-a.level;
		}
		return a.kind-b.kind;
	});
}