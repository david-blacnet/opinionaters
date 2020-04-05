import People from "./People";

export default function PeopleService() {
  const peopleOfInterestList = [
    People(
      "uncle_bob",
      "Robert C. Martin",
      "@unclebobmartin",
      "https://blog.cleancoder.com/atom.xml",
      "http://cleancoder.com/products"
    ),
    People(
      "fowler",
      "Martin Fowler",
      "@martinfowler",
      "https://www.martinfowler.com/feed.atom",
      "https://www.martinfowler.com/"
    ),
    People("beck", "Kent Beck", "@kentbeck", null, "https://www.kentbeck.com/"),
    People(
      "prag_andy",
      "Andy Hunt",
      "@PragmaticAndy",
      null,
      "https://toolshed.com/index.html"
    ),
    People(
      "prag_dave",
      "Dave Thomas",
      "@pragdave",
      null,
      "https://pragdave.me"
    ),
    People("alistair", "Alistair Cockburn", "@TotherAlistair"),
    People(
      "baeldung",
      "Eugen Baeldung",
      "@baeldung",
      "http://feeds.feedburner.com/Baeldung",
      "https://www.baeldung.com/"
    ),
    People(
      "rands",
      "Michael Lopp",
      "@rands",
      "https://randsinrepose.com/feed/",
      "https://randsinrepose.com/"
    )
  ];

  return {
    getPeopleList: () => peopleOfInterestList,
    getPeople: id => peopleOfInterestList.find(people => people.id === id)
  };
}
