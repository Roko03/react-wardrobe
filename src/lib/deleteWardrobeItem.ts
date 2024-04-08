export default async function deleteWardrobeItem(id: string) {
    const response = await fetch(`http://localhost:3001/wardrobes/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) return { success: false, message: "Nije moguće izbrisati proizvod" }

    await response.json();

    return { success: true, message: "Uspješno ste izbrisali proizvod" }
}