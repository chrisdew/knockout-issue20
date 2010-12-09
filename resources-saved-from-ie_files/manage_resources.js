var Resource = function(fields, foos) {
	var that = this;
	
	for (var p in fields) {
		this[p] = ko.observable();
		this[p](fields[p]);
	}
	this.foos = ko.observableArray(foos);
	
	this.addFoo = function(foo) {
		this.foos.push(foo);
	}.bind(this);
	
	this.ajaxFoos = function() {
		that.addFoo(new Foo("1.2.3.4", "IPv4"));
		that.addFoo(new Foo("87654321", "PSSI"));
	}.bind(this);
}

var Foo = function(name, type) {
	this.name = ko.observable();
	this.name(name);
	this.type = ko.observable();
	this.type(type);
}

var resources = ko.observableArray([
                new Resource({ callsign: "Orphans" }, []),
                new Resource({ callsign: "Add Resource" }, []),
                ]);


var viewModel = (function() {
	ob = {};
	ob.resources = resources;
    ob.selected_resource = ko.observable(resources()[0]);
	ob.selected_foo = null, //resources()[2].nonObFoos[0]
	ob.selectResource = function(resource) {
		resource.ajaxFoos();
		ob.selected_resource(resource);
		setDragAndDroppable();
	};
	return ob;
})();


$(document).ready(function() {
	ko.applyBindings(viewModel);
	viewModel.resources.push(new Resource({ callsign: "RES01" }, []));
	viewModel.resources.push(new Resource({ callsign: "RES02" }, []));
	viewModel.resources.push(new Resource({ callsign: "RES03" }, []));
});


function setDragAndDroppable() {
	$(".draggable")
	.draggable({ revert: "invalid" })
	;
	$(".droppable").droppable({
		accept: ".draggable",
		activeClass: "droppable_active",
		drop: function(event, ui){
			alert("dropped");
		}
	});
}