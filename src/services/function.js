export let baseUrl = (path = "") => {
  return getBaseUrl() + path;
}
export let geoRegionRename = (regionObjectResult) => {
  let regionName = regionObjectResult.region_name;
  if(regionObjectResult.region_name == "ภาคกลาง"){
    regionName = "ภาคกลางและตะวันออก";
  }
  return {...regionObjectResult, region_name: regionName.replace("ภาค", "")};
}