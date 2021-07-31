function es_submit_pages(url)
{
	ques_set = document.getElementById("ques_set").value;
	test_id  = document.getElementById("test_id").value;

	console.log( 'ques-set : ' + ques_set );

	//alert(url);
	document.getElementById("es_txt_button_pg").style.display = "none";
	document.getElementById("es_msg_pg").innerHTML = "Please Wait...";

    var mynumber = Math.random();
	var str= "test_id=" + test_id + "&ques_set=" + ques_set + "&action=" + encodeURI(mynumber);
	//alert(url+'/?quiz=start_quiz2');
	es_submit_requests(url+'/?quiz=start_quiz2', str);
}

function es_submit_pages2(url,question_per_screen,ques_set_calc)
{
	var question_per_screen;
	var ques_set_calc;

	var ques_set  = document.getElementById("ques_set").value;
	var test_id  = document.getElementById("test_id").value;

	total_ques_set =  Math.ceil(45/question_per_screen);

	if(ques_set_calc == 0){
		n = 1; y = n+(question_per_screen-1);
	} else {
		if(ques_set_calc <= total_ques_set){
			n = (parseInt(ques_set_calc)*parseInt(question_per_screen))+1;
			y = n+(question_per_screen-1);
			if(y > 45){ y = 45; }
		}
	}

    var mynumber = Math.random();
	var str= "test_id=" + test_id + "&ques_set=" + ques_set + "&action=" + encodeURI(mynumber);

	for(n; n<=y; n++){
		var val = "";
		// get list of radio buttons with specified name
		var radio_name = "ag_q_"+n;
		var q_text = "ag_q_text_"+n;

		var ques_text = document.getElementById(q_text).value;
		var radios = document.getElementsByName(radio_name);

		// loop through list of radio buttons
		for (var i=0, len=radios.length; i<len; i++) {
			if ( radios[i].checked ) { // radio checked?
				val = radios[i].value; // if so, hold its value in val
				break; // and break out of for loop
			}
		}

		if(val == "" )
		{
			alert("Please select answer for question #"+n+".");
			return false;
		}

		str = str + "&ques_text_"+n+"=" + ques_text + "&ques_score_"+n+"=" + val;
	}

	document.getElementById("es_msg_pg").innerHTML = "Please Wait...";
	document.getElementById("es_txt_button_pg").style.display = "none";

	//alert(url+'/?quiz=start_quiz2');
	es_submit_requests(url+'/?quiz=start_quiz2', str);
}

var http_req = false;
function es_submit_requests(url, parameters)
{
	http_req = false;
	if (window.XMLHttpRequest)
	{
		http_req = new XMLHttpRequest();
		if (http_req.overrideMimeType)
		{
			http_req.overrideMimeType('text/html');
		}
	}
	else if (window.ActiveXObject)
	{
		try
		{
			http_req = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				http_req = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{

			}
		}
	}
	if (!http_req)
	{
		alert('Cannot create XMLHTTP instance');
		return false;
	}
	http_req.onreadystatechange = eemail_submitresults;
	http_req.open('POST', url, true);
	http_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http_req.setRequestHeader("Content-length", parameters.length);
	http_req.setRequestHeader("Connection", "close");
	http_req.send(parameters);
}

function eemail_submitresults()
{
	//alert(http_req.readyState);
	//alert(http_req.responseText);
	if (http_req.readyState == 4)
	{
		if (http_req.status == 200)
		{
		 	if (http_req.readyState==4 || http_req.readyState=="complete")
			{
				//alert((http_req.responseText).trim());

				var responseText = (http_req.responseText).trim();
				var responseArray = responseText.split("#||#");

				document.getElementById("es_main-div").innerHTML = responseArray[1];

			}
		}
		else
		{
			alert('There was a problem with the request.');
		}
	}
}
