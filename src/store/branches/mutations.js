export function setBranches(state, branches) {
  state.branches = branches;
}

export function setLoading(state, loading) {
  state.loading = loading;
}

export function addBranches(state, branches) {
  state.branches = [...state.branches, ...branches];
}

export function updateBranches(state, { branchIds, changes }) {
  state.branches = state.branches.map((branch) => {
    if (branchIds.includes(branch.id)) {
      return {
        ...branch,
        ...changes,
      };
    }
    return branch;
  });
}
