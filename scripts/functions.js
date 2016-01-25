// Metoda tworząca inputy na wejście - zależnie od ilości wybranej przez użytkownika
function createInputs()
{
	var inputNo = $('#inputNo').val();
	if(inputNo <= 0)
	{
		$('#inputs').html("<span style='color:red;'>Wybierz liczbę większą od 0</span>");
		return;
	}
	
	var inputs = '';
	for(var i=1; i <= inputNo; i++)
		inputs += '<input type="text" class="form-control" id="input' + i.toString() + '" style="margin:8px;" placeholder="Sekwencja ' + i.toString() + '" />';	
		
	$('#inputs').html(inputs.toString());
}