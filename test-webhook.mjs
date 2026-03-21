const scriptURL = "https://script.google.com/macros/s/AKfycbwI5Ue2UT-X4GCvRj4KAhgoNIJuhDANWBuMWdauOC310SxN6PHOnw6C2RqRlGHzpaQtZQ/exec";

const payload = {
  name: "Test Name",
  email: "test@example.com",
  phone: "Company - Tech Demo",
  message: "This is a test message to debug the webhook."
};

async function test() {
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Response text:", text);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
test();
