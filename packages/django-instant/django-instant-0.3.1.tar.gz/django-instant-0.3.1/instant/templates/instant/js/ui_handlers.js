// UI handlers
String.prototype.toTitleCase = function(){
  return this.replace(/\b(\w+)/g, function(m,p){ return p[0].toUpperCase() + p.substr(1).toLowerCase() })
}
var num = document.getElementById("num_msgs");
var counter = document.getElementById("msgs_counter");
{% include "instant/event_class_format.js" %}
function hide_streambox() {
	var btns = document.getElementById("streambox-btns");
	btns.style.display = "none";
	var box = document.getElementById("streambox");
	box.style.display = "none";
}
function reset_counter() {;
	num_msgs.innerHTML = '0';
	hide_streambox();
}
function clear_msgs() {
	//$('.mqmsg').remove();
	counter.style.display = "none";
	reset_counter();
}
function increment_counter() {
	var new_num = parseFloat(num.innerHTML)+1;
	num.innerHTML = new_num;
	return new_num
}
function decrement_counter() {
	var num_msgs = parseFloat(num.innerHTML);
	var new_num = num_msgs - 1;
	if (new_num <= 0) {
		counter.style.display = "none";
	}
	num.innerHTML = new_num;
	return new_num
}
function delete_msg(msg) {
	msg.parentNode.remove();
	num_msgs = decrement_counter();
	if (num_msgs == 0) {
		hide_streambox();
	}
}
function format_data(message, event_class) {
	var label = get_label(event_class);
	formated_event='<div class="mqmsg inbox '+event_class+'-msg"><a href="#" onclick="delete_msg(this)">'+label+'&nbsp;&nbsp;'+message+'</a>&nbsp;&nbsp;<a class="btn btn-default pull-right" style="background-color:lightgrey;position:relative;top:-0.5em" href="#" onclick="delete_msg(this)">OK</a></div>'
	return formated_event
}