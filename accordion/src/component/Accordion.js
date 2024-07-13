import React, { useState, useEffect } from "react";
import axios from "axios";

function Accordion() {
  const [selection, setSelection] = useState(null);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [multiId, setMultiId] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AccordionData = await axios.get("/data/data.json");
        // console.log(AccordionData.data);
        setData(AccordionData.data);
      } catch (error) {
        console.log("unable to fetch the data", error);
      }
    };
    fetchData();
  }, []);

  const handleAccordion = (id) => {
    setSelection(id === selection ? null : id);
    console.log(id);
  };
  const handleMultiSelectionBtn = (id) => {
    let cpyMultiId = [...multiId];
    const findIndexOfCurrentId = cpyMultiId.indexOf(id);
    if(findIndexOfCurrentId === -1){
        cpyMultiId.push(id)
    }else{
        cpyMultiId.splice(findIndexOfCurrentId,1)  //1 is number of item we want to delete 
    }
    // console.log(findIndexOfCurrentId)
    setMultiId(cpyMultiId);
  };

  console.log(selection,multiId)

  return (
    <>
      <button
        className="p-3 bg-zinc-300 text-black font-normal rounded-lg "
        onClick={() => setMultipleSelection(!multipleSelection)}
      >
        {multipleSelection
          ? "Enable Single Selection"
          : "Enable Multiple Selection"}{" "}
      </button>
      <div className="accordion-container w-96 bg-[#EEEEEE] p-6 rounded-lg">
        {data && data.length === 0 ? (
          <p>No data available</p>
        ) : (
          data.map((item) => (
            <div
              className="accordion-box border-b-2 border-zinc-500 p-4"
              key={item.id}
            >
              <div
                className="question-container text-[#686D76] flex justify-between cursor-pointer"
                onClick={
                  multipleSelection
                    ? () => handleMultiSelectionBtn(item.id)
                    : () => handleAccordion(item.id)
                }
              >
                <div className="question">{item.question}</div>
                <div className="icon ">{selection === item.id || multiId.indexOf(item.id) !== -1 ? "-" : "+"}</div>
              </div>
              {selection === item.id || multiId.indexOf(item.id) !== -1? (
                <div className="answer">{item.response}</div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Accordion;
