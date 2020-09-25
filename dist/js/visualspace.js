



var map2 = L.map('simpleShapes', {

    crs: L.CRS.Simple
});
 

map2.setMaxBounds(new L.LatLngBounds([0, 4881], [1712, 0]));
var xxx = screen.width;
 
var imageUrl = 'dist/img/istinye.png'
var imageBounds = [[0, 0], [600, xxx]];
var image = L.imageOverlay(imageUrl, imageBounds).addTo(map2);
map2.fitBounds(imageBounds);
 
let styleEditor = L.control.styleEditor();
 
//StyleEditor.enable()
map2.addControl(styleEditor);
 



 



//hide show controls
map2.pm.addControls({
    drawMarker: true,
    drawPolygon: true,
    editPolygon: true,
    drawPolyline: false,
    drawCircle: false,
    cutPolygon: false,
    deleteLayer: true,
});

var deneme = {};
var tooltip = {};
var updateName=false;
//L.control.
//L.Control.StyleEditor = L.Control.extend().enable()

// creating layers
map2.on('pm:create', function (e) {
    var layer = e.layer;
    snappable: true; 
    tooltip = L.tooltip({permanent: true, className: 'tooltipClass', interactive: true,direction: 'bottom',sticky: true})
    tooltip.setContent('Alan adı')
    layer.bindTooltip(tooltip);
    layer.openTooltip();
    var el = tooltip.getElement();
    el.addEventListener('click', function() {
        if(updateName){
        $('#exampleModal').modal('show')
         
        
        }
        });

    e.layer.on('pm:update', function (e) {
console.log()

/* if(tooltip){
    
 
var el =e.target._tooltip

}
 */



    });

    deneme = layer
    return layer



});
/* map2.on('pm:edited', function (e) {
    var layer = e.layer;
  console.log("dd")



}); */


map2.on('pm:globaleditmodetoggled', function (e) {
    
        $( ".leaflet-control-styleeditor" ).trigger( "click" );
     
         /*    $(".leaflet-styleeditor-header").append('<form><div  class="form-group"><label for="message-text" class="col-form-label">İsim:</label><textarea class="form-control" id="message-text"></textarea></div></form><button type="button" class="btn btn-secondary" data-dismiss="modal">Vazgeç</button><button type="button" class="btn btn-primary" onclick="myfunction()">Kaydet</button>');
    */    
      
    toggleName();
    map2.eachLayer(function (layer) {
        
        layer.toggleTooltip();
        layer.toggleTooltip();

        //layer.openTooltip();
    })
});

function toggleName(){
    updateName=!updateName;
    console.log(updateName)

}

function myfunction(layer) {




    //Get
    denemeyazi = $('#message-text').val();
    //console.log(deneme)
    deneme._tooltip.setContent(denemeyazi)
    $('#exampleModal').modal('hide')
    //console.log(deneme)
    // pm:create().layer._tooltip.setContent('ss');
    // return deneme
    //Set
    //$('#message-text').val(deneme);
    // The function returns the product of p1 and p2
    
}


// let layerObjectArray is geojson

var geoJsonLayer = L.geoJson(layerObjectArray).addTo(map2);




//var willdelete = {};

//keep layers 
var willdelete = L.layerGroup();
function exportjson() {

    map2.eachLayer(function (layer) {
        //  willdelete.addLayer(layer);

        // the corner points of polygons are recognized a marker but without icon , we can get markers with check icon 

        if (typeof layer.options.__proto__.icon !== "undefined") {
            var markerFeature = true;
        }


        // check it is a marker or colored polygon
        if (layer.options.fillColor || markerFeature) {

            // if it is a marker
            if (markerFeature) {

                //get coord of marker
                var coordArray = layer.getLatLng();
                const lat = coordArray.lat;
                const lng = coordArray.lng;
                var coord = [lat, lng]
                var coordLast = coord;

                //get coord of icon
                var anchor = layer.options.icon.options.iconAnchor;

                //get png of icon 
                var layerView = layer.options.icon.options.iconUrl;
            }
            // if it is a polygon
            else {

                //get coord of layer
                var coordArray = layer._latlngs[0];
                var coordLast = [];
                for (let index = 0; index < coordArray.length; index++) {
                    const lat = coordArray[index].lat;
                    const lng = coordArray[index].lng;
                    var coord = [lat, lng]
                    coordLast.push(coord);
                }
                //get color of polygon
                var layerView = layer.options.fillColor;
                var layerOpacity = layer.options.fillOpacity;
                


            }
            var name = layer._tooltip._content;

            // create a featureLayer method
            function featureLayer(ltlng, layerColor,layerOpacity, anchor, name) {
                this.layerColor = layerColor;
                this.layerOpacity = layerOpacity;
                this.ltlng = ltlng;
                this.anchor = anchor;
                this.name = name;

            }

            // Create featureLayer objects
            var layerobject = new featureLayer(coordLast, layerView,layerOpacity, anchor, name);

            // add objects an array 
            layerObjectArray.push(layerobject);

        }
    })
    console.log(willdelete)

}
//bring layers that we keep
function importjson() {
    map2.eachLayer(function (layer) {
        if (typeof layer.options.__proto__.icon !== "undefined") {
            var markerFeature = true;
        }
        if (layer.options.fillColor || markerFeature) {
            map2.removeLayer(layer)
        }
    })

    //get all array elemets that we created already 

    for (let i = 0; i < layerObjectArray.length; i++) {
        const layerColor = layerObjectArray[i].layerColor;
        const layerOpacity = layerObjectArray[i].layerOpacity;
        const ltlng = layerObjectArray[i].ltlng;
        const anchor = layerObjectArray[i].anchor;
        const name = layerObjectArray[i].name;

        //check it is a leaflet icon 

        if (layerColor.charAt(0) === "h") {
            var iconMarker = L.icon({
                iconUrl: layerColor,
                iconAnchor: anchor
            });
            // create marker and add icon
            var layerMarker = L.marker(ltlng, { icon: iconMarker });
            layerMarker.bindTooltip(name, { permanent: true, className: 'tooltipClass', interactive: true,direction: 'bottom', target: layerMarker });
            //add created markers in a new array with named layerObjectArray2
            layerObjectArray2.push(layerMarker);
        }
        //check it is a leaflet polygon
        else {
            // create polygon with color
            var layerPolygon = L.polygon(ltlng, { color: layerColor,fillOpacity:layerOpacity });
            // var tooltip = L.tooltip({   target: layerPolygon, map:map2, html: "I'm a tooltip!"});
            layerPolygon.bindTooltip(name, { permanent: true, className: 'tooltipClass', interactive: true,direction: 'bottom', target: layerPolygon });


            //add created polygons in array with named layerObjectArray2
            layerObjectArray2.push(layerPolygon);
            // layerObjectArray2.push(tooltip);
        }

    }
    //let layerObjectArray2 array is a layerGroup of leaflet library
    this.layerGroupArray = L.layerGroup(layerObjectArray2);
    //add layergroup to map
    this.layerGroupArray.addTo(map2);
    //clear arrays
    layerObjectArray.splice(0, layerObjectArray.length);
    layerObjectArray2.splice(0, layerObjectArray2.length);


}

function showName(){

    var checkBoxName = document.getElementById("names");

    if (checkBoxName.checked == true) {
       $(".tooltipClass").hide();
    }
    else{
        $(".tooltipClass").show();
    }
}