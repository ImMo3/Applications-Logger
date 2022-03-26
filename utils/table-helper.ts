import { AuditLog, SortKeys } from "../models/types";

export const filterData = ({
  tableData,
  filterValues,
}: {
  tableData: AuditLog[];
  filterValues: any;
}) => {
  let filteredData: AuditLog[] = [];

  if (
    filterValues &&
    Object.keys(filterValues).length === 0 &&
    Object.getPrototypeOf(filterValues) === Object.prototype
  ) {
    return (filteredData = [...tableData]);
  }

  filteredData = tableData.filter((user) => {
    let exists: boolean | undefined = true;
    let actionTypeFilter = null;
    let applicationTypeFilter = null;
    let applicationIdFilter = null;
    let creationTimestampFilter = null;

    if (filterValues.actionType && filterValues.actionType !== "") {
      actionTypeFilter =
        user.actionType
          ?.toString()
          .trim()
          .toLowerCase()
          .localeCompare(filterValues.actionType.toLowerCase()) === 0;
      exists = exists && actionTypeFilter;
    }

    if (filterValues.applicationType && filterValues.applicationType !== "") {
      applicationTypeFilter =
        user.applicationType
          ?.toString()
          .toLowerCase()
          .localeCompare(filterValues.applicationType.toLowerCase()) === 0;
      exists = exists && applicationTypeFilter;
    }

    if (filterValues.applicationId && filterValues.applicationId !== "") {
      applicationIdFilter = user.applicationId
        ?.toString()
        .toLowerCase()
        .includes(filterValues.applicationId.toLowerCase());
      exists = exists && applicationIdFilter;
    }

    if (
      filterValues.from &&
      filterValues.to &&
      filterValues.creationTimestamp !== "" &&
      filterValues.to !== ""
    ) {
      const userDate = new Date(user.creationTimestamp);
      const filterFromDate = new Date(filterValues.from);
      const filtertoDate = new Date(filterValues.to);
      creationTimestampFilter =
        userDate >= filterFromDate && userDate <= filtertoDate;
      exists = exists && creationTimestampFilter;
    }

    if (exists) {
      return user;
    }
  });

  return filteredData;
};

export const sortData = ({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: any[];
  sortKey: SortKeys;
  reverse: boolean;
}) => {
  if (!sortKey) return tableData;

  const sortedData = tableData.sort((a, b) => {
    const fa = a[sortKey]?.toString().toLowerCase(),
      fb = b[sortKey]?.toString().toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  if (reverse) {
    sortedData.reverse();
  }

  return sortedData;
};
