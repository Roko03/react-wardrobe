export default async function getWardrobesType() {
    const respone = await fetch(`http://localhost:3001/types`);

    if (!respone.ok) throw new Error(`Can't fetch wardrobe type`)

    return await respone.json();
}