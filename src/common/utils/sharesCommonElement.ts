export function sharesCommonElement<T>(list1: T[], list2: T[]) {
    return list1.some(element => list2.includes(element));
}