// funkcja tworząca inputy na wejście - zależnie od ilości wybranej przez użytkownika
function createInputs()
{
	var inputNo = $('#inputNo').val();
	if(inputNo < 2)
	{
		$('#inputs').html("<span style='color:red;'>Wybierz liczbę większą od 1</span>");
		return;
	}
	
	var inputs = '';
	for(var i=1; i <= inputNo; i++)
		inputs += '<input type="text" class="form-control" id="input' + i.toString() + '" style="margin:8px;" placeholder="Sekwencja ' + i.toString() + '" />';	
		
	$('#inputs').html(inputs.toString());
}

// funkcja generująca przykładowe sekwencje
function generateDefaultData()
{
	$('#inputNo').val(4);
	createInputs();
	$('#input1').val('CGTCTCCTGACCCCAGAGCAGGTCGTGG');
	$('#input2').val('TCCAGCGCCTGCTTCCCGTGCTGTGCCAAC');
	$('#input3').val('CGGCGGAAAACAGGCTTTGGAAACGGTG');
	$('#input4').val('GATTGCTGCCGGTGCTGTGCCAAGCGCAC');

}


function nextStep(step)
{
	switch(step)
	{
		case 1: visible('sequenceMatrix', true); break;
		case 2: visible('createTree', true); break;
		case 3: visible('createProfiles', true); break;

	}
}

function visible(id, isVisible)
{
	if(isVisible == true)
		$('#' + id).css('visibility', 'visible');
	else
		$('#' + id).css('visibility', 'hidden');
}

function clearContent()
{
	visible('sequenceMatrix', false);
	visible('createTree', false);
	visible('createProfiles', false);
}