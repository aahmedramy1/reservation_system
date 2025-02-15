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

export async function enableReservationsForBranches({ commit }, { branchIds }) {
  try {
    const requests = branchIds.map((id) =>
      api.put(`/branches/${id}`, { accepts_reservations: true })
    );
    const responses = await Promise.all(requests);

    commit("updateBranches", {
      branchIds,
      changes: { accepts_reservations: true },
    });

    return responses;
  } catch (error) {
    console.error("Failed to update branch reservations:", error);
    throw error;
  }
}
