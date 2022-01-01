import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmployees, selectLoading } from '../../store/slices/Main';
import { getEmployees } from '../../store/thunks';
import Loader from '../Common/Loader';
import Table from '../Common/Table';
import EmployeeForm from './EmployeeForm';
import './Employees.css';

const Employees = () => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployees);
  useEffect(() => {
    if (employees == null) dispatch(getEmployees());
  }, []);
  return (
    <div id="employee-container">
      <h3>Employee Data</h3>
      {loading.includes('getEmployees') || loading.includes('postEmployee') ? (
        <Loader size="small" />
      ) : employees != null && employees.length > 0 ? (
        <Table data={employees || []} pageSize={10} />
      ) : (
        <h3>No employee information received</h3>
      )}
      <EmployeeForm />
    </div>
  );
};

export default Employees;
