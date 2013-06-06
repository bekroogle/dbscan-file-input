function readOneFile(e) {
	eps = parseInt(document.getElementById('eps').value);
	minPts = parseInt(document.getElementById('minPts').value);
	points = [];
	var f = e.target.files[0];
	if (f) {
		
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result;				
			var lines = contents.split("\n");
			
			// Stop execution if file is not a proper file. 
			if (!(lines[0][0] == "P" && lines[0][1] == "1")) {
				alert("Can't find \"magic number\" in .pbm file.");
				return;
			}
			lines.remove(0);
						
			for (var i = 0; i < lines.length; i++) {
				if (lines[i][0] == '#') {
					lines.remove(i);
				}
				console.log(lines[i]);
			}
			
			var matchArray = lines[0].match(/^(\d+) (\d+)/)
			if (matchArray.length != 3) {
				alert("Improper size declaration in .pbm file.");
				return;
			}
			
			var imageWidth = parseInt(matchArray[1]);
			var imageHeight = parseInt(matchArray[2]);
			
			lines.remove(0);

			for (var i = 0; i < imageHeight; i++) {
				lines[i] = lines[i].replace(/\s+/g, '');
				for (var j = 0; j < imageWidth; j++) {
					if (lines[i][j] == '1') {
						points.push(new Point(j,i));
					}
				}
			}
			
			DBScan(points, imageWidth, imageHeight, eps, minPts);
		}
		r.readAsText(f);
	} else {
		alert("Failed to open file.");
	}
}
document.getElementById('begin').addEventListener('change', readOneFile, false);


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
