/* global frappe, erpnext, __ */
/* eslint camelcase: ["error", { properties: "never"} ] */

frappe.ui.form.on("Quotation", {
	refresh: (frm) => {
		frm.add_custom_button(__("Warranty Claim"), () => {
			frm.trigger("getServiceItems");
		}, __("Get items from"));
	},

	onload_post_render: (frm) => {
		if (frm.doc.__islocal && frm.doc.warranty_claim) {
			frm.trigger("getServiceItems");
		}
	},

	getServiceItems: (frm) => {
		erpnext.utils.map_current_doc({
			method: "repairs.api.make_quotation",
			source_doctype: "Warranty Claim",
			target: frm,
			date_field: "complaint_date",
			setters: {
				customer: frm.doc.customer,
				status: ""
			},
			get_query_filters: {
				company: frm.doc.company,
				status: ["not in", ["Completed", "Offline", "Declined", "Cancelled"]],
				billing_status: "To Bill"
			}
		});
	}
});