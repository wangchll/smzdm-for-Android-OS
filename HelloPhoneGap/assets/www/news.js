//相当于HTML的onload,加载完毕时触发的方法
$(document).ready(function () {
	//用Ajax的方式，发起对远程数据的请求，注意跨域问题，一旦跨域请使用代理或其它方式解决
	$.ajax({
		url: 'http://feed.smzdm.com/',
		//数据URL
		dataType: 'xml',
		//数据类型设置
		type: 'GET',
		//Get还是Post
		timeout: 10000,
		//超时设置，单位为毫秒
		error: function (xml) { //加载错误的处理方法
			alert("loading xml error");
		},
		success: function (xml) { //加载成功的处理方法
			//也是用循环遍历数据节点
			$(xml).find("item").each(function (i) {
				var title = $(this).children("title").text(); //获取标题内容
				var description = $(this).children("description").text(); //获取摘要内容
				var link = $(this).children("link").text(); //获取链接地址
				var liNode = $('<li role="option" class="ui-li ui-li-static ui-btn-up-c">'); //声明一个li标签节点
				var slink = "<a href='"+link+"' >"+title+"</a>";
				$("<h3></h3>").html(slink).appendTo(liNode); //用h3包裹标题并添加到li节点
				$("<p></p>").html(description).appendTo(liNode); //用p包裹摘要并添加到li节点
				liNode.appendTo("ul"); //最终将li节点添加到ul节点，形成列表显示
			});
		}
	});
})