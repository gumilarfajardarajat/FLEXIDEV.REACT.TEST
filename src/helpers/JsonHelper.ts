export const filterList = (jsonData:any[],criterias:any[],criteriaType:string) => {
    return jsonData.filter(item => criterias.includes(item[criteriaType]));
}