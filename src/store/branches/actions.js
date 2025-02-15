import api from "@/api/axios";
import { buildUrl } from "@/utils";

export async function fetchAllBranches({ commit }, { modelIncludes }) {
  commit("setLoading", true);
  let requestUrl = buildUrl({ modelName: "branches", modelIncludes });

  try {
    while (requestUrl) {
      const response = await api.get(requestUrl);
      const responseData = response.data;

      if (Array.isArray(responseData.data)) {
        commit("addBranches", responseData.data);
      }

      requestUrl = buildUrl({
        url: responseData.links?.next?.split("v5")[1],
        modelIncludes,
      });
    }
  } catch (err) {
    console.error("API Error:", err.response?.data || err.message || err);
  } finally {
    commit("setLoading", false);
  }
}
