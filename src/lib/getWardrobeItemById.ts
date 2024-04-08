export default async function getWardrobeItemById(id: string) {
    const response = await fetch(`http://localhost:3001/wardrobes/${id}`);

    if (!response.ok) return { success: false, message: "Nije moguće dohvatiti taj proizvod" }

    const item = await response.json();

    return { success: true, data: item }
}