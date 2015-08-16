check_load = true;
function load_start(){
	$('#markai30').addClass('hiddent');
	$('.loading').fadeIn('500');
}
function load_end(){
	$('#markai30').removeClass('hiddent');
	$('.loading').fadeOut('500');
}
function get_tag(){
	var a = $('.input.keyword').val();
	var b = a.replace(/ /gi,'+');
	var url = '/search?search_keywords='+b+'&domains=viethoagame.forumvi.com&sitesearch=viethoagame.forumvi.com&client=&forid=1&ie=utf-8&oe=utf-8&hl=vi&cof=GALT%3A%23f58439%3BGL%3A1%3BDIV%3A%23ffffe1%3BVLC%3A%23f58439%3BAH%3Acenter%3BBGC%3A%23fbfbfb%3BLBGC%3A%23ffffe1%3BALC%3A%23f58439%3BLC%3A%23f58439%3BT%3A%23ffffff%3BGFNT%3A%23f58439%3BGIMP%3A%23f58439%3BFORID%3A11&search_terms=any&search_author=&search_where=f29&search_time=0&show_results=posts&sort_by=1&sort_dir=ASC&google=';
	var forum = false;
	$('.input.keyword').val('');
	if(check_load == true){
		check_load = false;
		load_start();
		$.get(url).done(function(a){
			var number = $(a).find('.page-title strong');
			if(number){
				var number = number.text();
				$('.box_left .type_title').text('Tìm thấy được '+number+' phim.');
				set_item(a,forum);
			}
		});
	}
	else{
		alert('Hiện đang tải dữ liệu.');
	}
}
function get_forum(){
	var forum = true;
	var url = $(this).attr('href');
	var fclass = $(this).attr('class');
	if(fclass != 'undefined'){
		$(this).closest('ul').find('.active').removeClass('active');
		$(this).closest('li').addClass('active');
		var forum_text = $(this).attr('title');
		$('.box_left .type_title').text(forum_text);
	}
	if(check_load == true){
		load_start();
		check_load = false;
		$.get(url).done(function(a){
			set_item(a,forum);
		})
	}
	else{
		alert('Hiện đang tải dữ liệu.');
	}
}
function set_item(data,forum){
	var data = $(data);
	$('.forum_detail,.page_nav').show();
	$('.content-body').removeClass('video_set');
	if(forum == true){
		var block = 'blog_message';
		var block_title = 'blog_title';
		var block_text = 'blog_text_title';
		var block_image = 'detail img:first';
	}
	else if(forum == false){
		var block = 'search.post';
		var block_title = 'sr_title';
		var block_text = 'sr_title';
		var block_image = 'post_content.content_searcb img:first';
	}
	var count = data.find('.'+block+'').length;
	var item_set = '';
	var slide_data_html = '';
	for(var j = 0;j < count;j++){
		var item = data.find('.'+block+':eq('+j+')');
		var url = item.find('.'+block_title+'').attr('href');
		var title = item.find('.'+block_text+'').text();
		var image = item.find('.'+block_image+'').attr('src');
		var html = '<div class="item col-lg-3 col-md-4 col-sm-6 col-xs-6"><div class="inner">';
		var tag_a = '<a class="item_video video_preview" href="'+url+'" title="'+title+'" onclick="event.preventDefault();get_topic.call(this)">';
		var tag_img = '<img alt="http://viethoagame.forumvi.com/" src="'+image+'" />';
		var tag_tile = '<span class="title_video">'+title+'</span></a></div></div>';
		html += tag_a;
		html += tag_img
		html += tag_tile;
		item_set += html;
	}
	$('.list-film').html(item_set);
	var page = data.find('.ctfr:first');
	var page2 = page.find('span:first');
	page2.find('.page-sep').remove();
	page2.find('strong').wrap('<span class="item current"></span>');
	page2.find('a').attr('onclick','event.preventDefault();get_forum.call(this)').wrap(' <span class="item"></span>');
	page2.find('.sprite-arrow_prosilver_right').replaceWith('Sau');
	page2.find('.sprite-arrow_prosilver_left').replaceWith('Trước');
	var page_of1 = page.find('a:first strong:first').text();
	var page_of2 = page.find('a:first strong:last').text();
	var total = '<span class="desc">Trang '+page_of1+'/ '+page_of2+'</span>';
	page2.find('.item:first').before(total);
	$('.page_nav').html(page2);
	check_load = true;
	load_end();
}
function facebook(){
	(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.4&appId=1401365470085999";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
}
facebook();
function get_topic(){
	var url = $(this).attr('href');
	if(check_load == true){
		load_start();
		check_load = false;
		$('.forum_detail,.page_nav').hide();
		$('.content-body').addClass('video_set');
		if($('.list-film .movie_slide_body .slide').length > 0){
		}
		else{
			$('.box_left .col-xs-6 a').wrap('<div class="slide"></div>');
			var slide = $('.list-film .item .inner').find('.slide');
			$('#topic .movie_slide_body').html(slide);
		}
		var html = $('#topic').html();
		$('.list-film').html(html);
		load_video();
		$.get(url).done(function(a){
			set_topic(a);
		})
	}
	else{
		alert('Hiện đang tải dữ liệu.');
	}
}
function set_topic(a){
	var topic = $(a);
	var url2 = topic.find('.page-title a').attr('href');
	var url = 'http://viethoagame.forumvi.com' + url2;
	var title = topic.find('.page-title a').text();
	$('title').text(title);
	window.history.pushState('page2', title, url2);
	var title = '<a href="'+url+'" onclick="event.preventDefault()">'+title+'</a>';
	var box = topic.find('.content.clearfix');
	image_video = box.find('img:first').attr('src');
	var box_gt = box.find('ul').html();
	var box_gt = '<ul class="box_gt">'+box_gt+'</ul>';
	var box_nd = box.find('div[align="justify"]').html();
	var box_nd = '<div class="box_nd">'+box_nd.replace(/\[color.+\"\]/gi,'')+'</div>';
	var html_nd = box_gt + box_nd;
	var box_episode = box.find('.mobile_video td').html();
	var box_episode = '<div>' + box_episode + '</div>';
	var box_episode = $(box_episode);
	box_episode.find('strong').wrap('<span class="server"></span>');
	box_episode.find('a').attr('onclick','event.preventDefault();phimhd.call(this)');
	var video_first = box_episode.find('a:first').addClass('active').attr('href');
	$('.media_body .type_title').html(title);
	$('#episode').html(box_episode);
	$('.topic_body .spoiler_content.hide').html(html_nd);
  $('.FB_body').html('<div class="fb-comments" data-href="'+url+'" data-numposts="50" width="100%" data-colorscheme="dark" data-version="v2.3"></div>');
  $('.box_like').html('<div class="fb-like" data-layout="button" data-href="'+url+'" data-colorscheme="dark"></div><div class="g-plusone" data-size="medium" data-href="'+url+'"></div>');
    gapi.plusone.go("content");
    gapi.comments.render('google_comments',{href:url,width: 680,first_party_property: 'BLOGGER',view_type: 'FILTERED_POSTMOD'});
  	$('.movie_slide_body:first').bxSlider({
    	slideWidth: 170,
    	minSlides: 1,
    	maxSlides: 4,
    	slideMargin: 14
  	});
    check_load = true;
    FB.XFBML.parse(document.getElementById('fb-comments'));
    FB.XFBML.parse(document.getElementById('like'));
    load_end();
    set_first = true;
    set_hd = false;
    check_get = true;
    get_phim(video_first,set_first);
}
function spoiler(){
	var spoiler = $(this).closest('.spoiler');
	var box = spoiler.find('.spoiler_content');
	var s_class = box.attr('class');
	if(s_class.indexOf('hide') > -1){
		box.removeClass('hide').addClass('show');
		spoiler.find('.spoiler_right').removeClass('hide').addClass('show');
		spoiler.find('.spoiler_left').removeClass('show').addClass('hide');
	}
	else{
		box.removeClass('show').addClass('hide');
		spoiler.find('.spoiler_right').removeClass('show').addClass('hide');
		spoiler.find('.spoiler_left').removeClass('hide').addClass('show');
	}
}
function zoom_in(){
	var width = $('.container').width();
	var height = $('.media_body').height() + 5;
	$('.media_body').animate({width: ''+width+'px'});
	$('.box_box_right').animate({'margin-top': ''+height+'px'});
}
function zoom_out(){
	var width = $('.media_block').width();
	$('.media_body').animate({width: ''+width+'px'});
	$('.box_box_right').animate({'margin-top': '0px'});
}

function load_video(){
	$('#view_video').html('<div class="video_load mejs-container"><diiv class="load_img"><img src="http://mediaelementjs.com/js/mejs-2.18.1/loading.gif"><span>Đang Tải Phim</span></div></div>');
}

function youtube(link,set_first){
	var link = link.match(/(?:v=|v\/|embed\/|youtu.be\/)(.{11})/)[1];
	var video = '<iframe width="100%" height="360" src="https://www.youtube.com/embed/'+link+'" frameborder="0" allowfullscreen></iframe>';
		$('#view_video').html(video);
}
function google(file_1,file_2,type_1,type_2,image,set_first){
	if(image == true){
		var image = file_1;
		var file = file_2;
		var type = type_2;
		var quality = "";
	}
	else{
		var image = image_video;
		var file = file_1;
		var type = type_1;
		if(file_2 == false){
			var quality = '';
		}
		else{			
			var quality = '<div class="change_hd"><div class="change_content"><span onclick="changer_quality.call(this)" data="mhd" class="m_hd box_change active">Bản Thường</span><span onclick="changer_quality.call(this)" data="hd" class="full_hd box_change">Bản Đẹp</span></div></div>';
		}
	}
	var video = '<video id="vd_google" class="markai_vd"  controls="controls" preload="auto" width="100%"  height="360" poster="'+image+'">';
  	video += '<source src="'+file+'" type="'+type+'" />';
  	video += '</video>';
	$('#view_video').html(video);
	$('#vd_google').mediaelementplayer({
            success: function(player, node) {
                player.addEventListener('ended', function(e){
                    $('#episode .active').next('a').trigger('click');
                });
            }
   });
}
function phimhd(){
		load_video();
		$('#episode .active').removeClass('active');
		$(this).addClass('active');
		var link = $(this).attr('href');
		check_get = true;
		get_phim(link,set_first);
}
function changer_quality(){
	var active = $(this).attr('class');
	if(active.indexOf('active') > -1){
	}
	else{
		$('.change_hd .active').removeClass('active');
		$(this).addClass('active');
		var type = $(this).attr('data');
		var video = $('#vd_google_html5_api,#vd_google_html5_api source');
		if(type.indexOf('mhd') > -1){
			video.attr('src', file_m);
		}
		else{
			video.attr('src', file_hd);
		}
	    var video = $('#vd_google_html5_api').get(0);
	    video.load();
	    video.play();
	}
}
function get_phim(link,set_first){
	if(check_get == true){
		check_get = false;
		$.get('http://upvhg.web44.net/phimhd.php?url='+link+'').done(function(a){
			if(a.indexOf('file') > -1){
				data = $($(a)[0]).text();
				data = eval('('+data+')');
				if(data.Video.file != undefined){
					var file = data.Video.file;
					if(/youtube/gi.test(file) == true){
						youtube(file,set_first);
					}
				}
				if(data.Video.sources){
					var sources = data.Video.sources;
					var sources_1 = sources[0];
					var file_1 = sources_1.file;
					var label_1 = sources_1.label;
					var type_1 = sources_1.type;
					file_m = file_1;
					type_m = type_1
					label_m = label_1;
					if(typeof(data.Video.sources[1]) != 'undefined'){
						var sources_2 = sources[1];
						var file_2 = sources_2.file;
						var label_2 = sources_2.label;
						var type_2 = sources_2.type;
						file_hd = file_2;
						type_hd = type_2
						label_hd = label_2;
					}
					else{
						var file_2 = false;
						var label_2 = false;
						var type_2 = false;
						file_hd = false;
						type_hd = false;
						label_hd = false;
					}
					if(/.jpg|.gif|.png|.bmp/gi.test(file_1) == true){
						var image = true;
					}
					else{
						var image = false;
					}
					google(file_1,file_2,type_1,type_2,image,set_first);
				}
			}
			else{
				$('#view_video').html('<div class="warning"><i class="fa fa-warning"></i>  Đã xảy ra lỗi, xin vui lòng thông báo với chúng tôi để sửa lỗi. Cảm ơn.</div>')
			}
		});
	}
}
