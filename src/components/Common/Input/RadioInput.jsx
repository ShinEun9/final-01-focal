import styled from 'styled-components';

const RadioInputBox = styled.div`
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 13px;
    color: var(--sub-text-color);
    margin-right: 10px;
  }

  input {
    margin: 0 10px 0 0;
    vertical-align: middle;
    appearance: none;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    width: 10px;
    height: 10px;
    transition: border-color 0.3s;
  }

  input:checked {
    background-color: var(--main-color);
    border: none;
  }

  p {
    margin-top: 6px;
    font-weight: 400;
    font-size: 12px;
    color: var(--red);
  }
`;

function RadioInput({ id, name, children, value, onChange, checked }) {
  return (
    <RadioInputBox>
      <label htmlFor={id}>
        <input
          id={id}
          name={name}
          type="radio"
          checked={checked}
          onChange={onChange}
          value={value}
        />
        {children}
      </label>
    </RadioInputBox>
  );
}

const RadioInputGroupBox = styled.div`
  display: flex;
  flex-direction: column;

  p.title {
    font-weight: 500;
    font-size: 12px;
    color: var(--sub-text-color);
    margin-bottom: 18px;
  }

  div.inputs {
    display: flex;
    gap: 15px;
  }
`;

function RadioInputGroup({ title, children }) {
  return (
    <RadioInputGroupBox>
      <p className="title">{title}</p>
      <div className="inputs">{children}</div>
    </RadioInputGroupBox>
  );
}

export { RadioInput, RadioInputGroup };
