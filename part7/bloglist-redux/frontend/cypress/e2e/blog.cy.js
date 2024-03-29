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
      cy.createBlog({
        title: "another note cypress",
        author: "John Wayne",
        url: "1234",
      });
    });

    it("a new blog can be created", function () {
      cy.get("button:contains('New Blog')").click();
      cy.get("#title").type("Demo Blog 2");
      cy.get("#url").type("random url");
      cy.get("#author").type("A random author");
      cy.get("#submit-blog-button").click();
      cy.get(".blog").eq(1).should("contain", "Demo Blog 2");
    });

    it("A user can like a blog", function () {
      cy.get("button:contains('View')").click();
      cy.get("button:contains('Like')").click();
      cy.contains("Likes: 1");

      cy.get("button:contains('Like')").click();
      cy.contains("Likes: 2");
    });

    it("Only the creator can delete the blog", function () {
      const user = {
        name: "Peter Parker",
        username: "Demo 2",
        password: "salainen",
      };
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
      cy.get("button:contains('Log Out')").click();
      cy.get("#Login-toggle").click();
      cy.get("#Username").type("Demo 2");
      cy.get("#Password").type("salainen");
      cy.get("#login-button").click();
      cy.get("button:contains('View')").click();
      cy.contains("Delete").should("not.exist");
    });

    describe("New blogs", function () {
      it.only("Blogs are ordered according to likes", function () {
        cy.get("button:contains('New Blog')").click();
        cy.get("#title").type("Demo Blog 2");
        cy.get("#url").type("random url");
        cy.get("#author").type("A random author");
        cy.get("#submit-blog-button").click();

        cy.get("button:contains('View')").eq(0).click();
        cy.get("button:contains('View')").eq(0).click();

        cy.get(".blog").contains("Demo Blog 2")
          .find("button:contains('Like')")
          .click()
          .click()
          .click() ;
        // cy.get("button:contains('Like')").eq(1).click();

        cy.get(".blog").eq(1).should("contain", "another note cypress");
        cy.get(".blog").eq(0).should("contain", "Demo Blog 2");
      });
    });
  });
});
