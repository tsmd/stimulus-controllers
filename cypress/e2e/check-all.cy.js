describe("CheckAllController", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/check-all").wait(10);
	});

	it("Every checkboxes should be checked", () => {
		cy.findAllByLabelText("Check all").eq(0).check();
		cy.findByLabelText("Checkbox 1").should("be.checked");
		cy.findByLabelText("Checkbox 2").should("be.checked");
		cy.findAllByLabelText("Check all").eq(1).should("be.checked");
	});

	it("Every checkboxes should be unchecked", () => {
		cy.findAllByLabelText("Check all").eq(0).check();
		cy.findAllByLabelText("Check all").eq(0).uncheck();
		cy.findByLabelText("Checkbox 1").should("not.be.checked");
		cy.findByLabelText("Checkbox 2").should("not.be.checked");
		cy.findAllByLabelText("Check all").eq(1).should("not.be.checked");
	});

	it("Check all should be unchecked since all checkboxes are unchecked", () => {
		cy.findByLabelText("Checkbox 1").check();
		cy.findAllByLabelText("Check all").eq(0).should("not.be.checked");
		cy.findAllByLabelText("Check all").eq(1).should("not.be.checked");
	});

	it("Check all should be indeterminate since some checkboxes are checked", () => {
		cy.findByLabelText("Checkbox 1").check();
		cy.findAllByLabelText("Check all")
			.eq(0)
			.invoke("prop", "indeterminate")
			.should("be.true");
		cy.findAllByLabelText("Check all")
			.eq(1)
			.invoke("prop", "indeterminate")
			.should("be.true");
	});

	it("Check all should be checked since all checkboxes are checked", () => {
		cy.findByLabelText("Checkbox 1").check();
		cy.findByLabelText("Checkbox 2").check();
		cy.findAllByLabelText("Check all").eq(0).should("be.checked");
		cy.findAllByLabelText("Check all").eq(1).should("be.checked");
	});
});
