#pragma strict
 
 var force = 4.0;
 var samples = 15;
 var spacing = 0.1;  // Time between samples 
 
 private var offset : Vector3;
 private var home : Vector3;
 private var argo : GameObject[];
 
 private var velocity = Vector3.zero;
 private var freeze = true;
 
 function Start () {
     home = transform.position;
     argo = new GameObject[samples];
     for (var i = 0; i < argo.Length; i++) {
         var go = GameObject.CreatePrimitive(PrimitiveType.Sphere);
         go.collider.enabled = false;
         go.transform.localScale = Vector3(0.2, 0.2, 0.2);
         argo[i] = go;
     }
 }
 
 function FixedUpdate() {
     if (!freeze) {
           velocity.y += Physics.gravity.y * Time.fixedDeltaTime;
           transform.position += velocity * Time.fixedDeltaTime;
       }
 }
 
 function ReturnHome() {
     transform.position = home;
     velocity = Vector3.zero;
     freeze = true;
     ShowHideIndicators(true);
 
 }
 
 function ShowHideIndicators(show : boolean) {
     for (var i = 0; i < argo.Length; i++) {
         argo[i].renderer.enabled = show;
         argo[i].transform.position = home;
     }
 }
 
 function OnMouseDown() {
     var v3 = Input.mousePosition;
     v3.z = transform.position.z - Camera.main.transform.position.z;
     v3 = Camera.main.ScreenToWorldPoint(v3);
     offset = transform.position - v3;
 }
 
 function OnMouseDrag() {
     var v3 = Input.mousePosition;
     v3.z = transform.position.z - Camera.main.transform.position.z;
     v3 = Camera.main.ScreenToWorldPoint(v3);
     transform.position = v3 + offset;
     DisplayIndicators();
 }
 
 function OnMouseUp() {
     Invoke("ReturnHome", 2.0);
     velocity = force * (home - transform.position);
     freeze = false;
     ShowHideIndicators(false);
 }
 
 function DisplayIndicators() {
     argo[0].transform.position = transform.position;
     var v3 = transform.position;
     var y = (force * (home - transform.position)).y;
     var t = 0.0;
     v3.y = 0.0;
     for (var i = 1; i < argo.Length; i++) {
         v3 +=  force * (home - transform.position) * spacing;
         t += spacing;
         v3.y = y * t + 0.5 * Physics.gravity.y * t * t + transform.position.y;
         argo[i].transform.position = v3;
     }
 }