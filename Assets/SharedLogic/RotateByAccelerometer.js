
function Update () {
	
	var dir : Vector3 = Vector3.zero;
	
	dir.x = -iPhoneInput.acceleration.y;
	dir.y = iPhoneInput.acceleration.x;
	
	if (dir.sqrMagnitude > 1) {
		dir.Normalize();
	}
	
	transform.eulerAngles = Vector3 (dir.y * 90, 0, -dir.x * 90);
	
}