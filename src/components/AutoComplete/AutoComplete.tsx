import { ReactNode, useState } from "react";
import useFetchApiData from "./hooks/useFetchApiData";

type ItemListRenderer = (items: string[] | never[], query: string,onItemClick: (item: string) => void) => ReactNode;
interface AutoCompleteProps {
  id: string;
  label: string;
  placeholder: string;
  autoComplete: boolean;
  debounceDelay: number;
  itemList: ItemListRenderer;
  dataToBeDisplayed: (data: any) => any[];
  promise: (text: string) => Promise<Response>;
  errMsg: Function;
  noDataPresent: Function;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  id,
  label,
  placeholder,
  autoComplete,
  debounceDelay,
  promise,
  dataToBeDisplayed,
  itemList,
  errMsg,
  noDataPresent,
}) => {
  const [text, setText] = useState("");
  const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);
  const handleChange = (e: any) => {
    setText(e.target.value);
    setIsAutoComplete(true)
  };
  const [data, error, loading] = useFetchApiData(
    text,
    isAutoComplete,
    promise,
    dataToBeDisplayed,
    debounceDelay
  );

  const handleItemClick = (item: string) => {
    setText(item);
    setIsAutoComplete(false)
  };
  return (
    <>
      <label>{label}</label>
      <br />
      <input
        id={id}
        placeholder={placeholder}
        type="text"
        value={text}
        onChange={handleChange}
      ></input>
      {loading ? (
        <span className="pad-10"> Loading... </span>
      ) : (
        data && data.length > 0 ? itemList(data, text, handleItemClick) : text && isAutoComplete && noDataPresent()
      )}
      {error && errMsg()}
    </>
  );
};
export default AutoComplete;
