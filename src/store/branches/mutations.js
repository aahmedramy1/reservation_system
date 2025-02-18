export function setBranches(state, branches) {
  state.branches = branches;
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

export function updateTablesInBranchId(state, { branchId, tableIds, changes }) {
  state.branches = state.branches.map((branch) => {
    if (branch.id === branchId) {
      return {
        ...branch,
        sections: branch.sections.map((section) => {
          return {
            ...section,
            tables: section.tables.map((table) => {
              if (tableIds.includes(table.id)) {
                return {
                  ...table,
                  ...changes,
                };
              }
              return table;
            }),
          };
        }),
      };
    }
    return branch;
  });
}

export function setFetchingBranches(state, isFetching) {
  state.isFetchingBranches = isFetching;
}

export function setUpdatingBranches(state, isUpdating) {
  state.isUpdatingBranches = isUpdating;
}
