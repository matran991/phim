var check_get = true;
var set_first = true;
var auto_play = false;
if($(window).width() < 860){
  var height = "240";
}
else{
  var height = "360";
}
function youtube(link,set_first){
  if(/youtube/gi.test(link) == true){
    var link = link.match(/(?:v=|v\/|embed\/|youtu.be\/)(.{11})/)[1];
    var link = 'https://www.youtube.com/embed/'+link+''; 
  }
  var video = '<iframe width="100%" height="'+height+'" src="'+link+'" frameborder="0" allowfullscreen></iframe>';
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
       if(label_m.lenght > 1 && label_hd > 1){
         if(/720|1080|1280/.test(label_hd) == true){
           label_hd = ''+ label_hd+'<small>HD</small>';
         }
       }
       else{
         label_m = "Bản Thường";
         label_hd = "Bản HD";
       }            
       var quality = '<div class="change_hd"><div class="change_content"><span onclick="changer_quality.call(this)" data="mhd" class="m_hd box_change active">'+label_m+'</span><span onclick="changer_quality.call(this)" data="hd" class="full_hd box_change">'+label_hd+'</span></div></div>';
       $('.video_quality').html(quality);
    }
  }
   if($(window).width() < 860){
     $('#view_video').html('<div  id="vd_google" class="markai_vd"><video src="'+file+'" poster="'+image+'" width="100%" height="240px" controls="controls"></video></div>');
     $('#vd_google video')[0].play();
   }
   else{
     $('#view_video').html('<div  id="vd_google" class="markai_vd"></div>'); 
     flowplayer("#vd_google", {
        volume: 1.0,
        poster: image,
        autoplay: auto_play,
        clip: {
          sources: [
            { type: type,
              src:  file }
          ]
       }
     });
   }
   auto_play = true;
   $("#vd_google video").bind("ended", function() {
     $('#episode .active').next('a').trigger('click');
   });
   set_config();
}
function phimhd(){
    load_video();
    $('#episode .active').removeClass('active');
    $(this).addClass('active');
    var link = $(this).attr('href');
    check_get = true;
    get_phim(link,set_first,hosting);
}
function changer_quality(){
  var active = $(this).attr('class');
  if(active.indexOf('active') > -1){
  }
  else{
    $('.box_change.active').removeClass('active');
    $(this).addClass('active');
    var type = $(this).attr('data');
    var video = $('#vd_google video');
    if(type.indexOf('mhd') > -1){
      video.attr('src', file_m);
    }
    else{
      video.attr('src', file_hd);
    }
    $('#vd_google video').get(0).play();
  }
}
function get_phim(link, set_first, host) {
  if (check_get == true) {
    check_get = false;
    hosting = host;
    $.getScript('' + host + '/phimhd.php?url=' + link + '').done(function() {
      if (video_html5 && video_html5 != "No link video") {
        var data = video_html5;
        if (data.file != undefined) {
          var file = data.file;
          if (/youtube|dailymotion/gi.test(file) == true) {
            youtube(file, set_first);
          }
        } 
        else if (data.playlist != undefined) {
          var file = data.playlist;
          if (/youtube|dailymotion/gi.test(file) == true) {
            youtube(file, set_first);
          }
        }
        if (data.sources) {
          var sources = data.sources;
          var sources_1 = sources[0];
          var file_1 = sources_1.file;
          var label_1 = sources_1.label;
          var type_1 = sources_1.type;
          file_m = file_1;
          type_m = type_1
          label_m = label_1;
          if (typeof(data.sources[1]) != 'undefined') {
            var sources_2 = sources[1];
            var file_2 = sources_2.file;
            var label_2 = sources_2.label;
            var type_2 = sources_2.type;
            file_hd = file_2;
            type_hd = type_2
            label_hd = label_2;
          } 
          else {
            var file_2 = false;
            var label_2 = false;
            var type_2 = false;
            file_hd = false;
            type_hd = false;
            label_hd = false;
          }
          if (/\.jpg|\.gif|\.png|\.bmp/gi.test(file_1) == true) {
            var image = true;
          } else {
            var image = false;
          }
          google(file_1, file_2, type_1, type_2, image, set_first);
        }
      } 
      else {
        $('#view_video').html('<div class="warning warning alert alert-danger"><i class="fa fa-warning"></i>  Đã xảy ra lỗi, xin vui lòng thông báo với chúng tôi để sửa lỗi. Cảm ơn.</div>')
      }
    });
  }
}
function load_video(){
  $('#view_video').html('<div class="video_load mejs-container"><diiv class="load_img"><img src="http://mediaelementjs.com/js/mejs-2.18.1/loading.gif"><span>Đang Tải Phim</span></div></div>');
}
function zoom_in(){
  $('.blog_view_topic,.box_box_right').removeClass('col-md-9').removeClass('col-md-3').addClass('col-md-12');
}
function zoom_out(){
  $('.blog_view_topic').removeClass('col-md-12').addClass('col-md-9');$('.box_box_right').removeClass('col-md-12').addClass('col-md-3');
}
function set_config(){
  $('.change_hd').each(function(){
     $('a.fp-brand').replaceWith('<div class="fp_config_fix"><span class="btt_config_video" onclick="config_open.call(this)"><i class="fa fa-cogs fa-2"></i></span><ul class="list_config hide"><li><span onclick="changer_quality.call(this)" data="mhd" class="m_hd box_change active">'+label_m+'</span></li><li><span onclick="changer_quality.call(this)" data="hd" class="full_hd box_change">'+label_hd+'</span></li></ul></div>');
  });
}
function config_open(){
  var a = $(this).closest('.fp_config_fix').find('.list_config');
  var b = a.attr('class');
  if(b.indexOf('hide') > -1){
    var c = 'show';
    a.removeClass('hide');
  }
  else{
    var c = 'hide';
    a.removeClass('show');
  }
  a.addClass(c);
}
$('.light_off').toggle(function(){
  $(this).addClass('active');
  $('body').addClass('off_video');
  },function(){
  $(this).removeClass('active');
  $('body').removeClass('off_video');
});
$(function() {
    $('.mobile_video.phimhd').each(function() {
      var box_episode = $(this).find('td').html();
      var box_episode = '<div>' + box_episode + '</div>';
      var box_episode = $(box_episode);
      box_episode.find('strong').wrap('<span class="server"></span>');
      box_episode.find('a').attr('onclick', 'event.preventDefault();phimhd.call(this)');
      var video_first = box_episode.find('a:first').addClass('active').attr('href');
      $('#episode').html(box_episode);
      $('.mobile_video.phimhd').remove();
      $('#player_video').fadeIn(500);
      get_phim(video_first, set_first, host);
    });
    $('.spoiler_content div[align="justify"]').each(function() {
      var a = $(this).html();
      var a = a.replace(/\[color.+\"\]/gi, '');
      $(this).html(a)
    });
  });
