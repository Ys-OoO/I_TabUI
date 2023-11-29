import style from './style.less';
export default function ISearchInput({ label = 'Search ...', ...props }) {
  return (
    <div className={style.inputContainer}>
      <input
        id="searchInput"
        placeholder=" "
        type="text"
        className={style.searchInput}
      ></input>
      <label htmlFor="searchInput" className={style.label}>
        {label}
      </label>
    </div>
  );
}
