// cleanup crew - merge this code with the bull

// win bias, 1 is winning, -1 is fallen off
static var win_bias : float = 0;

// offset the win bias by an ammount over time
var bias_offset : float = 0.15;

// get location of player, tell if player
// is looking down on bull or not
var player_cam : GameObject;

// player can be within this threshold
// when trying to stay on the bull
static var threshold : float = 0.02;

var GUILoser : Texture2D;
var GUIWinner : Texture2D;

var is_displaying_loser : boolean = false;
var is_displaying_winner : boolean = false;

function ApproxEqual (to : float, val : float, epsilon : float) {
	
	var result : float = (to) - (val);
	
	if (Mathf.Abs(result) < epsilon) {
		return true;
	} else {
		return false;
	}
	
}

function OnGUI () {
	if (is_displaying_loser) {
		GUI.DrawTexture (Rect(Screen.width/2-(256/2),0, 256, 64),
			GUILoser);
	}
	
	if (is_displaying_winner) {
		GUI.DrawTexture (Rect(Screen.width/2-(256/2),0, 256, 64),
			GUIWinner);
	}
}

function LosingScenario () {
	// display loser image for a while
	is_displaying_loser = true;
	yield WaitForSeconds (3);
	is_displaying_loser = false;
	Application.LoadLevel(0);
}

function WinningScenario () {
	// display winner image for a while
	is_displaying_winner = true;
	yield WaitForSeconds (3);
	is_displaying_winner = false;
	Application.LoadLevel (0);
}

function Update () {
	// my local up vector (normalized)
	var p1 : Vector3 = transform.up;
	// direction of camera
	// we assume my position is 0,0,0
	var p2 : Vector3 = player_cam.transform.position.normalized;
	
	// get difference	
	var dot_difference : float = 1 - Vector3.Dot(p1, p2);
	
	if (dot_difference < threshold) {
		// winning
		win_bias += bias_offset * Time.deltaTime;
	} else {
		// losing
		win_bias -= bias_offset * Time.deltaTime;
	}
	
	// no point going over -1 or 1	
	win_bias = Mathf.Clamp (win_bias, -1, 1);
	
	// comparing float values
	// mathf.round approximates 0.5 as int 1
	// so it doesn't work here
	
	// Mathf.Approximately seems to return incorrect results
	//if (Mathf.Approximately(win_bias, -1.0)) {
	if (ApproxEqual (win_bias, -1, 0.001)) {
		
		// game over scenario
		// reset this static variable
		win_bias = 0;
		
		Debug.Log ("Losing");
		
		LosingScenario ();
	}
	
	Debug.Log (Mathf.Approximately (1.0, 10.0/10.0));
	
	// Mathf.Approximately seems to return incorrect results
	//if (Mathf.Approximately(win_bias, 1.0)) {
		
	if (ApproxEqual (win_bias, 1, 0.001)) {
		// game win scenario
		// reset this static variable
		win_bias = 0;
		
		Debug.Log ("Winning");
		
		WinningScenario ();
	}
}