import { useRef, useState } from "react";
const UseRef = () => {
    const luckyName = useRef(null);
    const [show, setShow] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = luckyName.current.value;
        name === "" ? alert("please enter your name") : setShow(true);
    };
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="luckyName">Enter your lucky name</label>
                    <input type="text" id="luckyName" ref={luckyName} />
                </div>
                <button type="submit">Submit</button>
            </form>
            <p>{show ? luckyName.current.value : ""}</p>
        </div>
    );
};
export default UseRef;