import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postEmployee } from '../../store/thunks';
import CustomButton from '../Common/SubmitButton';

interface Props {}

const EmployeeForm = (props: Props) => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(postEmployee({ name, lastName, birthday }));
    clearInputs();
  };
  const clearInputs = () => {
    setName('');
    setLastName('');
    setBirthday('');
    setActive(!active);
  };
  return (
    <div className="add-employee-container">
      <h4 id="add-employee-btn" onClick={() => clearInputs()}>
        Add Employee
      </h4>
      <form
        className={`add-employee-form ${active ? 'active' : ''}`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="birth">Birthday</label>
        <input
          type="date"
          name="birth"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <CustomButton
          disabled={
            name === '' ||
            name.length > 30 ||
            lastName === '' ||
            lastName.length > 30 ||
            birthday === ''
          }
          className=""
          type="submit"
        >
          Create Employee
        </CustomButton>
      </form>
    </div>
  );
};

export default EmployeeForm;
