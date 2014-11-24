
//http://answers.unity3d.com/questions/538199/how-to-create-a-2d-parabolic-trajectory-prediction.html
#pragma strict
 
 var force = 4.0;
 var samples = 15;
 var spacing = 0.1;  // Time between samples 
 
 private var offset : Vector3;
 private var home : Vector3;
 private var rb : Rigidbody;
 private var argo : GameObject[];
 
 function Start () 
 {
     home = transform.position;
     rb = rigidbody;
     argo = new GameObject[samples];
     for (var i = 0; i < argo.Length; i++) 
     {
         var go = GameObject.CreatePrimitive(PrimitiveType.Sphere);
         go.collider.enabled = false;
         go.transform.localScale = Vector3(0.2, 0.2, 0.2);
         argo[i] = go;
     }
 }
 
 function ReturnHome() 
 {
     transform.position = home;
     rb.velocity = Vector3.zero;
     rb.isKinematic = true;
 }
 
 function OnMouseDown()
  {
     var v3 = Input.mousePosition;
     v3.z = transform.position.z - Camera.main.transform.position.z;
     v3 = Camera.main.ScreenToWorldPoint(v3);
     offset = transform.position - v3;
 }
 
 function OnMouseDrag() 
 {
     var v3 = Input.mousePosition;
     v3.z = transform.position.z - Camera.main.transform.position.z;
     v3 = Camera.main.ScreenToWorldPoint(v3);
     transform.position = v3 + offset;
     DisplayIndicators();
 }
 
 function OnMouseUp() 
 {
     rb.isKinematic = false;
     rb.velocity = force * (home - transform.position);
     Invoke("ReturnHome", 2.0);
 }
 
 function DisplayIndicators()
  {
     argo[0].transform.position = transform.position;
     var v3 = transform.position;
     var y = (force * (home - transform.position)).y;
     var t = 0.0;
     v3.y = 0.0;
     for (var i = 1; i < argo.Length; i++)
      {
         v3 +=  force * (home - transform.position) * spacing;
         t += spacing;
         v3.y = y * t + 0.5 * Physics.gravity.y * t * t + transform.position.y;
         argo[i].transform.position = v3;
     }
 }
 