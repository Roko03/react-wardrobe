export default async function editWardrobeItem(data: Item, id: string) {

    const headers = {
        "Content-Type": "application/json"
    }

    const response = await fetch(`http://localhost:3001/wardrobes/${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
    })

    if (!response.ok) return { success: false, message: "Nije moguće ažurirati proizvod" }


    await response.json();

    return { success: true, message: "Uspješno ste ažurirali proizvod" }
}