interface IInputFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string[];
  children: React.ReactNode
}

export default function InputField({
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  children
}: IInputFieldProps) {
  return (
    <div className="ui-flex ui-flex-col ui-space-y-1">
      <label className="ui-text-lg ui-font-semibold ui-tracking-wider ui-capitalize" htmlFor={name}>
        {children}
      </label>
      <input
        className="ui-p-2 ui-text-black ui-rounded-lg"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && error.map((msg) => <p key={msg} className="ui-text-red-500">{msg}</p>)}
    </div>
  );
}