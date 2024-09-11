type Option = {
  label: string,
  value: string
}

type SelectProps = {
  options: Option[],
  onSelect: (data: string) => void,
  label: string,
  name?: string,
}

export default function Select({ options, onSelect, name, label }: SelectProps) {
  return <div className="flex ui-flex-col">

    <label htmlFor={name} className="ui-text-lg ui-font-semibold ui-tracking-wider ui-capitalize">
      {label}
    </label>

    <select name={name} className="ui-p-2 ui-rounded-lg ui-text-gray-900"

      onChange={(e) => {
        onSelect(e.target.value)
      }}>

      {
        options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))
      }

    </select>

  </div>

}