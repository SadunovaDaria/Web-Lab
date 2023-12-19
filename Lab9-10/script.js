const url = "http://localhost:8000";
const data = { username: "example" };

try {
  const response = await fetch(url, {
    method: "POST", // или 'PUT'
    body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
    headers: {
      "Content-Type": "text/html",
    },
  });
  const json = await response.json();
  console.log("Успех:", JSON.stringify(json));
} catch (error) {
  console.error("Ошибка:", error);
}