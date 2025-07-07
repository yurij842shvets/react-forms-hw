export default function Filter({value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Пошук контакту"
      onChange={onChange}
      style={{alignSelf: "start"}}
      value={value}
    />
  );
}