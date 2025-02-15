import api from "@/api/axios";
import { buildUrl } from "@/utils";

export async function fetchAllBranches({ commit }, { modelIncludes }) {
  commit("setFetchingBranches", true);
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
    commit("setFetchingBranches", false);
  }
}

export async function enableReservationsForBranches({ commit }, { branchIds }) {
  commit("setUpdatingBranches", true);
  try {
    let responses = await Promise.all(
      branchIds.map((branchId) =>
        api.put(`/branches/${branchId}`, { accepts_reservations: true })
      )
    );

    commit("updateBranches", {
      branchIds,
      changes: { accepts_reservations: true },
    });

    return responses;
  } catch (error) {
    console.error("Failed to update branch reservations:", error);
    throw error;
  } finally {
    commit("setUpdatingBranches", false);
  }
}

export async function disableReservationsForAllBranches({
  commit,
  rootGetters,
}) {
  commit("setUpdatingBranches", true);

  const updatableBranches =
    rootGetters["branches/branchesAcceptingReservations"];
  const branchIds = updatableBranches.map((branch) => branch.id);

  try {
    const responses = await Promise.all(
      branchIds.map((id) =>
        api.put(`/branches/${id}`, { accepts_reservations: false })
      )
    );

    commit("updateBranches", {
      branchIds,
      changes: { accepts_reservations: false },
    });

    return responses;
  } catch (error) {
    console.error("Failed to update branch reservations:", error);
    throw error;
  } finally {
    commit("setUpdatingBranches", false);
  }
}
