export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any): any => {
    return items.map((u: any): any => {
            if (u[objPropName] === itemId) {
                return {...u, ...newObjProps}
            }
            return u
        }
    )
}