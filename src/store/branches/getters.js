export function branches(state) {
  return state.branches;
}

export function isFetchingBranches(state) {
  return state.isFetchingBranches;
}

export function isUpdatingBranches(state) {
  return state.isUpdatingBranches;
}

export function branchesAcceptingReservations(state) {
  return state.branches.filter((branch) => branch.accepts_reservations);
}

export function branchesNotAcceptingReservations(state) {
  return state.branches.filter((branch) => !branch.accepts_reservations);
}
