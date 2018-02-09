$(document).ready(function() {

    $('button').click(function(){
      var usersearch = $('#search-word').val();
      dosearch(usersearch);
    });

    $('#search-word').bind("enterKey",function(e){
       var usersearch = $('#search-word').val();
       dosearch(usersearch);
    });
    $('#search-word').keyup(function(e){
        if(e.keyCode == 13)
        {
            $(this).trigger("enterKey");
        }
    });

    function dosearch(usersearch){

      var apiurl = 'https://itunes.apple.com/search?media=music&entity=musicTrack&sort=recent&limit=20&callback=?&term=';

      resetanddestroy();

      $.getJSON(apiurl + encodeURIComponent(usersearch), function(data){

          if (data.results.length === 0) {
                $('#music-container').append('<li>No matches for ' + usersearch + '. Try another search.</li>');
          } else {
            console.log(data.results);
               $.each(data.results, function(i, field){


                 search_artwork = field.artworkUrl100;//.replace('100x100','600x600');
                 search_preview_url = field.previewUrl;
                 search_artist = field.artistName;
                 search_artistViewUrl = field.artistViewUrl;
                 search_track_name = field.trackName;
                 search_album = field.collectionName;
                 search_buy_url = field.trackViewUrl;
                 search_track_price = field.trackPrice + " " + field.currency;
                 search_collection = field.collectionName;
                 search_collectionViewUrl = field.collectionViewUrl;
                 search_collection_price = field.collectionPrice + " " + field.currency;
                 search_primaryGenreName = field.primaryGenreName;
                 
                 

                 if (search_artwork) {
                  // buildtracks(i,search_artwork,search_artist,search_track_name,search_album,search_buy_url);
                   addTrack(i,search_artwork,search_track_name,search_track_price,search_artist,search_artistViewUrl,search_collection,search_collectionViewUrl,search_collection_price,search_primaryGenreName,search_preview_url)
                 }
               });
          }
      });
    };

    function resetanddestroy() {
      $('#music-container').html('');
    }

    function addTrack(i,search_artwork,search_track_name,search_track_price,search_artist,search_artistViewUrl,search_collection,search_collectionViewUrl,search_collection_price,search_primaryGenreName,search_preview_url) {
      trackinfo = '<div class="track-div-main" style="border: 1px solid black;width: 1000px;overflow:auto;display:table">'
      
      trackinfo += '<div class="track-div" ><table border="0">';
      trackinfo += '<tr><td border = none>'+ "Track:" +'</td><td>'+ search_track_name + '</td><td><a href="'+search_preview_url+'" target="_blank">preview</a></tr>';
      trackinfo += '<tr><td>'+ "Track Price:" +'</td><td>'+ search_track_price + '</td><td></td></tr>';
      trackinfo += '<tr><td>'+ "Artist:" +'</td><td><a href="'+search_artistViewUrl+'" target="_blank">'+ search_artist + '</a></td><td></td></tr>';
      trackinfo += '<tr><td>'+ "Collection:" +'</td><td><a href="'+search_collectionViewUrl+'" target="_blank">'+ search_collection + '</a></td><td></td></tr>';
      trackinfo += '<tr><td>'+ "Collection Price:" +'</td><td>'+ search_collection_price + '</td><td></td></tr>';
      trackinfo += '<tr><td>'+ "Primary Genre:" +'</td><td>'+ search_primaryGenreName + '</td><td></td></tr>';
      trackinfo += '</table></div>';
      
      
      trackinfo += '<div class="image-div" style="width: 200px;margin-left: 800px;display:table-cell;vertical-align: middle;text-align: center"><img src="' + search_artwork + ' " style= "vertical-align: middle"></div>';
      trackinfo += '</div>';
      alltracks = $('<li id="' + i + '" style="padding:0px;margin:0px">' + trackinfo + '</li><br />');
      
      $('#music-container').append(alltracks);
    }

    function buildtracks(i,search_artwork,search_artist,search_track_name,search_album,search_buy_url,playerinfo) {
      trackinfo = '<div class="music-img"><img src="' + search_artwork + '"></div>\n';
      trackinfo += '<div class="music-title"><span class="music-artist">' + search_artist + '</span><br />' + search_track_name + '<br />'  + search_album + '</div>\n';
      trackinfo += '<div class="music-meta" id="meta' + i + '">' + playerinfo + '<a href="' + search_buy_url + '" target="_buy">Buy Now</a></div>\n';

      alltracks = $('<li id="' + i + '">' + trackinfo + '</li>');
      
      $('#music-container').append(alltracks);
    }


});
