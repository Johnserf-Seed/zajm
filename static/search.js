$(document).ready(function(){
	var error = document.getElementById("error");
	error.style.display="none";
	var success = document.getElementById("success");
	success.style.display="none";
	
	$("#b").click(function(){
		var uid = $('#number').val();
		console.log(uid);
		$.getJSON("/userProfile", {"number": uid,},function(data){

		  if(data.name == ''){
			error.style.display="block";
			success.style.display="none";
			console.log('请求失败!');
			//alert('');
		  }else { 
			error.style.display="none";
			success.style.display="block";
			console.log('请求成功!');
			//var a = $.parseJSON(data);
			alert('姓名：'+data.name+'\n'+'学号：'+data.number+'\n'+'系别：'+data.college+'\n'+'次数：'+'你已经完成了'+data.counts+'次！'+'\n'+'班级：'+data.class+'\n');
		}	
		});
	});
});