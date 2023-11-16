import fetch2 from "node-fetch";

export default async function () {
  await fetch2("http://tubes-php-app:80/public/seed", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000"
    }
  });
}
