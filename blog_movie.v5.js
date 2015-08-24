function youtube(link,set_first){
  if(/youtube/gi.test(link) == true){
    var link = link.match(/(?:v=|v\/|embed\/|youtu.be\/)(.{11})/)[1];
    var link = 'https://www.youtube.com/embed/'+link+''; 
  }
  var video = '<iframe width="100%" height="360" src="'+link+'" frameborder="0" allowfullscreen></iframe>';
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
    var image = $('.spoiler_content img:first').attr('src');
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
  if(set_first == false){var player2 = document.getElementById('vd_google');player2.play();}if(set_first == true){set_first = false;}
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
function get_phim(link,set_first,host){
  if(check_get == true){
    check_get = false;
    $.get(''+host+'/phimhd.php?url='+link+'').done(function(a){
      if(/file|playlist/gi.test(a) == true){
        data = $($(a)[0]).text();
        data = eval('('+data+')');
        if(data.Video.file != undefined){
          var file = data.Video.file;
          if(/youtube|dailymotion/gi.test(file) == true){
            youtube(file,set_first);
          }
        }
        else if(data.Video.playlist != undefined){
          var file = data.Video.playlist;
          if(/youtube|dailymotion/gi.test(file) == true){
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
          if(/\.jpg|\.gif|\.png|\.bmp/gi.test(file_1) == true){
            var image = true;
          }
          else{
            var image = false;
          }
          google(file_1,file_2,type_1,type_2,image,set_first);
        }
      }
      else{
        $('#view_video').html('<div class="warning warning alert alert-danger"><i class="fa fa-warning"></i>  Đã xảy ra lỗi, xin vui lòng thông báo với chúng tôi để sửa lỗi. Cảm ơn.</div>')
      }
    });
  }
}
function load_video(){
  $('#view_video').html('<div class="video_load mejs-container"><diiv class="load_img"><img src="http://mediaelementjs.com/js/mejs-2.18.1/loading.gif"><span>Đang Tải Phim</span></div></div>');
}
function zoom_in(){
	var width = $('.container').width();
	var height = $('.media_body').height() + 75;
	$('.media_body').animate({width: ''+width+'px'});
	$('.box_box_right').animate({'margin-top': ''+height+'px'});
}
function zoom_out(){
	var width = $('.media_block').width();
	$('.media_body').animate({width: ''+width+'px'});
	$('.box_box_right').animate({'margin-top': '0px'});
}
undefined
function zoom_in(){
	var width = $('.container').width();
	var height = $('.media_body').height() + 75;
	$('.media_body').animate({width: ''+width+'px'});
	$('.box_box_right').animate({'margin-top': ''+height+'px'});
}
function zoom_out(){
	var width = $('.media_block').width();
	$('.media_body').animate({width: ''+width+'px'});
	$('.box_box_right').animate({'margin-top': '20px'});
}
