frappe.listview_settings["Warranty Claim"] = {
	add_fields: ["status"],
	get_indicator: (doc) => {
		if (in_list(["Open", "Closed", "Rejected"], doc.status)) {
			return [__(doc.status), "red", "status,=," + doc.status];
		} else if (in_list(["To Receive", "To Test", "To Repair"], doc.status)) {
			return [__(doc.status), "orange", "status,=," + doc.status];
		} else if (doc.status === "Approved") {
			return [__("Approved"), "blue", "status,=,Approved"];
		} else if (doc.status === "Completed") {
			return [__("Completed"), "green", "status,=,Completed"];
		}
	},
};