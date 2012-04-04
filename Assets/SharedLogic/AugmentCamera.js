var custom : GUIStyle;

function RotateAugmented (x_in : float, y_in : float) {
	// cleanup crew - implement this function
	// up here, (it's down below)
}

camera.clearFlags = CameraClearFlags.SolidColor;

static var last_dir_x : float = 0;
static var last_dir_y : float = 0;

static var new_dir_x : float = 0;
static var new_dir_y : float = 0;

static var dir : Vector3 = Vector3.zero;

var smoothTime = 0.1;
private var xVelocity = 0.0;
private var yVelocity = 0.0;

function Update () {
	
	camera.backgroundColor = Color.Lerp (Color.red, Color.green, DotProductTest.win_bias);
	
	Debug.DrawLine (transform.position, Vector3(transform.position.x+1, transform.position.y, transform.position.z), Color.red);
	
	Debug.DrawLine (transform.position, Vector3(transform.position.x, transform.position.y+1, transform.position.z), Color.green);
	
	Debug.DrawLine (transform.position, Vector3(transform.position.x, transform.position.y, transform.position.z+1), Color.blue);
	
	var pos_unit : Vector3 = transform.position.normalized;
	
	Debug.DrawLine (Vector3.zero, pos_unit);
	
	// remap the iPhone XY plane to the game XZ plane
	
	// also, smoothly interpolate to the new required position
	
	dir.x = Mathf.SmoothDamp(dir.x, iPhoneInput.acceleration.y, yVelocity, smoothTime);
	
	dir.z = Mathf.SmoothDamp(dir.z, iPhoneInput.acceleration.x,
	xVelocity, smoothTime);
	
	if (dir.sqrMagnitude > 1) {
		dir.Normalize();
	}
	
	switch (iPhoneInput.touchCount) {
		case 1:
			transform.position = Vector3.zero;
			transform.position.y = 10;
		break;
		
		default:
		break;
	}
	
	//RotateAugmented (dir.x, dir.z);
	
	// debugging	
	//Debug.DrawLine (Vector3.zero, transform.position, Color.yellow);
	
	var cur_x : float = 0;
	var cur_y : float = 10;
	// testing
	var cur_z : float = 0;
		
	var zy_angz : float = (-90*dir.z)-90;
	var zy_y : float = cur_z*Mathf.Cos(Mathf.Deg2Rad*zy_angz) - cur_y*Mathf.Sin(Mathf.Deg2Rad*zy_angz);
	var zy_z : float = cur_z*Mathf.Sin(Mathf.Deg2Rad*zy_angz) + cur_y*Mathf.Cos(Mathf.Deg2Rad*zy_angz);
	
	// debugging	
	//Debug.DrawLine(Vector3(0, 0, zy_z), Vector3(0, zy_y, zy_z), Color.red);
	
	// let's get the xy augmentation
	
	var xy_angx : float = -90*dir.x;
	var xy_x : float = cur_x*Mathf.Cos(Mathf.Deg2Rad*xy_angx) - (cur_y-(cur_y-zy_y))*Mathf.Sin(Mathf.Deg2Rad*xy_angx);
	var xy_y : float = cur_x*Mathf.Sin(Mathf.Deg2Rad*xy_angx) + (cur_y-(cur_y-zy_y))*Mathf.Cos(Mathf.Deg2Rad*xy_angx);
	
	// debugging	
	//Debug.DrawLine(Vector3(xy_x,xy_y,zy_z), Vector3(0, zy_y, zy_z), Color.green);
	
	// we now have all the information we need	
	transform.position.x = xy_x;
	transform.position.y = xy_y;
	transform.position.z = zy_z;
	
	transform.eulerAngles = Vector3(90-(90*dir.z), 0, 0);
	transform.Rotate(Vector3.forward, -dir.x*90, Space.World);
	
	// phase out current variables
	last_dir_x = new_dir_x;
	last_dir_y = new_dir_y;
}