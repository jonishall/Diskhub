const jatkanappi=document.getElementById("jatka");
jatkanappi.addEventListener("click",aloita);
const rata1=document.getElementById("rata1");
const rata2=document.getElementById("rata2");
const rata3=document.getElementById("rata3");
var par=0;
var reika=0;
var heitot=[];
var parit=[];
var vaihtuvahtml="";
var graafi="";
var pelaaja1tulos="Henrin tulos:";
var pelaaja2tulos="Jonin tulos:";
var pelaaja3tulos="Tarmon tulos:";
var apu="";
var reiat=0;
var rata=0;

fetch('https://b351-80-222-48-217.eu.ngrok.io/api/courses')
  .then(response => response.json())
  .then(data => {
    // do something with the data, e.g. display it on the page
    console.log(data);
  })
  .catch(error => {
    // handle the error
    console.error(error);
  });



var map = new ol.Map({
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

var osmSource = new ol.source.OSM();
var osmLayer = new ol.layer.Tile({
  source: osmSource
});
map.addLayer(osmLayer);
// Create a point geometry with the given coordinates
var point = new ol.geom.Point(ol.proj.fromLonLat([0, 0]));

// Create a new feature with the point geometry
var feature = new ol.Feature({
  geometry: point
});

// Create a vector layer and add the feature to it
var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [feature]
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: 'https://openlayers.org/en/latest/examples/data/icon.png'
    })
  })
});
map.addLayer(vectorLayer);

// Create a select interaction with a custom style function
var selectInteraction = new ol.interaction.Select({
  style: function(feature) {
    return new ol.style.Style({
      image: new ol.style.Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        scale: 1.2,
        color: feature === selectInteraction.getFeatures().getArray()[0] ? 'red' : 'white'
      })
    });
  }
});
map.addInteraction(selectInteraction);

// Set a "rata" variable to 1 when the selected feature changes
selectInteraction.on('select', function(event) {
  var selectedFeature = event.selected[0];
  if (selectedFeature) {
    console.log(1)
    rata = 1;
  } else {
    console.log(0)
    rata = 0;
  }
});

function aloita(){

  if(rata==0){

  }

  else if(rata==1){
    // tässä kaivettais rata1 tiedot esiin databasesta, nyt placeholderit
    document.getElementById("map").style.display='none'
    par=36;
    parit=[5, 3, 4, 5, 3, 4, 5, 3, 4]
    reiat=9;
      vaihtuvahtml=""
      reika++
      vaihtuvahtml = 'Reika '+ reika+ ', par: '+ parit[reika-1]+ '<div style="width: 100%; overflow: hidden;"><div style="width: 200px; float: left;"> <form>  <label for "pelaaja1">'+pelaaja1tulos+'</label><br><input id="pelaaja1"><br><label for "pelaaja2">'+pelaaja2tulos+'</label><br><input id="pelaaja2"><br><label for "pelaaja3">'+pelaaja3tulos+'</label><br><input id="pelaaja3"><br></form>  </div>'
      apu='<div style="margin-left: 450px;"> <div class="viiva">';
      for(i=1; i<reiat+1; i++){
          apu += '&#8212;' + i;
          if(i == reika){
              apu += '&#8592;';
          }
          apu += '<br>';
      }
      apu+='</div> </div></div></div>';
      vaihtuvahtml+=apu;

      sisalto.innerHTML=vaihtuvahtml;
      jatkanappi.removeEventListener("click", aloita);
      jatkanappi.addEventListener("click", jatka);
      }


}
function jatka() {
  if(reika==9){
    sisalto.innerHTML= pelaaja1tulos + '<br>'+pelaaja2tulos+'<br>'+pelaaja3tulos;
    jatkanappi.removeEventListener("click", jatka);
    jatkanappi.addEventListener("click",alusta);
  }
  else{
  reika++;
  pelaaja1tulos="Henrin tulos:";
  pelaaja2tulos="Jonin tulos:";
  pelaaja3tulos="Tarmon tulos:";
  var pelaaja1Input = document.getElementById("pelaaja1").value;
  var pelaaja2Input = document.getElementById("pelaaja2").value;
  var pelaaja3Input = document.getElementById("pelaaja3").value;
  vaihtuvahtml="";
  var apu1=0;
  var apu2=0;
  var apu3=0;
  heitot.push([parseInt(pelaaja1Input), parseInt(pelaaja2Input), parseInt(pelaaja3Input)]);

  for(j=0;j<heitot.length; j++){
    apu1=apu1+heitot[j][0]-parit[j]
    apu2=apu2+heitot[j][1]-parit[j]
    apu3=apu3+heitot[j][2]-parit[j]
  }
  pelaaja1tulos+=" "+apu1;
  pelaaja2tulos+=" "+apu2;
  pelaaja3tulos+=" "+apu3;


      vaihtuvahtml = 'Reika '+ reika+ ', par: '+ parit[reika-1]+ '<div style="width: 100%; overflow: hidden;"><div style="width: 200px; float: left;"> <form>  <label for "pelaaja1">'+pelaaja1tulos+'</label><br><input id="pelaaja1"><br><label for "pelaaja2">'+pelaaja2tulos+'</label><br><input id="pelaaja2"><br><label for "pelaaja3">'+pelaaja3tulos+'</label><br><input id="pelaaja3"><br></form>  </div>'
      apu='<div style="margin-left: 450px;"> <div class="viiva">';
      for(i=1; i<reiat+1; i++){
          apu += '&#8212;' + i;
          if(i == reika){
              apu += '&#8592;';
          }
          apu += '<br>';
      }
      apu+='</div> </div></div></div>';
      vaihtuvahtml+=apu;
      sisalto.innerHTML = vaihtuvahtml;
 }
  }
  function alusta() {
    document.getElementById("map").style.display = 'block';
  par=0;
  reika=0;
  heitot=[];
  parit=[];
  vaihtuvahtml="";
  graafi="";
  pelaaja1tulos="Henrin tulos:";
  pelaaja2tulos="Jonin tulos:";
  pelaaja3tulos="Tarmon tulos:";
  apu="";
  reiat=0;
  rata=0;

  map.getView().setCenter([0, 0]);
  map.getView().setZoom(2);

  selectInteraction.getFeatures().clear();

  sisalto.innerHTML="Aloita peli valitsemalla rata.";

  jatkanappi.removeEventListener("click", alusta);
  jatkanappi.addEventListener("click", aloita);
}
