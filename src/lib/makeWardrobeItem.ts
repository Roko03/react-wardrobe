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

    if (!response.ok) throw new Error("Can't create wardrobe item")

    const item = await response.json();

    return { success: true, item: item }
}