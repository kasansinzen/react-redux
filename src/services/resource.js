import axios from 'axios';
import { baseUrl } from './function';
import qs from 'qs';

// GET
export const getSummarySchoolApi = (requests = {}) => {
  return axios.get(baseUrl("api/schoolgroup/report"), {params: requests});
}
export const getGroupTrueApi = () => {
  return axios.get(baseUrl("api/school2/groupTrueList"));
}
export const getGroupTrueSummarySchoolApi = () => {
  return axios.get(baseUrl("api/school2/groupTrueSummarySchool"));
}
export const getSchoolApi = (requests = {}) => {
  return axios.get(baseUrl("api/school2/schoolList2019"), {params: requests});
}
export const getRegionApi = (requests = {}) => {
  return axios.get(baseUrl("api/school/geo/region"), {params: requests});
}
export const getProvinceApi = (requests = {}) => {
  return axios.get(baseUrl("api/school/geo/province"), {params: requests});
}
export const getAreaApi = (requests = {}) => {
  return axios.get(baseUrl("api/school2/areaList2019"), {params: requests});
}
export const getPartnerApi = (requests = {}) => {
  return axios.get(baseUrl("api/school2/partnerList2019"), {params: requests});
}
export const getfilterGroupSchoolApi = (requests = {}) => {
  return axios.get(baseUrl("api/school2/filterGroupSchoolMapping"), {params: requests});
}

// POST
export const groupSchoolMappingApi = (requests = {}) => {
  return axios.post(baseUrl("api/school2/groupSchoolMapping"), qs.stringify(requests), {
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8;'}
  });
}