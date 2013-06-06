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
				alert("Improper ASCII-encoded .pbm file.");
				return;
			}
			
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


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
