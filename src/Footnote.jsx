import { useEffect, useState } from "react";

function Footnote() {
  const [showTextBox, setShowTextBox] = useState(false);
  const today = new Date();
  const dateString = `${today.getMonth() + 1}.${today.getDate()}`;
  function appearTextBox() {
    if (showTextBox) {
      setShowTextBox(false);
    } else {
      setShowTextBox(true);
    }
  }

  return (
    <div className='last-update'>
      {" "}
      <p>
        {" "}
        All entries 8/2025 and before are transferred from logs originally kept
        in my notion. Thank you for stopping by :3{" "}
        {/* I enjoy recording down the books I've read -- if you find
        something fun, write something anonymous{" "}
        <a onClick={() => appearTextBox()} className='msg-box'>
          here
        </a>
        !!
        {showTextBox && (
          <div>
            <input id='msgBox' type='text' className='text-box' />
            <button onClick={() => sendMsg()}>write</button>
          </div>
        )} */}
      </p>
      Last Updated: {dateString}
    </div>
  );
}

export default Footnote;
