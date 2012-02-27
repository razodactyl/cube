
// buck every 2 seconds
var buck_rate : float = 2;
// time offset for the next buck
private var next_buck : float = 0;
// maximum angle we can buck between
var max_ang : float = 30;

var move_speed : float = 1.5;

var to_trans : Quaternion = Quaternion.identity;

function Update () {
	
	if (Time.time > next_buck) {
		
		var cur_trans : Transform = transform;
		
		to_trans = Quaternion.Euler(Random.Range(-max_ang,max_ang), 0, Random.Range(-max_ang,max_ang));
		
		//transform.eulerAngles = Vector3(Random.Range(-max_ang, max_ang), 0, Random.Range(-max_ang, max_ang));
		// set the next buck to be a buck_rate later
		next_buck = Time.time + buck_rate;
	}
	
	transform.rotation = Quaternion.Slerp (transform.rotation, to_trans, Time.deltaTime * move_speed);
}