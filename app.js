const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(express.json());

app.post('/cifrar', function (req, res) {
  var response = transcript(req.body.mensaje, Math.ceil(req.body.mensaje.length / req.body.vueltas), req.body.vueltas)
  res.send(response);
});

app.post('/descifrar', function (req, res) {
  var response = transcript(req.body.mensaje, req.body.vueltas, Math.ceil(req.body.mensaje.length / req.body.vueltas))
  res.send(response);
});

function transcript (originalMessage, row, col){
	var substring = []
	var i= 0;
	while(i< row){
		var myRow = originalMessage.substr(0, col).split('')
		originalMessage = originalMessage.substring(col);
		while(myRow.length < col){
			myRow.push(' ');
		}
		substring.push(myRow);
		i++;		
	}

	var message = ''
	x = 0;
	while(x< col){
		substring.forEach(fila => {
			message = message.concat(fila[x]);
		});
		x++;		
	}
	return {"mensaje": message.trim()}
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})