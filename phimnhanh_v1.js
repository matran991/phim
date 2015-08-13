function youtube(link,set_first){
	var video = '<video id="vd_youtube" src="" class="markai_vd video-js vjs-default-skin" controls preload="auto"  height="360" data-setup=\'\{ "techOrder": ["youtube"], "src": "'+link+'" \}\'>';
	if(set_first == true){
		$('.mobile_video.phimhd').before(video);
		videojs("vd_youtube");
	}
	else{
		var link = link.match(/(?:v=|v\/|embed\/|youtu.be\/)(.{11})/)[1];
		var link = 'https://www.youtube.com/embed/'+link+'?modestbranding=1&enablejsapi=1&iv_load_policy=3&playerapiid=vd_youtube_component_21&disablekb=1&wmode=transparent&controls=0&fs=1&playsinline=0&showinfo=0&rel=0&autoplay=1&loop=0&vq=auto&origin=http://viethoagame.forumvi.com';
		$('#vd_youtube_youtube_api').attr('src',link);
	}
}
function google(file_1,file_2,type_1,type_2,image,set_first){
	if(image == true){
		var image = file_1;
		var file = file_2;
		var type = type_2;
		var quality = "";
	}
	else{
		var image = $('.content.clearfix img:first').attr('src');
		var file = file_1;
		var type = type_1;
		var quality = '<div class="change_hd"><div class="change_content"><span onclick="changer_quality.call(this)" data="mhd" class="m_hd box_change active">Bản Thường</span><span onclick="changer_quality.call(this)" data="hd" class="full_hd box_change">Bản Đẹp</span></div></div>';
	}
	var video = '<video id="vd_google" class="markai_vd video-js vjs-default-skin"  controls preload="auto"  height="264" poster="'+image+'" data-setup=\'\{"example_option"\:true,"language":"vi"\}\'>';
  	video += '<source src="'+file+'" type="'+type+'" />';
  	video += '<p class="vjs-no-js">Để xem video này, hãy bật JavaScript, hoặc nâng cấp lên một trình duyệt web hỗ trợ HTML5 video</video>';
	if(set_first == true){
		$('.mobile_video.phimhd').before(video);
		$('.mobile_video.phimhd').before(quality);
		videojs("vd_google").ready(function(){
			var vid = this;
			vid.on("ended", function(){
				$('.mobile_video.phimhd .active').next('a').trigger('click');
			});
		});
	}
	else{
	    $('#vd_google_html5_api,#vd_google_html5_api source').attr('src', file);
	    var video = $('#vd_google_html5_api').get(0);
	    video.load();
	    video.play();
	}
}
function phimhd(){
	var active = $(this).attr('class');
	if(active){
	}
	else{
		set_first = false;
		$('.mobile_video.phimhd .active').removeClass('active');
		$(this).addClass('active');
		var link = $(this).attr('href');
		get_phim(link,set_first);
	}
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
				var sources_2 = sources[1];
				var file_2 = sources_2.file;
				var label_2 = sources_2.label;
				var type_2 = sources_2.type;
				file_m = file_1;
				type_m = type_1
				label_m = label_1;
				file_hd = file_2;
				type_hd = type_2
				label_hd = label_2;
				if(/.jpg|.gif|.png|.bmp/gi.test(file_1) == true){
					var image = true;
				}
				else{
					var image = false;
				}
				google(file_1,file_2,type_1,type_2,image,set_first);
			}
		}
	});
}
