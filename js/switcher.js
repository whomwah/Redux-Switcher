// the dreaded lookup table

var services = {
  'BBC Radio 1' : 'bbcr1',
  'BBC Radio 2' : 'bbcr2',
  'BBC Radio 3' : 'bbcr3',
  'BBC Radio 4' : 'bbcr4',
  'BBC Radio 5 live' : 'bbcr5l',
  'BBC Radio 5 live sports extra' : 'r5lsx',
  'BBC 6 Music' : 'bbc6m',
  'BBC Radio 7' : 'bbc7',
  'BBC 1Xtra' : 'bbc1x',
  'BBC Asian Network' : 'bbcan',
  'BBC One' : 'bbcone',
  'BBC Two' : 'bbctwo',
  'CBeebies' : 'cbeebies',
  'CBBC' : 'cbbc',
  'BBC Three' : 'bbcthree',
  'BBC Four' : 'bbcfour',
  'BBC News Channel' : 'bbcnews24',
  'BBC Parliament' : 'bbcparl'
}

// fetch the first broadcast
var broadcast = $('#broadcasts li:first');

// go no further if there's no broadcast
if (!broadcast) return;

// fetch out the data
var dstring = broadcast.find('div.date span').text();
var hhmm = broadcast.find('div.time span').text().split(':');
var thedate = Date.parse(dstring);
console.log(thedate);
thedate.addHours(hhmm[0]);
thedate.addMinutes(hhmm[1]);
thedate.addMinutes(thedate.getTimezoneOffset());
var channel = services[broadcast.find('div.location a').text().split(' (')[0]];
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
