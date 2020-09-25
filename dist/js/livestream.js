
var map2 = L.map('simpleShapes', {

    crs: L.CRS.Simple
});



var xxx = screen.width;

var imageUrl = 'dist/img/istinye.png'
var imageBounds = [[0, 0], [600, xxx]];
var image = L.imageOverlay(imageUrl, imageBounds).addTo(map2);
map2.fitBounds(imageBounds);




function importjson() {
    var checkBox = document.getElementById("areas");

    if (checkBox.checked == true) {
        for (let i = 0; i < default2.length; i++) {
            const clr = default2[i].clr;
            const ltlng = default2[i].ltlng;
            var xxpolygon = L.polygon(ltlng, { color: clr });
            layerObjectArray2.push(xxpolygon);
        }
        this.xlayerGroup = L.layerGroup(layerObjectArray2);
        this.xlayerGroup.addTo(map2);
    } else {
        default2.splice(0, default2.length);
        map2.removeLayer(this.xlayerGroup)
    }



}


