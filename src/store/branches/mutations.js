export function setBranches(state, branches) {
  state.branches = branches;
}

export function setLoading(state, loading) {
  state.loading = loading;
}

export function addBranches(state, branches) {
  state.branches = [...state.branches, ...branches];
}
