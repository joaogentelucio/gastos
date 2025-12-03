import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, value, onChange }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
      />
    </div>
  );
};

export default FormInput;