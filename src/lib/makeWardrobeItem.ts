export default async function makeWardrobeItem(data: Item) {
    const headers = {
        "Content-Type": "application/json"
    }

    const response = await fetch(`http://localhost:3001/wardrobes/`, {
        cache: "no-store",
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    if (!response.ok) return { success: false, message: "Ne možete dodati novi proizvod u garderobu" }

    const item = await response.json();

    return { success: true, message: "Uspješno ste dodali novi proizvod", item: item }
}