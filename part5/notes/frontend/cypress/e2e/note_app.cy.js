describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Scooby Doo",
      username: "demo",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("login form can be opened", function () {
    cy.contains("Login").click();
  });

  it("user can login", function () {
    cy.contains("Login").click();
    cy.get("#Username").type("demo");
    cy.get("#Password").type("salainen");
    cy.get("#login-button").click();
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "demo", password: "salainen" });
    });

    it("a new note can be created", function () {
      cy.createNote({
        content: "another note cypress",
        important: true,
      });
    });

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
         cy.contains("second note").parent().contains("make important").click();
         cy.contains("second note")
           .parent()
           .find("button")
          .should("contain", "make not important");
        //this errors for some reason when it should work in place of the above
        // cy.contains("second note").parent().find("button").as("theButton");
        // cy.get("@theButton").click();
        // cy.get("@theButton").should("contain", "make not important");
      });
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("new note").click();
        cy.get("input").type("another note cypress");
        cy.contains("save").click();
      });

    });
  });
  it("login fails with wrong password", function () {
    cy.contains("Login").click();
    cy.get("#Username").type("demo");
    cy.get("#Password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Scooby Doo logged in");
  });
});
