import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';

interface Props {
  data: Record<string, any>[];
  pageSize: number;
}

const Table = ({ data, pageSize }: Props) => {
  const cols = data != null && data.length > 0 ? Object.keys(data[0]) : [];
  const [filterBy, setFilterBy] = useState<string>(cols[0]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const limit = Math.ceil(data.length / pageSize);
  const renderTable = () => {
    if (data && data.length > 0) {
      let filtereddata = data
        .filter((e) => {
          const object = e[filterBy];
          if (typeof object == 'string') {
            return object.toLowerCase().includes(search.toLowerCase());
          } else {
            return search === '' ? true : object === +search;
          }
        })
        .slice((page - 1) * pageSize, page * pageSize);
      if (filtereddata.length === 0)
        return (
          <tr>
            <td>No records match that search criteria</td>
          </tr>
        );
      return filtereddata.map((d) => (
        <tr key={d.id}>
          {Object.entries(d).map((entry) => (
            <td key={nanoid()}>{entry[1]}</td>
          ))}
        </tr>
      ));
    }
    return <tr>No data received</tr>;
  };
  return (
    <div className="table-container">
      <div className="search-input">
        <label htmlFor="search">Search by:</label>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder={filterBy}
        />
        <span>*Select any column heading to search by that criteria</span>
      </div>
      <table id="custom-table">
        <thead>
          <tr>
            {cols.map((c) => (
              <th
                key={c}
                className={`${filterBy === c ? 'active' : ''}`}
                onClick={() => setFilterBy(c)}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
      {search === '' && (
        <div className="page-buttons">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>{`${page} of ${limit}`}</span>
          <button disabled={page === limit} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
