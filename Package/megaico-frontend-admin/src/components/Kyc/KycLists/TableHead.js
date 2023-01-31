const TableHead = () => {
  return (
    <thead>
      <tr className="data-item data-head">
        <th className="data-col dt-user">User</th>
        <th className="data-col dt-doc-type">Doc Type</th>
        <th className="data-col dt-doc-front">Documents</th>
        <th className="data-col dt-doc-back">&nbsp;</th>
        <th className="data-col dt-status">Status</th>
        <th className="data-col"></th>
      </tr>
    </thead>
  );
};

export default TableHead;
