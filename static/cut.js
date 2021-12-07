//iframe内部禁止方法
window.onload=function(){

  document.getElementById('iframe').contentDocument.onkeydown = function(ev){
	 
	//禁止保存ctrl+s
	if (ev && (ev.ctrlKey || ev.metaKey) && (ev.keyCode == 83)) {
		//alert("本站禁止了此功能，请您下载后，在查看代码！");
		return false;
	}
    //禁止F12等等~~
    if(window.event && (window.event.keyCode == 123 || window.event.keyCode == 8 || window.event.keyCode == 9 || window.event.keyCode == 13)) {
        window.event.returnValue=false;
        return false;
    }
	
  }
  //禁止右键
  document.getElementById('iframe').contentDocument.oncontextmenu = function(){ 
    //alert("本站禁止了此功能，请您下载后，在查看代码！");
    return false;
  } 
  
}

//iframe外部禁止
document.onkeydown = function(){/*9:Tab键, 17：Control键, 18:Alt键, 123:F12键, 83:S键*/
	
    //禁止保存ctrl+s
	if (window.event && (window.event.ctrlKey || window.event.metaKey) && (window.event.keyCode == 83)) {
		//alert("本站禁止了此功能，请您下载后，在查看代码！");
		return false;
	}
		//禁止F12等等~~
	if(window.event && (window.event.keyCode == 123 || window.event.keyCode == 8 || window.event.keyCode == 9 || window.event.keyCode == 13)) {
			window.event.returnValue=false;
			return false;
		}
}



//屏蔽右键
document.oncontextmenu = function (event){
    if(window.event){
    event = window.event;
    }
    try{
    var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
        return false;
        }
        return true;
    }
    catch (e){
        return false;
    }
}

//屏蔽选中
document.onselectstart = function (event){
    if(window.event){
        event = window.event;
        }
    try{
        var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
        return false;
        }
        return true;
        } 
    catch (e) {
        return false;
    }
}
//屏蔽复制
document.oncopy = function (event){
    if(window.event){
    event = window.event;
    }
    try{
        var the = event.srcElement;
        if(!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
        return false;
        }
        return true;
        }
    catch (e){
        return false;
    }
}

//屏蔽剪切
//document.oncut = function (event){
//    if(window.event){
//    event = window.event;
//    }
//    try{
//        var the = event.srcElement;
//        if(!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
//        return false;
//        }
//        return true;
//        }
//    catch (e){
//        return false;
//    }
//}

//屏蔽粘贴
//document.onpaste = function (event){
//    if(window.event){
//        event = window.event;
//        }
//    try{
//        var the = event.srcElement;
//        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
//        return false;
//        }
//        return true;
//        }
//    catch (e){
//        return false;
//    }
//}
