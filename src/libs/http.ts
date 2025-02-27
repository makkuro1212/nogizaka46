export async function Get<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error Status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    throw error
  }
}
