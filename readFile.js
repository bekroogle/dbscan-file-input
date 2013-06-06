

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
			
			for (var i = 0; i < lines.length; i++) {
				for (var j = 0; j < lines[i].length; j++) {
					if (lines[i][j] == '1') {
						points.push(new Point(i,j)); 
					}
				}
			}
			console.log(points);
			DBScan(points, eps, minPts);
		}
		r.readAsText(f);
	} else {
		alert("Failed to open file.");
	}
}
document.getElementById('begin').addEventListener('change', readOneFile, false);