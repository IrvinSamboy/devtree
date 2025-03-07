export const validateUrl = (url: string) => {
    try {
        new URL(url)
        return true
    }
    catch {
        return false
    }
}