( function () {
  
  var DEBUG = true;

  // the dreaded lookup table
  var services = {
      'BBC Radio 1'       : 'bbcr1'
    , 'BBC Radio 2'       : 'bbcr2'
    , 'BBC Radio 3'       : 'bbcr3'
    , 'BBC Radio 4'       : 'bbcr4'
    , 'BBC Radio 5 live'  : 'bbcr5l'
    , 'BBC Radio 5 live sports extra' : 'r5lsx'
    , 'BBC 6 Music'       : 'bbc6m'
    , 'BBC Radio 7'       : 'bbc7'
    , 'BBC 1Xtra'         : 'bbc1x'
    , 'BBC Asian Network' : 'bbcan'
    , 'BBC One'           : 'bbcone'
    , 'BBC Two'           : 'bbctwo'
    , 'CBeebies'          : 'cbeebies'
    , 'CBBC'              : 'cbbc'
    , 'BBC Three'         : 'bbcthree'
    , 'BBC Four'          : 'bbcfour'
    , 'BBC News Channel'  : 'bbcnews24'
    , 'BBC Parliament'    : 'bbcparl'
  };

  var legacy = {
      broadcast : '#broadcasts li:first'
    , date      : 'div.date span'
    , time      : 'div.time span'
    , channel   : 'div.location a'
  };

  var newer = {
      broadcast : '#programme-broadcasts li:first'
    , date      : '.date'
    , time      : '.time'
    , channel   : '.service a'
  };

  // Which selectors to use
  var selectors = newer;

  // fetch the first broadcast
  var broadcast = $(selectors.broadcast);

  // go no further if there's no broadcast
  if (!broadcast || broadcast.length === 0) { return; }

  if (DEBUG) { console.log('Found broadcast', broadcast, broadcast.length); }

  // fetch out the date and convert to the format (Thu Aug 26 2010)
  var dstring = broadcast.find(selectors.date)
                         .text()
                         .replace(/(\w{3}) (\d{1,2}) (\w{3}) (\d{4})/,'$1 $3 $2 $4');

  if (DEBUG) { console.log('Date:', dstring); }

  var hhmm = broadcast.find(selectors.time).text().split(':');
  var thedate = Date.parse(dstring);
  thedate.addHours(hhmm[0]);
  thedate.addMinutes(hhmm[1]);
  thedate.addMinutes(thedate.getTimezoneOffset());

  var channel = services[broadcast.find(selectors.channel).text().split(' (')[0]];
  var url     = 'http://g.bbcredux.com/programme/'+channel+'/'+thedate.toString('yyyy-MM-d/HH-mm-00');
  console.log(url);

  // create the output
  var output = 
      '<div id="more-details" class="box">' + 
        '<h2>BBC Redux</h2>' +
        '<div id="duration" class="box first">' + 
          '<div class="content clearfix">' + 
            '<div><a href="'+url+'">Switch to BBC Redux page</a></div>' + 
          '</div>' + 
        '</div>' + 
     '</div>'; 

  // prepend the output to the screen
  $('div.col-b').prepend(output);

})();
