describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("");
    const user = {
      name: "Scooby Doo",
      username: "Misty Ricky",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
  });
  it("Login form is shown", function () {
    cy.get("#Username");
    cy.get("#Password");
  }); 

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "Misty Ricky", password: "salainen" });
    });

    it("fails with invalid username or password", function () {
      cy.get("#Login-toggle").click();
      cy.get("#Username").type("demo");
      cy.get("#Password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
      cy.get("html").should("not.contain", "Scooby Doo logged in");
    });
  });

   describe("When logged in", function () {
     beforeEach(function () {
       cy.login({ username: "Misty Ricky", password: "salainen" });
     });

     it("a new blog can be created", function () {
       cy.createBlog({
         title: "another note cypress",
         author: 'John Wayne',
         url:'1234'
       });
     });
   });
});
