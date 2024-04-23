const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:3000";

describe("API Tests", function () {
  describe("GET /api/cards", function () {
    it("should get all cards", function (done) {
      request(
        `${baseUrl}/api/cards`,
        { json: true },
        (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(body).to.be.an("object");
          expect(body.statusCode).to.equal(200);
          expect(body.data).to.be.an("array");
          expect(body.message).to.equal("get all cards success");
          done();
        }
      );
    });
  });

  describe("POST /api/cards", function () {
    it("should add a new card", function (done) {
      const newCard = {
        name: "Test Card",
        detail: "This is a test card.",
      };

      request.post(
        { url: `${baseUrl}/api/cards`, body: newCard, json: true },
        (error, response, body) => {
          expect(response.statusCode).to.equal(201);
          expect(body).to.be.an("object");
          expect(body.statusCode).to.equal(201);
          expect(body.message).to.equal("New card added successfully");
          done();
        }
      );
    });
  });
});
