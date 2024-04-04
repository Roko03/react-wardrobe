export default async function getWardrobes() {
    const respone = await fetch(`http://localhost:3001/wardrobes`);

    if (!respone.ok) throw new Error(`Can't fetch wardrobe`)

    return await respone.json();
}