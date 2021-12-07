$(function() {
	//按钮点击后
    $(".btn").click(function(){
        $(this).button('loading').delay(3000).queue(function() {
			var error = document.getElementById("error");
			var success = document.getElementById("success");
			error.style.display="none";
			success.style.display="none";
		$(this).button('reset');
		$(this).dequeue(); 
        });
    });
}); 