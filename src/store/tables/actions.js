import api from "@/api/axios";

export async function updateReservationsForTables(
  { commit, dispatch },
  { branchId, tableIds, acceptsReservations }
) {
  commit("setLoading", true);
  try {
    let responses = await Promise.all(
      tableIds.map((tableId) =>
        api.put(`/tables/${tableId}`, {
          accepts_reservations: acceptsReservations,
        })
      )
    );

    await dispatch(
      "branches/updateTablesInBranch",
      {
        branchId,
        tableIds,
        changes: { accepts_reservations: acceptsReservations },
      },
      { root: true }
    );

    return responses;
  } catch (error) {
    console.error("Failed to update branch reservations:", error);
    throw error;
  } finally {
    commit("setLoading", false);
  }
}
