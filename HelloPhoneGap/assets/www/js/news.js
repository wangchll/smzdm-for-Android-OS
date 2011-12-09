/**
 * @author hushicai
 * @date 2011/12/7
 * 
 * newsCtrl
 */
var newsCtrl = {
	//properties
	URL_NEWS: 'http://feed.smzdm.com/',
	//public methods
	init: function() {
		var me = this;
		
		$(document).bind('vmousemove', function(e) {
			e.preventDefault();
		});
		
		//初始化loading图标
		loadingCtrl.init();
		
		//如果单击刷新按钮，则重新加载列表，如果正在加载中，则不重新请求
		$('#Refresh').bind('vmouseup', function(e) {
			me.loadNews(this);
		});
		
		me.loadNews();
		
	},
	initScroll: function() {
		var me = this;
		
		if(me.myScroll) {
			me.myScroll.refresh();
			me.myScroll.scrollTo(0, 0);
		} else {
			me.myScroll = new iScroll('Wrap');
		}
	},
	loadNews: function() {
		var me = this;
				
		//显示加载图标
		loadingCtrl.show();
		
		$.ajax({
			url: me.URL_NEWS,
			dataType: 'xml',
			type: 'GET',
			timeout: 10000,
			error: me.loadError,
			success: function(xml) {
				me.loadSuccess(xml);
			}
		});
	},
	loadError: function() {
		alert('loading xml error!');
	},
	loadSuccess: function(xml) {
		var me = this;
		
		var html = "",
			li = "";
		
		//构建html
		$(xml).find("item").each(function (i) {
			var title = $(this).children("title").text(), //标题
				description = $(this).children("description").text(), //摘要内容
				href = $(this).children("link").text(), //链接地址
				link = '<a href="'+ href +'">'+ title +'</a>';
				
			li = '<li role="option" class="ui-li ui-li-static ui-btn-up-c">' + 
					'<h2>'+ link +'</h2>' + 
					'<p>'+ description +'</p>' + 
	             '</li>';
			
			html += li;
		});
		//构建完所有html再插入到页面中，减少reflow与repaint
		$('ul').html(html);
		
		me.initScroll();
		
		//关闭loading图标
		loadingCtrl.hide();
	}
};

var loadingCtrl = {
	//properies
	CLASS_LOADING : 'ui-loading',
	TAG			  : 'body',
	
	//public methods
	init: function() {
		var me = this;
		
		//初始化loading信息内容
		$.mobile.loadingMessage = "加载中...";
	},
	show: function() {
		var me = this;
		
		$(me.TAG).addClass(me.CLASS_LOADING);
	},
	hide: function() {
		var me = this;
		
		$(me.TAG).removeClass(me.CLASS_LOADING);
	}
};
//初始化
$(document).ready(function() {
	newsCtrl.init();
});
