import People from "./People";

export default class OpinionatersDomain {
  peopleOfInterestList = [
    new People(
      "uncle_bob",
      "Robert C. Martin",
      "@unclebobmartin",
      "https://blog.cleancoder.com/atom.xml",
      "http://cleancoder.com/products"
    ),
    new People(
      "fowler",
      "Martin Fowler",
      "@martinfowler",
      "https://www.martinfowler.com/feed.atom",
      "https://www.martinfowler.com/"
    ),
    new People(
      "beck",
      "Kent Beck",
      "@kentbeck",
      null,
      "https://www.kentbeck.com/"
    ),
    new People(
      "prag_andy",
      "Andy Hunt",
      "@PragmaticAndy",
      null,
      "https://toolshed.com/index.html"
    ),
    new People(
      "prag_dave",
      "Dave Thomas",
      "@pragdave",
      null,
      "https://pragdave.me"
    ),
    new People("alistair", "Alistair Cockburn", "@TotherAlistair"),
    new People(
      "baeldung",
      "Eugen Baeldung",
      "@baeldung",
      "https://www.baeldung.com/feed",
      "https://www.baeldung.com/"
    )
  ];

  getPeopleList() {
    return this.peopleOfInterestList;
  }
}
