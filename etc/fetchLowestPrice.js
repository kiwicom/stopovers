// @flow
import fetch from "isomorphic-unfetch";
import { DateTime } from "luxon";

const url = "https://api.skypicker.com/umbrella/graphql";
const query = `
  query($parameters: Parameters!) {
    get_flights(parameters: $parameters) {
      currency
      bestResults {
        price
      }
    }
  }
`;

export default async function getLowestPrice(departure: string, arrival: string): Promise<string> {
  const now = DateTime.local();
  const dateFrom = now.toFormat("dd/MM/yyyy");
  const dateTo = now.plus({ months: 3 }).toFormat("dd/MM/yyyy");

  const variables = {
    parameters: {
      dateFrom,
      dateTo,
      to: arrival,
      flyFrom: departure === "EU" ? "europe" : departure,
      adults: 1,
      typeFlight: "oneway",
      curr: "EUR",
      asc: 1,
      v: 3,
      vehicle_type: ["bus", "train", "aircraft"],
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const data = (await response.json()).data.get_flights;
  const price = {
    amount: data.bestResults[0]?.price,
    currency: data.currency,
  };

  if (price.amount && price.currency) {
    return `${price.amount} ${price.currency}`;
  }
  return "-";
}
